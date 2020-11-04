import styled from 'styled-components';

export const Container = styled.div`
  border-bottom: 1px solid #bcc3d4;
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
    color: #232b3b;
    font-size: 16px;
    line-height: 24px;
  }

  p {
    font-size: 16px;
    line-height: 22px;
    color: #3c4759;
    margin-top: 8px;
    margin-bottom: 24px;
  }

  button {
    text-decoration: underline;
    color: #4d49c4;
  }
`;

export const ContainerInline = styled.div`
  display: flex;
  justify-content: space-between;
`;
