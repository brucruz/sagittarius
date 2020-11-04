import styled, { css } from 'styled-components';
import { boolean } from 'yup';

interface DateInputProps {
  isFocused: boolean;
  isErrored: boolean;
  fullWidth: boolean;
}

export const DateSelectorContainer = styled.section`
  label {
    width: 156px;

    display: block;

    margin-top: 25px;
    margin-bottom: 10px;

    font-weight: bold;
    font-size: 16px;
    line-height: 24px;
    /* identical to box height, or 150% */

    letter-spacing: 0.192941px;

    /* Paragrafo */

    color: #3c4759;
  }
`;

export const DateInput = styled.div<DateInputProps>`
  position: relative;
  z-index: 0;

  display: flex;

  width: 156px;

  ${props =>
    props.fullWidth &&
    css`
      width: 100%;
    `}

  background: #FFFFFF;
  /* grey staff */

  border: 1px solid #bcc3d4;
  border-radius: 6px;

  svg {
    color: #4d49c4;
    width: 20px;
    height: 20px;

    margin-top: 14px;
    margin-bottom: 14px;
    margin-left: 16px;
  }

  input {
    border: 0;
    width: 89px;

    margin-top: 14px;
    margin-bottom: 12px;
    margin-left: 16px;

    font-weight: normal;
    font-size: 16px;
    line-height: 22px;
    /* identical to box height, or 137% */

    letter-spacing: 0.192941px;

    /* Paragrafo */

    color: #3c4759;

    &::placeholder {
      color: #3c4759;

      ${props =>
        props.isFocused &&
        css`
          color: #bcc3d4;
        `}
    }
  }

  ${props =>
    props.isErrored &&
    css`
      border-radius: 6px 6px 0 0;
      border-bottom: 2px solid #ba3737;
    `}
`;

export const Calendar = styled.div`
  width: 255px;
  margin-top: 8px;

  position: absolute;
  z-index: 2;

  .DayPicker {
    background: #ffffff;
    /* Base/Gray 06 */

    border: 1px solid #a7afb2;
    border-radius: 4px;
  }

  .DayPicker-wrapper {
    padding-bottom: 0;
  }

  .DayPicker,
  .DayPicker-Month {
    /* width: 100%; */
  }

  .DayPicker-Month {
    border-collapse: separate;
    border-spacing: 5px;

    margin-top: 12px;
    margin-bottom: 12px;
    margin-right: 11px;
    margin-left: 11px;
  }

  .DayPicker-Day--today {
    font-weight: 900;
    font-size: 12px;
    line-height: 16px;
    text-align: center;

    /* branco */

    /* color: #FFFFFF !important; */

    /* background-color: #4D49C4 !important; */
  }

  .DayPicker-Day--disabled {
    font-family: Barlow !important;
    font-style: normal !important;
    font-weight: normal !important;
    font-size: 12px !important;
    line-height: 16px !important;

    text-align: center !important;

    color: #bcc3d4 !important;

    &:hover {
      background-color: #ffffff !important;
      border-radius: 0;
      color: #bcc3d4 !important;
    }
  }

  .DayPicker-Day--selected {
    background: #4d49c4 !important;
    border-radius: 50%;
    color: #ffffff !important;
  }

  .DayPicker-Weekdays {
    border-bottom: 1px solid #a7afb2;
  }

  .DayPicker-Caption {
    div {
      font-weight: bolder;
      font-size: 16px;
      line-height: 24px;
      color: #131516;
    }
  }

  .DayPicker-Weekday {
    font-weight: 600;
    font-size: 12px;
    line-height: 16px;
    color: #131516;
  }

  .DayPicker-Day {
    font-size: 12px;
    line-height: 16px;
    /* identical to box height */

    text-align: center;

    /* Paragrafo */

    color: #3c4759;
    background-color: transparent;
  }

  .DayPicker:not(.DayPicker--interactionDisabled)
    .DayPicker-Day:not(.DayPicker-Day--disabled):not(.DayPicker-Day--selected):not(.DayPicker-Day--outside):hover {
    background: rgba(77, 73, 196, 0.8);
    border-radius: 50%;
    color: #ffffff;
  }
`;

export const ErrorMessage = styled.div`
  margin-top: 9px;

  p {
    font-weight: bold;
    font-size: 12px;
    line-height: 16px;

    /* Vermelho - ERRO! */

    color: #ba3737;

    span {
      color: #3c4759;
      font-weight: 500;
    }
  }
`;
