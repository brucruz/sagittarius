import device from '@/utils/devices';
import styled from 'styled-components';

export const Content = styled.div`
  margin: 64px 0;
  display: flex;
  flex-direction: column;
  align-items: center;

  button {
    width: 75%;
    margin-bottom: 16px;
    text-transform: uppercase;
  }

  a {
    text-decoration: none;
    color: #4d49c4;
  }
`;

export const Smile = styled.h3`
  margin-bottom: 40px;
  font-size: 72px;
  text-align: center;
  color: #4d49c4;
`;

export const Title = styled.h1`
  font-size: 24px;
  text-align: center;
  color: #2f2c77;
`;

export const Subtitle = styled.h3`
  margin-top: 16px;
  font-size: 16px;
  line-height: 24px;
  font-weight: 400;
  text-align: center;
  letter-spacing: 0.192941px;
  color: #3c4759;
  margin-bottom: 32px;
`;

export const ModalContainer = styled.div`
  text-align: center;
  display: flex;
  flex-direction: column;

  & > div:first-child {
    width: 100%;
    display: flex;
    justify-content: flex-end;
    padding: 16px;

    svg {
      fill: #bcc3d4;
      height: 24px;
      width: 24px;
    }
  }

  & > div:nth-child(2) {
    padding: 24px;

    p {
      margin: 32px 0;
      font-size: 12px;
    }

    h2 {
      font-size: 24px;
    }

    h3 {
      font-size: 16px;
    }

    @media ${device.tablet} {
      padding: 48px !important;

      h2 {
        font-size: 32px;
        text-align: center;
      }

      p {
        font-size: 16px;
      }

      h3 {
        font-size: 20px;
        text-align: center;
      }
    }
  }

  & > div:last-child {
    display: flex;
    justify-content: center;
    padding: 24px 0;
    border-top: 1px solid #bcc3d4;

    button {
      width: 75%;
      text-transform: uppercase;

      @media ${device.tablet} {
        width: 50%;
      }

      a {
        color: #fff;
        text-decoration: none;
      }
    }
  }

  .stars-div {
    margin-top: 16px;
    display: flex;
    flex-direction: row;
    justify-content: center;

    div {
      display: flex;
      flex-direction: column;
      margin: 8px;
      font-size: 12px;

      img {
        height: 16px;
        width: 16px;
      }

      @media ${device.tablet} {
        font-size: 16px;

        img {
          height: 24px;
          width: 24px;
        }
      }
    }
  }
`;
