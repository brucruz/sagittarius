import styled from 'styled-components';
import device from '@/utils/devices';

export const Container = styled.div`
  margin-bottom: 64px;
  margin-top: 64px;
  padding: 0 24px;

  &.no-button {
    margin-top: 88px !important;
  }

  @media ${device.tablet} {
    margin-left: auto;
    margin-right: auto;

    max-width: 400px;

    &.cart-width {
      max-width: 900px !important;
    }
  }
`;
