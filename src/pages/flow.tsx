import UserProgressTemplate from '@/components/templates/PageTemplate';

export default function flow() {
  return (
    <UserProgressTemplate 
      titleMain={
        {
          title: 'Quais exames está buscando?', 
          subTitle: 'Digite e adicione os exames que quer agendar .'
        }
      } 
      backButtonCallback={() => {}}>
      <h1>hehe</h1>
    </UserProgressTemplate>
  );
}