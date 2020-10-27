import styled, { keyframes, css } from 'styled-components';

interface PinBounceProps {
  type?: 'user' | 'vendor';
}

const markerTypeVariations = {
  user: css`
    background: #2d2a7b;
  `,
  vendor: css`
    background: #0c81a2;
  `,
};

const bounce = keyframes`
  0% {
    opacity: 0;
    transform: translateY(-2000px) rotate(-45deg);
  }

  60% {
    opacity: 1;
    transform: translateY(30px) rotate(-45deg);
  }

  80% {
    transform: translateY(-10px) rotate(-45deg);
  }

  100% {
    transform: translateY(0) rotate(-45deg);
  }
`;

const pulsate = keyframes`
  0% {
    transform: scale(0.1, 0.1);
    opacity: 0;
  }

  50% {
    opacity: 1;
  }

  100% {
    transform: scale(1.2, 1.2);
    opacity: 0;
  }
`;

export const PinBounce = styled.div<PinBounceProps>`
  width: 30px;
  height: 30px;
  border-radius: 50% 50% 50% 0;

  ${props => markerTypeVariations[props.type || 'vendor']}

  position: absolute;
  transform: rotate(-45deg);
  left: 50%;
  top: 50%;
  margin: -20px 0 0 -20px;

  &:after {
    content: '';
    width: 14px;
    height: 14px;
    margin: 8px 0 0 8px;
    background: #e6e6e6;
    position: absolute;
    border-radius: 50%;
  }
`;

export const Pulse = styled.div`
  animation-name: ${bounce};
  animation-fill-mode: both;
  animation-duration: 1s;

  background: #d6d4d4;
  border-radius: 50%;
  height: 14px;
  width: 14px;
  position: absolute;
  left: 50%;
  top: 50%;
  margin: 11px 0px 0px -12px;
  transform: rotateX(55deg);
  z-index: -2;

  &:after {
    content: '';
    border-radius: 50%;
    height: 40px;
    width: 40px;
    position: absolute;
    margin: -13px 0 0 -13px;
    animation: ${pulsate} 1s ease-out;
    animation-iteration-count: infinite;
    opacity: 0;
    box-shadow: 0 0 1px 2px #2d2a7b;
    animation-delay: 1.1s;
  }
`;
