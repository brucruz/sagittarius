import device from '@/utils/devices';
import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  align-items: center;
  width: 100%;

  &.has-error {
    align-items: baseline !important;

    button + div + section {
      align-self: flex-start;
    }
  }

  @media ${device.laptopL} {
    margin-top: 88px;
  }

  margin-top: 64px;
  margin-bottom: 32px;
  padding: 0 8.3%;

  header,
  section {
    margin: 0 !important;
  }

  button {
    margin-right: 8px;
  }

  button + div {
    width: 100% !important;

    input {
      width: 100%;
    }
  }

  div > footer {
    width: calc((100% / 3) - 7.6%);

    @media ${device.laptopL} {
      width: calc((100% / 3) - 7%);
    }

    @media ${device.desktop} {
      max-width: 100%;
      width: calc((100% / 3) - 6.5%);
    }
  }

  button + div + section,
  button + div + section + div {
    width: 100%;
  }

  button + div + section {
    margin: 0 8px !important;
  }
`;
