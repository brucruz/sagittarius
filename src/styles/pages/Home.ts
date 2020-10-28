import device from "@/utils/devices";
import styled from "styled-components";

export const SectionAbout = styled.section`
  margin-top: 91px;
  padding: 32px 4%;
  background-color: #F2F5FB;

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
    text-align: center;

    h2 {
      font-size: 32px;
      color: #2F2C77;
    }

    p {
      max-width: 1000px;
      font-size: 20px;
    }
  }
`;

export const SectionPayment = styled.section`
  margin-top: 74px;
  margin-bottom: 60px;
  margin-left: 4%;
  margin-right: 4%;

  @media ${device.tablet} {
    margin-left: 8.3%;
    margin-right: 8.3%; 
    text-align: center;

    p {
      font-weight: 700;
    }

    h2 {
      font-size: 32px;
    }
  }

  h2 {
    margin-bottom: 32px;
  }

  p {
    margin-bottom: 32px;
  }

  @media ${device.laptop} {
    margin: 128px auto;
    width: 100%;
    max-width: 700px;
  }
`;

export const PaymentOptions = styled.section`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

export const PaymentOption = styled.article`
  display: flex;
  justify-content: center;
  min-width: 165px;
  width: 100%;
  height: 118px;

  background: #F2F5FB;
  border-radius: 8px;
  margin-bottom: 16px;

  position: relative;
  width: calc(100% / 4 - 32px);

  &:first-child {
    margin-right: 0px;
  }

  &:nth-child(3) {
    margin-right: 0px;
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
  margin: 60px 4%;

  @media ${device.tablet} {
    margin-left: 8.3%;
    margin-right: 8.3%; 

    h2 {
      font-size: 32px;
      text-align: center;
    }
  }

  h2 {
    margin-bottom: 32px;
  }

  @media ${device.laptop} {
    margin: 60px auto;
    width: 100%;
    max-width: 700px;
  }
`;
