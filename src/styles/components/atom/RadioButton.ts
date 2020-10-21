import styled from 'styled-components';

export const Base = styled.label`
  display: block;
  width: fit-content;
  display: flex;
  cursor: pointer;
  flex-direction: row-reverse;
  align-items: center;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;

  input {
    position: absolute;
    opacity: 0;
    cursor: pointer;
    height: 0;
    width: 0;
  }

  span.text {
    margin-left: 6px;
    color: #3C4759;
  }

  .checkmark {
    display: flex;
    padding: 3px;
    top: 0;
    left: 0;
    height: 16px;
    width: 16px;
    background-color: #fff;
    border: 1px solid #BCC3D4;
    box-sizing: border-box;
    border-radius: 50%;
  }

  .checkmark span {
    border-radius: 50%;
    height: 100%;
    width: 100%;
  }

  input:checked ~ .checkmark span {
    background: #4D49C4;
  }
`;
