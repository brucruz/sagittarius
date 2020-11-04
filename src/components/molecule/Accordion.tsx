import { useCallback, useState } from 'react';
import htmlParser from 'html-react-parser';
import {
  AccordionButton,
  AccordionPanel,
} from '@/styles/components/molecules/Accordion';
import accordionArrow from '@/assets/components/molecules/Accordion/accordion-arrow.svg';
import { useAuth } from '@/hooks/auth';
import mixpanel from 'mixpanel-browser';

interface AccordionProps {
  text: {
    question: string;
    answer: string;
  };
  index: number;
}

const Accordion = ({ text, index }: AccordionProps) => {
  const [isActive, setIsActive] = useState(false);

  const { user } = useAuth();

  const toggleAccordion = useCallback(
    (question: string) => {
      setIsActive(!isActive);

      user && mixpanel.identify(user.id);
      mixpanel.track('Toggle FAQ Question', {
        Question: question,
      });
    },
    [user, isActive],
  );

  return (
    <>
      <AccordionButton
        type="button"
        onClick={() => toggleAccordion(text.question)}
        className={isActive ? 'active' : ''}
      >
        {`${index}. `}
        {text.question}
        <img src={accordionArrow} alt="Accordion flecha" />
      </AccordionButton>
      <AccordionPanel className={isActive ? 'active' : ''}>
        <p>{htmlParser(text.answer)}</p>
      </AccordionPanel>
    </>
  );
};

export default Accordion;
