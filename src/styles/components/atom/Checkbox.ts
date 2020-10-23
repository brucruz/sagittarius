import styled, { css } from "styled-components";

interface CheckboxItemProps {
  isChecked: boolean;
}

export const CheckboxItem = styled.label<CheckboxItemProps>`
  display: block;
  position: relative;
  padding-left: 24px;
  margin-bottom: 12px;
  cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;

  font-size: 16px;
  line-height: 22px;
  /* identical to box height, or 137% */

  letter-spacing: 0.192941px;

  /* Paragrafo */

  color: #3C4759;

  ${props => props.isChecked && css`
    font-weight: bold;
  `}

  input {
    position: absolute;
    opacity: 0;
    cursor: pointer;
    height: 0;
    width: 0;

    &:checked + svg {
      background: #4D49C4;
    }

    &:checked + svg::after {
      display: block;
    }
  }

  svg {
    position: absolute;
    top: 4px;
    left: 0px;
    height: 16px;
    width: 16px;

    /* branco */

    color: #FFFFFF;
    /* grey staff */

    border: 1px solid #BCC3D4;
    border-radius: 2px;

    &::after {
      content: "";
      position: absolute;
      display: none;

      left: 5px;
      top: -2px;
      width: 5px;
      height: 10px;
      border: solid white;
      border-width: 0 3px 3px 0;
      -webkit-transform: rotate(45deg);
      -ms-transform: rotate(45deg);
      transform: rotate(45deg);
    }
  }
`;
