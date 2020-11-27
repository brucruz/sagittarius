import styled from 'styled-components';

export const Content = styled.div`
  & > a button:nth-child(1) {
    margin-top: 32px;
    margin-bottom: 16px;
  }

  input,
  label {
    padding-left: 24px;
  }
`;

export const ExperienceButton = styled.button`
  background: none;
  color: #4d49c4;
  width: 100%;
  text-align: center;
`;
