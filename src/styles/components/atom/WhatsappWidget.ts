import styled from 'styled-components';
import device from '../../../utils/devices';

export const Container = styled.div`
  color: #fff;
  background-color: #24a648;

  position: fixed;
  bottom: 10px;
  right: 24px;

  padding: 12px;
  border-radius: 30px;

  @media ${device.tablet} {
    padding: 10px 16px;
  }

  box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.25);

  a {
    text-decoration: none;
    color: #fff;
    font-size: 12px;
    display: flex;
    align-items: center;

    svg {
      height: 24px;
      width: 24px;

      @media ${device.tablet} {
        height: 20px;
        width: 20px;
        margin-right: 10px;
      }
    }

    h4 {
      display: none;
    }

    @media ${device.tablet} {
      h4 {
        display: block;
      }
    }
  }
`;
