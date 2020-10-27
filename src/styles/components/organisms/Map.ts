import styled from 'styled-components';
import device from '@/utils/devices';

export const MapContainer = styled.div`
  display: none;

  @media ${device.laptop} {
    display: block;
    max-width: 49%;
    max-height: 600px;
    width: 100%;
  }
`;
