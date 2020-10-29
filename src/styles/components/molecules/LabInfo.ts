import styled from 'styled-components';

export const Container = styled.div`
  border-bottom: 1px solid #BCC3D4;
  display: flex;
  padding-top: 24px;
  
  img {
    margin-top: 4px;
    height: 18px;
    width: 18px;
  }
`;

export const Content = styled.div`
  width: 100%;
  margin-left: 16px;

  h2 {
    color: #232B3B;
    font-size: 16px;
    line-height: 24px;
  }

  p {
    font-size: 16px;
    line-height: 22px;
    color: #3C4759;
    margin-top: 8px;
    margin-bottom: 24px;
  }

  button {
    text-decoration: underline;
    color: #4D49C4;
  }
`;

export const ContainerInline = styled.div`
  display: flex;
  justify-content: space-between;
`;
