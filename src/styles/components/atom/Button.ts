import styled, { css } from 'styled-components';

export const Base = styled.button`
  color: #fff;
  background: #4d49c4;
  width: 100%;
  padding: 12px;
  border-radius: 6px;
  font-weight: 700;
  font-size: 16px;

  &:hover {
    background: linear-gradient(90deg, #4d49c4 0%, #7672dd 97.71%);
  }

  ${props =>
    props.disabled &&
    css`
      border: 1px solid rgba(0, 0, 0, 0.2);

      background-color: rgba(188, 195, 212, 0.4);

      cursor: not-allowed;

      color: rgba(60, 71, 89, 0.6);

      &:hover {
        background: rgba(188, 195, 212, 0.4);
      }
    `}
`;
