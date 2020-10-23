import styled, { css } from "styled-components";

interface DateInputProps {
  isFocused: boolean;
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

    color: #3C4759;
  }

`;

export const DateInput = styled.div<DateInputProps>`
  position: relative;
  z-index: 0;

  display: flex;

  width: 156px;

  background: #FFFFFF;
  /* grey staff */

  border: 1px solid #BCC3D4;
  border-radius: 6px;

  svg {
    color: #4D49C4;
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

    color: #3C4759;

    &::placeholder {
      color: #3C4759;

      ${props => props.isFocused && css`
        color: #BCC3D4;
      `}
    }
  }
`;

export const Calendar = styled.div`
width: 255px;
margin-top: 8px;

position: absolute;
z-index: 2;

.DayPicker {
  background: #FFFFFF;
  /* Base/Gray 06 */

  border: 1px solid #A7AFB2;
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

  color: #BCC3D4 !important;

  &:hover {
    background-color: #FFFFFF !important;
    border-radius: 0;
    color: #BCC3D4 !important;
  }
}

.DayPicker-Day--selected {
  background: #4D49C4 !important;
  border-radius: 50%;
  color: #FFFFFF !important;
}

.DayPicker-Weekdays {
  border-bottom: 1px solid #A7AFB2;
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

  color: #3C4759;
  background-color: transparent;
}

.DayPicker:not(.DayPicker--interactionDisabled) .DayPicker-Day:not(.DayPicker-Day--disabled):not(.DayPicker-Day--selected):not(.DayPicker-Day--outside):hover {
  background: rgba(77,73,196,0.8);
  border-radius: 50%;
  color: #FFFFFF;
}
`;
