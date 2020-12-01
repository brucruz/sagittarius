import styled from 'styled-components';
import device from '@/utils/devices';

export const Content = styled.div`
  & > a button:nth-child(1) {
    margin-top: 32px;
    margin-bottom: 16px;
  }
`;

export const ExperienceButton = styled.button`
  background: none;
  color: #4d49c4;
  width: 100%;
  text-align: center;
`;

export const CopyContent = styled.div`
  cursor: pointer;
  background: #fff;
  margin-top: 24px;
  display: flex;
  padding: 8px 16px;
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 6px;
  align-items: center;

  div.text {
    display: flex;
    flex-direction: column;
    margin-right: 16px;
    width: 85%;
    @media ${device.mobileL} {
      width: 90%;
    }
  }

  svg {
    margin-left: auto;
    fill: #4d49c4;
  }

  label {
    font-size: 12px;
    color: #3c4759;
    opacity: 0.6;
    padding: 0 !important;
    text-align: center;
  }

  span {
    text-align: center;
    margin-top: 8px;
    color: #3c4759;
    display: inline-block;
    width: 100%;
  }
`;
