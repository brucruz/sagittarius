import styled, { css } from 'styled-components';
import device from '@/utils/devices';

interface OptionsProps {
  type: 'small' | 'medium' | 'large';
  onModal?: boolean;
}

export const Base = styled.div`
  width: 100% !important;
  display: flex;
  flex-direction: column;

  @media ${device.tablet} {
    &.small {
      & > div:last-child {
        width: 156px;
      }
    }
  }
`;

export const Select = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 48px;
  background: #ffffff;
  border: 1px solid #bcc3d4;
  box-sizing: border-box;
  border-radius: 6px;
  z-index: 3;

  span {
    margin-left: 24px;
    color: #3c4759;
    font-size: 16px;
  }

  button {
    background: rgba(188, 195, 212, 0.3);

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
      color: #4d49c4;
      height: 20px;
      width: 20px;
    }
  }
`;

export const Options = styled.div<OptionsProps>`
  position: absolute;
  z-index: 2;
  background: #ffffff;
  margin-top: 48px;

  ${props =>
    props.onModal &&
    css`
      @media ${device.mobileS} {
        max-width: 36%;
      }

      @media ${device.mobileM} {
        width: 100%;
        max-width: 38%;
      }

      @media ${device.mobileL} {
        width: 100%;
        max-width: 146px;
      }
    `}

  @media ${device.mobileS} {
    width: calc(${props => (props.type === 'small' ? '50%' : '91.5%')} - 42px);
  }

  @media ${device.mobileM} {
    width: calc(${props => (props.type === 'small' ? '50%' : '93%')} - 42px);
  }

  @media ${device.mobileL} {
    width: calc(${props => (props.type === 'small' ? '50%' : '95%')} - 42px);
  }

  @media ${device.tablet} {
    width: 330px;
  }

  border-left: 1px solid #bcc3d4;
  border-right: 1px solid #bcc3d4;
  pointer: cursor;
  max-height: 141px;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    display: block !important;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #4d49c4;
  }

  &::-webkit-scrollbar {
    width: 5px;
  }
`;

export const Option = styled.div`
  border-bottom: 1px solid #bcc3d4;
  padding: 12px 24px;

  span {
    color: #3c4759;
    opacity: 0.8;
    cursor: pointer;
  }
`;
