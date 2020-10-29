import device from '@/utils/devices';
import styled from 'styled-components';

export const Container = styled.div`
  position: absolute;
  right: 0;
  top: 30px;
  padding: 30px;
  overflow: hidden;

  z-index: 199;

  @media ${device.laptop} {
    top: 50px;
  }
`;
