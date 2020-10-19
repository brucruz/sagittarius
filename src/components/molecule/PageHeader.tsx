import { PageHeaderContainer } from "@/styles/components/molecules/PageHeader"
import ButtonBack from "../atom/ButtonBack"

import stepper1 from '@/assets/components/organisms/SearchExam/stepper1.svg';
import stepper2 from '@/assets/components/organisms/SearchExam/stepper2.svg';
import LinkBack from "../atom/LinkBack";
import { useCallback } from "react";

interface PageHeaderProps {
  type: 'link' | 'button';
  stepper?: '1/2' | '2/2';
  backButtonNewState?: any;
  backButtonStateCallback?(state: any): void;
  backLinkUrl?: string;
}

const PageHeader = ({
  type,
  stepper,
  backButtonNewState,
  backButtonStateCallback,
  backLinkUrl
}: PageHeaderProps) => {
  const handleBackButtonClick = useCallback(() => {
    backButtonStateCallback(backButtonNewState);
  }, [backButtonNewState]);

  return (
    <PageHeaderContainer>
      {type === 'button' && <ButtonBack onClick={handleBackButtonClick}/>}

      {type === 'link' && <LinkBack url={backLinkUrl}/>}

      {stepper === '1/2' && (
        <img src={stepper1} alt="passo 1"/>
      )}

      {stepper === '2/2' && (
        <img src={stepper2} alt="passo 2"/>
      )}
    </PageHeaderContainer>
  )
}

export default PageHeader;
