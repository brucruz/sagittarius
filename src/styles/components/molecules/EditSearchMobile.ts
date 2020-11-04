import styled from "styled-components";
import device from '@/utils/devices';

export const Container = styled.div`
  display: flex;
  flex-direction: column;

  button {
    margin-right: auto;
    margin-bottom: 16px;
  }

  width: 100%;
  margin: 8px 0;

  border-bottom: 1px solid #BCC3D4;

  img {
    cursor: pointer;
  }

  @media ${device.laptop} {
    display: none;
  }

  &.in-detail-page {
    width: calc(100% - 48px);
    margin-left: 24px;
    margin-right: 24px;
    margin-top: 88px !important;
  }
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #BCC3D4;
  padding: 8px 0;
`;

export const Content = styled.div`
  margin-top: 6px;
  display: flex;
  flex-direction: column;

  section {
    margin-top: 12px;
    margin-bottom: 0;

    header {
      margin: 0;
    }
  }

  & > section:last-child {
    margin-bottom: 4px;
  }

  @media ${device.laptop} {
    display: flex;
    flex-direction: row;
  }
`;