import styled, { css } from "styled-components";

interface InputContainerProps {
  // isErrored: boolean;
  isFilled: boolean;
  isFocused: boolean;
}

export const InputContainer = styled.div<InputContainerProps>`
  width: 100%;

  display: flex;
  align-items: center;

  border: 1px solid #BCC3D4;
  border-radius: 6px;

  margin-top: 24px;

  label {
    font-weight: bold;
    font-size: 16px;
    line-height: 24px;
    /* or 240% */

    letter-spacing: 0.192941px;

    color: rgba(0, 0, 0, 0.6);

    margin-top: 12px;
    margin-bottom: 12px;
  }

  input {
    border: 0;

    font-style: normal;
    font-weight: normal;
    font-size: 0;
    line-height: 0;
    height: 0;
    /* identical to box height, or 150% */

    letter-spacing: 0.192941px;

    color: rgba(0, 0, 0, 0.6);
  }

  ${props =>
    (props.isFocused || props.isFilled) &&
    css`
      label {
        font-size: 10px;
        line-height: 20px;

        margin-top: 3px;
        margin-bottom: 0;
      }

      input {
        font-size: 16px;
        line-height: 16px;
        height: 16px;

        margin-bottom: 9px;
      }
    `}
`;

export const InputIcon = styled.div`
  flex: 0 0 auto;

  img {
    margin-left: 16px;
    margin-right: 12px;
  }
`;

export const InputTextArea = styled.div`
  flex: 1 0 auto;
  display: flex;
  flex-direction: column;
`;
