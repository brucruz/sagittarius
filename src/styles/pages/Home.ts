import device from "@/utils/devices";
import styled from "styled-components";

export const SectionAbout = styled.section`
  margin-top: 91px;
  margin-left: 25px;
  margin-right: 25px;

  article {
    p {
        margin-top: 24px;
      &+p {
        margin-top: 16px;
      }
    }
  }

  @media ${device.tablet} {
    margin-top: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-left: 0;
    margin-right: 0; 
    padding: 100px 8.3%;
    background-color: #247FA6;
    text-align: center;

    h2 {
      font-size: 32px;
      color: #fff;
    }

    p {
      max-width: 1000px;
      font-size: 20px;
      color: #fff;
    }
  }
`;

export const SectionPayment = styled.section`
  margin-top: 74px;
  margin-bottom: 60px;
  margin-left: 25px;
  margin-right: 25px;

  @media ${device.tablet} {
    margin-left: 8.3%;
    margin-right: 8.3%; 
  }

  h2 {
    margin-bottom: 32px;
  }

  p {
    margin-bottom: 32px;
  }
`;

export const PaymentOptions = styled.section`
  display: flex;
  flex-wrap: wrap;

  @media ${device.tablet} {
    justify-content: space-between;
  }
`;

export const PaymentOption = styled.article`
  min-width: 165px;
  width: 100%;
  height: 118px;

  background: rgba(196, 196, 196, 0.3);
  border-radius: 8px;

  position: relative;

  margin-bottom: 16px;

  @media ${device.mobileL} {
    width: calc(100% / 2 - 16px);

    &:first-child {
      margin-right: 16px;
    }

    &:nth-child(3) {
      margin-right: 16px;
    }
  }

  @media ${device.tablet} {
    width: calc(100% / 4 - 32px);

    &:first-child {
      margin-right: 0px;
    }

    &:nth-child(3) {
      margin-right: 0px;
    }
  }


  p {
    font-weight: bold;
    font-size: 16px;
    line-height: 50px;
    /* identical to box height, or 312% */

    letter-spacing: 0.192941px;

    color: #4D49C4;

    position: absolute;

    bottom: 0;

    margin-left: 16px;
    margin-bottom: 0;
  }

`;

export const SectionFAQ = styled.section`
  margin-top: 60px;
  margin-bottom: 60px;
  margin-left: 25px;
  margin-right: 25px;

  @media ${device.tablet} {
    margin-left: 8.3%;
    margin-right: 8.3%; 
  }

  h2 {
    margin-bottom: 32px;
  }
`;
