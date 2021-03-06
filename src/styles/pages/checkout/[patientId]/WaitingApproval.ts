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
