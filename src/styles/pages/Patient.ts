import styled from 'styled-components';

export const Content = styled.div`
  margin-top: 24px;
`;

export const PatientSelector = styled.div`
  margin-bottom: 12px;
  box-sizing: border-box;
  border-radius: 6px;
  padding: 24px 20px;

  &.isChecked {
    background: #F0F6F9;
    border: 2px solid #4D49C4;
  }

  &.notChecked {
    border: 1px solid #247FA6;
  }
`;

export const Schedule = styled.div`
  margin-top: 24px;
  margin-bottom: 40px;
  display: flex;
  flex-direction: column;

  span:first-child {
    font-weight: 700;
  }

  span + span {
    margin-top: 6px;
  }
`;
