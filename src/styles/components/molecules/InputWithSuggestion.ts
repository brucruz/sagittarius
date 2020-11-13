import device from '@/utils/devices';
import styled from 'styled-components';

export const SuggestionArea = styled.footer`
  position: absolute;
  z-index: 100;

  background: #ffffff;
  border: 1px solid rgba(0, 0, 0, 0.2);
  width: 100%;
  max-width: calc(100% - 50px);

  @media ${device.tablet} {
    max-width: 400px;
  }

  max-height: 140px;
  overflow-x: hidden;
  overflow-y: auto;

  article {
    display: flex;
    justify-content: space-between;
    align-items: center;

    p {
      font-weight: 600;
      font-size: 12px;
      line-height: 16px;

      /* Paragrafo */

      color: #3c4759;
      opacity: 0.8;

      margin-top: 10px;
      margin-bottom: 10px;
      margin-left: 24px;
    }

    svg {
      height: 20px;
      width: 20px;

      color: #3c4759;
      opacity: 0.8;

      margin-right: 16px;
    }

    & + article {
      border-top: 1px solid rgba(35, 43, 59, 0.16);
    }

    &:last-child {
      border-bottom: 1px solid rgba(35, 43, 59, 0.16);
    }
  }
`;
