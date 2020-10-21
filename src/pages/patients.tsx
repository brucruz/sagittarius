import { useRef, useState } from 'react';
import Link from 'next/link';
import PageTemplate from '@/components/templates/PageTemplate';
import RadioButton from '@/components/atom/RadioButton';

import { PatientSelector, Content, Schedule } from '@/styles/pages/Patient';
import ButtonNext from '@/components/atom/ButtonNext';

const patientsMock = [
  {
    id: 0,
    label: 'Eu mesmo, Gustavo',
  },
  {
    id: 1,
    label: 'Eu mesmo, Gustavo',
  },
  {
    id: 2,
    label: 'Eu mesmo, Gustavo',
  },
]

export default function Patients() {

  const [selectedPatient, setSelectedPatient] = useState('');
  const formRef = useRef();

  return (
    <PageTemplate 
      titleMain={{
        title: 'Quem vai fazer esses exames?',
        subTitle: 'Selecione a pessoa que fará o exame.'
      }}

      backLinkUrl={''}
    >
      <Content>
        {patientsMock.map(patient => {
          return (
            <PatientSelector 
              key={patient.id}
              className={selectedPatient === patient.id ? 'isChecked' : 'notChecked'} 
              onClick={() => setSelectedPatient(patient.id)}
            >
              <RadioButton label={patient.label} isChecked={selectedPatient === patient.id} name="patient"/>
            </PatientSelector>
          )
        })}
        
        <Schedule>
          <span>Quer agendar para outra pessoa?</span>
          <span>Você pode <Link href="#"><a>cadastrar amigos e parentes</a></Link></span>
        </Schedule>

        <ButtonNext text="Continuar">Continuar</ButtonNext>

      </Content>
    </PageTemplate>
  )
}