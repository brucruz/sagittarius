import device from "@/utils/devices";
import styled from "styled-components";

export const BagContent = styled.div`
  display: flex;
  flex-direction: column;

  @media ${device.tablet} {
    flex-direction: row;
  }
`;

export const ItemsContainer = styled.div`
  margin-top: 16px;
  background: #FFFFFF;
  border: 1px solid #BCC3D4;
  box-sizing: border-box;
  border-radius: 6px;

  .header-items-container {
    display: flex;
    justify-content: space-between;
    padding: 16px 16px 16px 24px;

    div {
      text-align: left;

      span {
        font-weight: 700;
      }
    }

    div:last-child {
      width: 120px;

      span { 
        width: 120px;
      }
    }
  }

  .content-items-container {

    max-height: 210px;
    overflow-y: scroll;

    &::-webkit-scrollbar {
      display: block !important;
    }

    &::-webkit-scrollbar-thumb {
      background-color: #4D49C4;
    }

    &::-webkit-scrollbar {
      width: 5px;
    }

    .lab-item {
      border-top: 1px solid #BCC3D4;
      display: flex;
      flex-direction: column;
      padding: 16px 8px 16px 24px;

      .title-lab-item {
        font-weight: 700;
        font-size: 16px;
        margin-bottom: 16px;
      }

      .exam-lab-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 16px;

        img {
          cursor: pointer;
          height: 32px;
          width: 32px;
        }

        div:first-child {
          width: 100%;

          span {
            width: 100%;
          }

        }

        div:last-child {
          display: flex;
          align-items: center;
          width: 120px;

          span { 
            width: 120px;
          }
        }

        @media ${device.tablet} {

          & > div:first-child {
            width: 65%;
          }
          
          div:last-child {
            width: 125px;
          }
        }
      }
    }
  }

  .desktop-footer {
    display: none;

    @media ${device.tablet} {
      display: block;
      
      & > div:first-child {
        border-bottom: none;
        background: #fff;

        & > span:first-child {
          color: #2F2C77;
        }
      }
    }
  }
`;

export const ConfirmOrder = styled.div`
  margin-top: 64px;
  width: 100vw;
  margin-left: -24px;
  margin-bottom: -64px;

  div:first-child {
    border-radius: 6px 6px 0px 0px;
  }

  & > div:nth-child(2) {
    padding: 16px 24px;

    button {
      text-transform: uppercase;
      padding: 16px 0;
    }
  }

  @media ${device.tablet} {
    margin: 16px 0 0 16px;
    width: 60%;
    border: 1px solid #BCC3D4;
    border-radius: 6px 6px 0px 0px;
    border-top: none;
    height: fit-content;
  }
`;