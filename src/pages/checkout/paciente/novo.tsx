import mixpanel from "mixpanel-browser";
import * as Yup from 'yup';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import { parse } from 'date-fns';

import PageTemplate from "@/components/templates/PageTemplate";
import { useAuth } from "@/hooks/auth";
import { useToast } from "@/hooks/toast";
import { useRouter } from "next/router";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import api from "@/services/api";
import getValidationErrors from "@/utils/getValidationErrors";
import Input from "@/components/atom/Input";
import { MdMail, MdPerson, MdVerifiedUser } from "react-icons/md";
import { FaWhatsapp } from "react-icons/fa";
import { InputGroupTitle } from "@/styles/pages/SignUp";
import Button from "@/components/atom/Button";
import Patient from "@/@types/Patient";
import DateSelector from "@/components/molecule/DateSelector";
import sexRadio from "@/contents/pages/PatientCreation/sexRadio";
import RadioButton from "@/components/atom/RadioButton";
import documentIdType from "@/contents/pages/PatientCreation/documentIdType";
import { RadioButtonGroup } from "@/styles/pages/NewPatient";

interface SigUpFormData {
  first_name: string;
  last_name: string;
  birth_date: string;
  sex: 'male' | 'female';
  document_type: 'RG' | 'CPF' | 'Passaporte' | 'RNE';
  document_id: string;
  phone_whatsapp: string;
  email: string;
}

const SignUpPage = () => {
  const router = useRouter();
  const formRef = useRef<FormHandles>(null);

  const { addToast } = useToast();
  const { user, token } = useAuth();

  const [birthDate, setBirthDate] = useState<string>(null);
  const [selectedSex, setSelectedSex] = useState<string>(null);
  const [selectedIdType, setSelectedIdType] = useState<string>(null);

  useEffect(() => {
    user && mixpanel.identify(user.id);
    mixpanel.track('Page View', {
      'Page Title': 'Patient Creation',
      Type: 'new',
    });
  }, [user]);

  const handleGetBirthDate = useCallback((date: string) => {
    setBirthDate(date);
  }, []);

  const handleSubmit = useCallback(
    async (data: SigUpFormData) => {
      try {
        const { document_id, email, first_name, last_name, phone_whatsapp } = data;

        const createPatientData = {
          first_name,
          last_name,
          birth_date: parse(birthDate, 'dd/MM/yyyy', new Date()),
          sex: selectedSex,
          document_type: selectedIdType,
          document_id,
          phone_whatsapp,
          email,
        }

        formRef.current?.setErrors({});

        const phoneRegExp = /^([0-9]{2})([0-9]{4,5})([0-9]{4})$/;

        const schema = Yup.object().shape({
          first_name: Yup.string().required('Nome obrigatório.'),
          last_name: Yup.string().required('Sobrenome obrigatório.'),
          phone_whatsapp: Yup.string().matches(
            phoneRegExp,
            'Digite o celular com DDD (somente números).',
          ),
          email: Yup.string()
            .email('Digite um e-mail válido.'),
          birth_date: Yup.date().required('Data de Nascimento obrigatória. Você deve digitar o endereço no formato: DD/MM/AAAA'),
          sex: Yup.string().oneOf(['male', 'female']).required('Sexo é obrigatório'),
          document_type: Yup.string().oneOf(['RG', 'CPF', 'Passaporte', 'RNE']).required('Tipo de documento é obrigatório.'),
          document_id: Yup.string().required('Documento é obrigatório.'),
        });

        await schema.validate(createPatientData, {
          abortEarly: false,
        });

        const { data: patient} = await api.post<Patient>('/patients', createPatientData, {
          headers: { Authorization: `Bearer: ${token}` },
        });

        user && mixpanel.identify(user.id);

        mixpanel.register(
          {
            'Selected Patient': `${patient.first_name} ${patient.last_name}`,
            'New Patient': true,
            Self: false,
          },
          1,
        );

        mixpanel.track('Select Patient');

        router.push({
          pathname: `/checkout/${patient.id}/data`,
        });

        addToast({
          type: 'success',
          title: 'Cadastro realizado com sucesso',
        });
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          console.log(errors);

          formRef.current?.setErrors(errors);

          return;
        }

        console.log(err.response.data);

        addToast({
          type: 'error',
          title: 'Erro no cadastro',
          description: 'Ocorreu um erro ao fazer cadastro, tente novamente.',
        });
      }
    },
    [addToast, router, birthDate, selectedSex, selectedIdType],
  );

  const errors = useMemo(() => {
    return formRef.current?.getErrors()
  }, []);

  return (
    <PageTemplate
      buttonType={{
        type: 'link',
        backLinkUrl: {
          pathname: '/checkout/paciente',
        }
      }}
      titleMain={{
        title: 'Cadastrar Paciente',
        subTitle:  'Digite os dados do paciente para continuar'
      }}
    >
      <Form ref={formRef} onSubmit={handleSubmit}>
        <InputGroupTitle>Dados Pessoais</InputGroupTitle>

        <Input name='first_name' label='Nome *' icon={MdPerson} isSubmit />
        <Input name='last_name' label='Sobrenome *' icon={MdPerson}isSubmit />

        <DateSelector name='birth_date' startDate={new Date} calendar={false} getTypedDate={handleGetBirthDate} label='Data de nascimento' error={errors?.birth_date}/>

        <InputGroupTitle>Sexo *</InputGroupTitle>

        <RadioButtonGroup>
          {sexRadio && sexRadio.map(sex => {
            return (
              <div
                key={sex.id}
                onClick={() => setSelectedSex(sex.id)}
              >
                <RadioButton isChecked={selectedSex === sex.id} label={sex.label} name='sex' />
              </div>
            )
          })}
        </RadioButtonGroup>

        <InputGroupTitle>Identificação pessoal *</InputGroupTitle>

        <RadioButtonGroup>
          {documentIdType && documentIdType.map(type => (
            <div
              key={type.id}
              onClick={() => setSelectedIdType(type.id)}
            >
              <RadioButton isChecked={selectedIdType === type.id} label={type.label} name='idType' />
            </div>
          ))}
        </RadioButtonGroup>

        <Input name='document_id' label='Número de Documento *' icon={MdVerifiedUser} isSubmit />

        <InputGroupTitle>Contato</InputGroupTitle>

        <Input name='email' label='E-mail *' icon={MdMail} isSubmit />
        <Input name='phone_whatsapp' label='WhatsApp *' icon={FaWhatsapp} isSubmit />

        <Button
          type='submit'
        >
          Cadastrar
        </Button>
      </Form>
    </PageTemplate>
  )
};

export default SignUpPage;
