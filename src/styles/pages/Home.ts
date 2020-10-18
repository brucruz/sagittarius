import styled from "styled-components";

export const SectionAbout = styled.section``;

export const SectionPayment = styled.section`
  margin-top: 60px;
  margin-bottom: 60px;
  margin-left: 25px;
  margin-right: 25px;

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
  /* justify-content: space-between; */
`;

export const PaymentOption = styled.article`
  width: 150px;
  height: 118px;

  background: rgba(196, 196, 196, 0.3);
  border-radius: 8px;

  position: relative;

  margin-bottom: 16px;

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

  &:first-child {
    margin-right: 16px;
  }

  &:nth-child(3) {
    margin-right: 16px;
  }
`;

export const SectionFAQ = styled.section`
  margin-top: 60px;
  margin-bottom: 60px;
  margin-left: 25px;
  margin-right: 25px;

  h2 {
    margin-bottom: 32px;
  }
`;
