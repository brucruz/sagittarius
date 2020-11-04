import styled from 'styled-components';
import device from '../../../utils/devices';

export const Container = styled.div`
  color: #fff;
  background-color: #24a648;

  position: fixed;
  bottom: 10px;
  right: 24px;

  padding: 10px 16px;
  border-radius: 30px;

  box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.25);

  a {
    text-decoration: none;
    color: #fff;
    font-size: 12px;
    display: flex;
    align-items: center;

    svg {
      height: 20px;
      width: 20px;
      margin-right: 10px;
    }
  }
`;
