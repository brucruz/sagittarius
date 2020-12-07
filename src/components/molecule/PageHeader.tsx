import {
  PageHeaderContainer,
  StepperContainer,
} from '@/styles/components/molecules/PageHeader';

import stepper1 from '@/assets/components/organisms/SearchExam/stepper1.svg';
import stepper2 from '@/assets/components/organisms/SearchExam/stepper2.svg';
import notFilledStep from '@/assets/components/molecules/PageHeader/not-filled-step.svg';
import currentStep from '@/assets/components/molecules/PageHeader/current-step.svg';
import filledStep from '@/assets/components/molecules/PageHeader/filled-step.svg';
import { ReactElement, useCallback } from 'react';
import { UrlObject } from 'url';
import { useRouter } from 'next/router';
import LinkBack from '../atom/LinkBack';
import ButtonBack from '../atom/ButtonBack';

export type GoBackProps =
  | {
      type: 'link';
      backLinkUrl?: UrlObject | string;
    }
  | {
      type: 'change_state_button';
      backButtonStateCallback?(state: any): void;
      backButtonNewState?: any;
      stepper?: '1/2' | '2/2' | '1/3' | '2/3' | '3/3';
    }
  | {
      type: 'go_back_button';
      stepper?: '1/2' | '1/3';
      backFunction?: () => void;
    };

export interface PageHeaderProps {
  buttonType: GoBackProps;
}

const PageHeader = ({ buttonType }: PageHeaderProps): ReactElement => {
  const router = useRouter();

  const handleBackButtonClick = useCallback(() => {
    buttonType.type === 'change_state_button' &&
      buttonType.backButtonStateCallback(buttonType.backButtonNewState);
  }, [buttonType]);

  const handleGoBackButtonClick = useCallback(() => {
    router.back();
  }, [router]);

  return (
    <PageHeaderContainer>
      {buttonType.type === 'change_state_button' && (
        <ButtonBack onClick={handleBackButtonClick} />
      )}

      {buttonType.type === 'link' && <LinkBack url={buttonType.backLinkUrl} />}

      {buttonType.type === 'change_state_button' &&
        buttonType.stepper === '1/2' && <img src={stepper1} alt="passo 1" />}

      {buttonType.type === 'go_back_button' && (
        <ButtonBack
          onClick={buttonType.backFunction || handleGoBackButtonClick}
        />
      )}

      {buttonType.type === 'change_state_button' &&
        buttonType.stepper === '2/2' && <img src={stepper2} alt="passo 2" />}

      {buttonType.type === 'change_state_button' &&
        buttonType.stepper.includes('/3') && (
          <StepperContainer>
            {buttonType.stepper[0] === '1' && (
              <>
                <img src={currentStep} alt="ícone de passo atual" />
                <img
                  src={notFilledStep}
                  alt="ícone de passo ainda não preenchido"
                />
                <img
                  src={notFilledStep}
                  alt="ícone de passo ainda não preenchido"
                />
              </>
            )}
            {buttonType.stepper[0] === '2' && (
              <>
                <img src={filledStep} alt="ícone de passo preenchido" />
                <img src={currentStep} alt="ícone de passo atual" />
                <img
                  src={notFilledStep}
                  alt="ícone de passo ainda não preenchido"
                />
              </>
            )}
            {buttonType.stepper[0] === '3' && (
              <>
                <img src={filledStep} alt="ícone de passo preenchido" />
                <img src={filledStep} alt="ícone de passo preenchido" />
                <img src={currentStep} alt="ícone de passo atual" />
              </>
            )}
          </StepperContainer>
        )}
      {buttonType.type === 'go_back_button' && buttonType.stepper && (
        <StepperContainer>
          <img src={currentStep} alt="ícone de passo atual" />
          <img src={notFilledStep} alt="ícone de passo ainda não preenchido" />
          <img src={notFilledStep} alt="ícone de passo ainda não preenchido" />
        </StepperContainer>
      )}
    </PageHeaderContainer>
  );
};

export default PageHeader;
