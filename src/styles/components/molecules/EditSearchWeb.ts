import device from '@/utils/devices';
import styled from 'styled-components';

export const Container = styled.div`
  display: none;

  button {
    margin-right: 16px;
  }

  @media ${device.laptop} {
    display: flex;
    align-items: center;
    width: 100%;

    &.has-error {
      align-items: baseline !important;
    }

    @media ${device.laptopL} {
      margin-top: 88px;
    }

    margin-top: 64px;
    margin-bottom: 32px;
    padding: 0 8.3%;

    section,
    header {
      margin: 0 !important;
    }

    button + section {
      display: grid;
      margin-right: 16px !important;

      grid-gap: 16px 2px;
      grid-template-columns: repeat(2, 1fr);

      & > div {
        grid-row-start: 2 !important;
        margin-top: -8px !important;
      }
    }

    & > section {
      width: 100%;

      & > section {
        margin-left: 16px !important;

        header {
          margin: 0 !important;
        }
      }

      & > footer {
        margin-top: 48px !important;
        width: 49% !important;
      }
    }

    & > section:last-child {
      width: 30%;
      margin-left: 16px !important;

      section {
        display: none !important;
      }

      & > footer {
        width: 100% !important;
        margin-top: 0 !important;
      }
    }
  }
`;
