import device from "@/utils/devices";
import styled from "styled-components";

export const BagBadgeContainer = styled.section`
  margin-right: 16.5px;
  margin-top: 8px;
  margin-bottom: 8px;

  position: relative;
`;

export const BagBadgeButton = styled.button`
  border-radius: 50px;
  background-color: rgba(188,195,212,0.3);

  display: flex;

  svg:first-child {
    color: #4D49C4;
    height: 20px;
    width: 20px;

    margin-top: 6px;
    margin-bottom: 6px;
    margin-left: 12px;
    margin-right: 4.5px;
  }

  p {
    display: none;

    font-weight: bold;
    font-size: 12px;
    line-height: 24px;
    /* identical to box height, or 200% */

    letter-spacing: 0.192941px;

    color: rgba(0, 0, 0, 0.7);

    margin-top: 4px;
    margin-bottom: 4px;

    @media ${device.mobileM} {
      display: block;
    }
  }

  svg:last-child {
    color: #4D49C4;

    height: 20px;
    width: 20px;

    margin-top: 6px;
    margin-bottom: 6px;
    margin-left: 5.5px;
    margin-right: 6px;
  }
`;

export const BagBadgeMenuContainer = styled.section`
  position: absolute;

  top: 40px;
  left: calc(-266px + 100%);

`;

export const MenuArrow = styled.div`
  display: block;
  height: 20px;
  width: 20px;
  background-color: #EBEDF2;
  border: inherit;
  position: absolute;
  top: -3px;
  right: 20px;
  clip-path: polygon(0% 0%, 100% 100%, 0% 100%);
  transform: rotate(135deg);
  border-radius: 0 0 0 0.25em;
`;

export const BagBadgeMenu = styled.section`
  background: #EBEDF2;
  box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.08);
  border-radius: 6px;
  width: 266px;
  min-height: 150px;

  padding-top: 20px;
`;

export const BagBadgeLabSummary = styled.section`
  padding-left: 8px;
  padding-right: 14px;

  width: 100%;

  border-bottom: 1px solid rgba(35,43,59,0.16);

  article {
    display: flex;
    width: 100%;

    align-items: center;

    margin-bottom: 12px;

    div:first-child {
      background: #FFFFFF;
      border-radius: 4px;

      width: 40px;
      height: 40px;

      margin-right: 12px;

      img {
        width: 40px;
        height: 40px;
        object-fit: contain;      }
    }

    div:last-child {
      width: calc(100% - 40px - 12px);

      h5 {
        font-weight: bold;
        font-size: 12px;
        line-height: 16px;

        /* roxo */

        color: #4D49C4;
      }

      div {
        width: 100%;

        display: flex;
        justify-content: space-between;

        margin-top: 4px;

        p {
          font-style: normal;
          font-weight: 600;
          font-size: 12px;
          line-height: 16px;

          /* Paragrafo */

          color: rgba(60,71,89,0.8);
        }
      }
    }
  }
`;

export const EmptyBagContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  margin-bottom: 12px;
  svg {
    color: #247FA6;
    height: 36px;
    width: 36px;
  }
  p {
    margin-top: 10px;
    font-size: 14px;
  }
`;

export const BagBadgeSummary = styled.section`
  padding-top: 8px;
  padding-bottom: 8px;
  margin-right: 14px;

  text-align: right;

  border-bottom: 1px solid rgba(35,43,59,0.16);

  h6 {
    font-style: normal;
    font-weight: 600;
    font-size: 12px;
    line-height: 16px;
    text-align: right;

    /* Paragrafo */

    color: #3C4759;

    strong {
      font-weight: bold;
    }
  }
`;

export const BagBadgeFooter = styled.footer`
  display: flex;
  justify-content: space-between;

  p {
    font-weight: 600;
    font-size: 12px;
    line-height: 16px;
    text-decoration-line: underline;

    color: #3C4759;

    margin-left: 33px;
    margin-top: 12px;
    margin-bottom: 26px;

    cursor: pointer;
  }

  button {
    background: #247FA6;
    border-radius: 6px;

    padding: 4px 12px;

    margin-right: 14px;
    margin-top: 8px;
    margin-bottom: 22px;

    font-weight: 600;
    font-size: 12px;
    line-height: 16px;
    text-align: center;

    /* BG */

    color: #F2F5FB;
  }
`;
