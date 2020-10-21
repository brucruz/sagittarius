import styled from 'styled-components';
import device from '@/utils/devices';

export const Container = styled.div`
  margin-bottom: 64px;
  margin-top: 64px;
  padding: 0 24px;

  @media ${device.tablet} {
    margin-left: auto;
    margin-right: auto;
    max-width: 400px;
  }
`;

