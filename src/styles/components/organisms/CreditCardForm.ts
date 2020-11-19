import styled from 'styled-components';
import arrowIcon from '@/assets/components/organisms/CreditCardForm/arrow.svg';

export const Container = styled.div`
  div {
    display: flex;
    flex-direction: column;
    margin-bottom: 8px;

    label {
      font-size: 12px;
      color: #3c4759;
      margin-bottom: 12px;
    }

    input {
      background: #fff;
      font-weight: 700;
      border: 1px solid #bcc3d4;
      box-sizing: border-box;
      border-radius: 6px;
      padding: 12px 16px;
    }

    div {
      display: flex;
      flex-direction: row;
      justify-content: space-between;

      div:last-child {
        margin-left: 16px !important;
      }
    }
  }

  .cvv-div div {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;

    input {
      width: 49%;
      margin-right: 16px;
    }
  }
`;

export const Dropdown = styled.div`
  background: #fff;
  font-weight: 700;
  border: 1px solid #bcc3d4;
  box-sizing: border-box;
  border-radius: 6px;
  padding: 12px 16px;
  width: 100%;
  margin: 0 !important;

  &:after {
    content: url(${arrowIcon});
  }

  select {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    border: none;
    width: 100%;
    -ms-word-break: normal;
    word-break: normal;
    display: block;
  }

  select::-ms-expand {
    display: none;
  }
`;
