import styled from 'styled-components';

export const PaymentMethodSelector = styled.div`
  margin-bottom: 12px;
  box-sizing: border-box;
  border-radius: 6px;
  height: 64px;
  padding: 0 20px;
  display: flex;

  &.selected {
    flex-direction: column;
    background: #F0F6F9;
    border: 2px solid #4D49C4;
    box-sizing: border-box;
    border-radius: 6px;
    height: fit-content; 
    padding: 16px 0;

    .checkmark{
      margin-left: 28px;
    }

    span.text {
      font-weight: 700;
      color: #2F2C77;
    }
  }

  &.notChecked {
    border: 1px solid #247fa6;
  }

  &.disabled {
    opacity: 0.4;
    background: #bcc3d4;
    border: 1px solid rgba(0, 0, 0, 0.2);
    display: flex;
    align-items: center;

    .checkmark {
      border: 1px solid #3c4759 !important;
    }

    label,
    span {
      color: #3c4759;
    }

    span:nth-child(2) {
      margin-left: 16px;
    }
  }

  .
`;

export const BillOfExchangeContainer = styled.div`
  padding: 0 8px;

  button {
    margin-top: 24px;
  }
`;
