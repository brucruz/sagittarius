import styled, { css } from "styled-components";

interface UserInputProps {
  // isErrored: boolean;
  isFilled: boolean;
  isFocused: boolean;
  hasSuggestions: boolean;
}

export const InputContainer = styled.section`
  position: relative;
`;

export const UserInput = styled.header<UserInputProps>`
  width: 100%;
  height: 48px;

  display: flex;

  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 6px;

  margin-top: 24px;

  label {
    font-weight: normal;
    font-size: 16px;
    line-height: 22px;
    /* or 240% */

    letter-spacing: 0.192941px;

    color: #3C4759;

    margin-top: 14px;
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

    color: #3C4759;
  }

  svg {
    margin-left: 16px;
    margin-right: 16px;
    margin-top: 14px;
    margin-bottom: 14px;

    width: 20px;
    height: 20px;

    color: #4D49C4;

  }

  svg.password-eye-icon {
    color: #3C4759 !important;
    opacity: 0.4;
    cursor: pointer;
  }

  ${props =>
    props.isFocused &&
    css`
      svg {
        color: #000000;
        opacity: 0.6;
      }
  `}

  ${props =>
    props.isFilled &&
    css`
      svg {
        color: #4D49C4;
        opacity: 1;
      }
  `}

  ${props =>
    (props.isFocused || props.isFilled) &&
    css`
      label {
        font-size: 12px;
        line-height: 16px;

        margin-top: 5.5px;
        margin-bottom: 0;

        opacity: 0.6;
      }

      input {
        font-size: 16px;
        line-height: 22px;
        height: auto;

        margin-bottom: 4.5px;
      }
    `}

    ${props =>
      props.hasSuggestions &&
      css`
        border-radius: 6px 6px 0 0;
        border-bottom: 2px solid #4D49C4;
    `}
`;

export const InputIcon = styled.div`
  flex: 0 0 auto;
`;

export const InputTextArea = styled.div`
  flex: 1 0 auto;
  display: flex;
  flex-direction: column;
`;

export const SuggestionArea = styled.footer`
  position: absolute;
  z-index: 100;

  background: #FFFFFF;
  border: 1px solid rgba(0, 0, 0, 0.2);
  width: 100%;

  max-height: 140px;
  overflow-x: hidden;
  overflow-y: auto;

  article {
    display: flex;
    justify-content: space-between;
    align-items: center;

    p {
      font-weight: 600;
      font-size: 12px;
      line-height: 16px;

      /* Paragrafo */

      color: #3C4759;
      opacity: 0.8;

      margin-top: 10px;
      margin-bottom: 10px;
      margin-left: 24px;
    }

    svg {
      height: 20px;
      width: 20px;

      color: #3C4759;
      opacity: 0.8;

      margin-right: 16px;
    }

    & + article {
      border-top: 1px solid rgba(35, 43, 59, 0.16);
    }

    &:last-child {
      border-bottom: 1px solid rgba(35, 43, 59, 0.16);
    }
  }
`

export const SelectedExams = styled.section`
  width: 100%;

  margin-bottom: 16px;

  position: relative;
  z-index: 10;
`;

export const SelectedExamsSummary = styled.header`
  width: 100%;
  display: flex;
  justify-content: space-between;

  background: #FFFFFF;
  /* grey staff */

  border: 1px solid #BCC3D4;
  box-sizing: border-box;
  border-radius: 6px;

  z-index: 200;

  margin-top: 12px;

  cursor: pointer;

  p {
    font-weight: bold;
    font-size: 16px;
    line-height: 24px;
    /* identical to box height, or 150% */

    letter-spacing: 0.192941px;

    margin-left: 16px;
    margin-top: 13px;
    margin-bottom: 11px;
  }

  button {
    background: rgba(188,195,212,0.3);

    height: 32px;
    width: 32px;

    border-radius: 50%;
    border: 0;

    margin-right: 12px;
    margin-top: 8px;
    margin-bottom: 8px;

    display: flex;
    align-items: center;
    justify-content: center;

    svg {
      color: #4D49C4;
      height: 20px;
      width: 20px;
    }
  }
`;

export const SelectedExamsDetail = styled.footer`
  width: 100%;

  background: #FFFFFF;
  /* grey staff */

  border: 1px solid #BCC3D4;

  position: absolute;
  z-index: -2;
  top: 45px;

  border-bottom: 1px solid rgba(35,43,59,0.16);

  max-height: 100px;
  overflow-x: hidden;
  overflow-y: auto;

  article {
    display: flex;
    justify-content: space-between;

    border-bottom: 1px solid rgba(35,43,59,0.16);

    p {
      margin-top: 10px;
      margin-bottom: 10px;
      margin-left: 24px;

      font-style: normal;
      font-weight: 600;
      font-size: 12px;
      line-height: 16px;

      /* Paragrafo */

      color: #3C4759;
      opacity: 0.8;
    }

    svg {
      margin-top: 10px;
      margin-bottom: 10px;
      margin-right: 20px;

      height: 16px;
      width: 16px;

      color: rgba(60,71,89,0.6);

      cursor: pointer;
    }
  }
`;
