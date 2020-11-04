import device from "@/utils/devices";
import styled from "styled-components";

export const Container = styled.div`
  display: none;

  button {
    margin-right: 16px;
  }

  @media ${device.laptop} {
    display: flex;
    align-items: center;
    width: 100%;

    @media ${device.laptopL} {
      margin-top: 88px;
    }

    margin-top: 64px;
    margin-bottom: 32px;
    padding: 0 8.3%;

    section, header {
      margin: 0 !important;
    }

    & > section {
      width: 100%;
      display: flex;
      justify-content: space-between;

      & > section {

        margin-left: 16px !important;

        header { 
          margin: 0 !important;
        }
 
      }

      & > footer { 
        margin-top: 48px !important;
        width: 49% !important;
      }
    }

    & > section:last-child {
      width: 30%;
      margin-left: 16px !important;

      section {
        display: none !important;
      }
    }
  }
`;