import { ReactElement, useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

import PageTemplate from '@/components/templates/PageTemplate';
import RadioButton from '@/components/atom/RadioButton';

import { PatientSelector, Content, Schedule } from '@/styles/pages/Patient';
import ButtonNext from '@/components/atom/ButtonNext';
import mixpanel from 'mixpanel-browser';
import { useAuth } from '@/hooks/auth';
import api from '@/services/api';
import Patient from '@/@types/Patient';
import SEO from '@/components/atom/SEO';
import { useBag } from '@/hooks/bag';

export default function Patients(): ReactElement {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [selectedPatient, setSelectedPatient] = useState<string>(null);

  const router = useRouter();

  const { user, token } = useAuth();
  const { initiateCheckout } = useBag();

  useEffect(() => {
    user && mixpanel.identify(user.id);
    mixpanel.track('Page View', {
      'Page Title': 'Patient Selection',
    });

    initiateCheckout();
  }, [user, initiateCheckout]);

  useEffect(() => {
    token &&
      api
        .get<Patient[]>('/patients', {
          headers: { Authorization: `Bearer: ${token}` },
        })
        .then(response => {
          const patientsInApi = response.data;

          setPatients(patientsInApi);
        });
  }, [token]);

  const self = patients.find(patient => patient.relationship === 'self');

  const handlePatientSelection = useCallback((): void => {
    if (selectedPatient === user.id) {
      user && mixpanel.identify(user.id);

      mixpanel.register(
        {
          'Selected Patient': `${user.first_name} ${user.last_name}`,
          'New Patient': false,
          Relationship: 'self',
        },
        1,
      );

      mixpanel.track('Select Patient');

      router.push(`/checkout/paciente/eu-mesmo`);
    } else {
      user && mixpanel.identify(user.id);

      const patient = patients.find(
        _patient => _patient.id === selectedPatient,
      );

      mixpanel.register(
        {
          'Selected Patient': `${patient.first_name} ${patient.last_name}`,
          'New Patient': false,
          Relationship: patient.relationship,
        },
        1,
      );

      mixpanel.track('Select Patient');

      router.push(`/checkout/${patient.id}/data`);
    }
  }, [user, selectedPatient, patients, router]);

  return (
    <PageTemplate
      titleMain={{
        title: 'Quem vai fazer esses exames?',
        subTitle: 'Selecione abaixo quem fará os exames.',
      }}
      buttonType={{
        type: 'link',
        backLinkUrl: '/carrinho',
      }}
    >
      <SEO
        title="Selecione o paciente que irá fazer o exame"
        description="Indique quem fará os exames agendados. Caso queira, você pode cadastrar alguém da sua família ou amigo como seu paciente."
        canonical="checkout/paciente"
      />

      <Content>
        {self ? (
          <PatientSelector
            key={self.id}
            className={selectedPatient === self.id ? 'isChecked' : 'notChecked'}
            onClick={() => setSelectedPatient(self.id)}
          >
            <RadioButton
              label={`${self.first_name} ${self.last_name}`}
              isChecked={selectedPatient === self.id}
              name="patient"
            />
          </PatientSelector>
        ) : (
          <PatientSelector
            key={user && user.id}
            className={
              user && selectedPatient === user.id ? 'isChecked' : 'notChecked'
            }
            onClick={() => setSelectedPatient(user.id)}
          >
            <RadioButton
              label={user && `${user.first_name} ${user.last_name}`}
              isChecked={user && selectedPatient === user.id}
              name="patient"
            />
          </PatientSelector>
        )}

        {patients.map(patient => {
          if (patient.relationship === 'self') return;

          // eslint-disable-next-line consistent-return
          return (
            <PatientSelector
              key={patient.id}
              className={
                selectedPatient === patient.id ? 'isChecked' : 'notChecked'
              }
              onClick={() => setSelectedPatient(patient.id)}
            >
              <RadioButton
                label={`${patient.first_name} ${patient.last_name}`}
                isChecked={selectedPatient === patient.id}
                name="patient"
              />
            </PatientSelector>
          );
        })}

        <Schedule>
          <span>Quer agendar para outra pessoa?</span>
          <span>
            Você pode{' '}
            <Link href="/checkout/paciente/novo">
              <a>cadastrar amigos e parentes</a>
            </Link>
          </span>
        </Schedule>

        <ButtonNext text="Continuar" onClick={handlePatientSelection} />
      </Content>
    </PageTemplate>
  );
}
