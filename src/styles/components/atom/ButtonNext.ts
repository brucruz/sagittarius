import styled, { css } from "styled-components";

export const Container = styled.button`
  color: #fff;
  background: #247FA6;

  margin-top: 16px;

  padding-top: 12px;
  padding-bottom: 12px;
  padding-left: 24px;
  padding-right: 12px;

  width: 100%;
  z-index: 2;

  border-radius: 6px;
  border: 0;

  display: flex;
  justify-content: space-between;

  cursor: pointer;

  p {
    font-weight: bold;
    font-size: 16px;
    line-height: 24px;
    /* identical to box height, or 150% */

    letter-spacing: 0.192941px;
  }

  &:hover {
    background: linear-gradient(90deg, #2471A6 0%, #38A1CE 97.71%);
  }

  ${props => props.disabled && css`
    border: 1px solid rgba(0, 0, 0, 0.2);

    background-color: rgba(188,195,212,0.4);

    cursor: not-allowed;

    p {
      color: rgba(60,71,89,0.6);
    }

    &:hover {
      background: rgba(188,195,212,0.4);
    }
  `}
`;
