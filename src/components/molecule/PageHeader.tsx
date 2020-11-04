import { PageHeaderContainer } from '@/styles/components/molecules/PageHeader';

import stepper1 from '@/assets/components/organisms/SearchExam/stepper1.svg';
import stepper2 from '@/assets/components/organisms/SearchExam/stepper2.svg';
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
      stepper?: '1/2' | '2/2';
    }
  | {
      type: 'go_back_button';
    };

interface PageHeaderProps {
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
        <ButtonBack onClick={handleGoBackButtonClick} />
      )}

      {buttonType.type === 'change_state_button' &&
        buttonType.stepper === '2/2' && <img src={stepper2} alt="passo 2" />}
    </PageHeaderContainer>
  );
};

export default PageHeader;
