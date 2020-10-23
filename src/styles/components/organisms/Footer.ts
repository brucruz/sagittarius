import styled from "styled-components";
import device from '@/utils/devices';

export const Container = styled.footer`
  background-color: #232b3b;
  color: #fff;

  display: flex;
  flex-direction: column;
  align-items: center;

  @media ${device.tablet} {
    padding: 0 8.3%;
  }
`;

export const FooterHeader = styled.header`
  padding-top: 25px;

  .heali-span {
    display: none;
  }

  @media ${device.tablet} {
    .heali-span {
      display: block;
      font-family: 'Russo One', sans-serif;
      font-size: 30px;
    }

    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    width: 100%;
  }

  h4 {
    font-weight: bold;
    font-size: 14px;
    line-height: 24px;
    /* identical to box height, or 171% */

    letter-spacing: 0.192941px;
  }
`;

export const SocialButtons = styled.section`
  margin-top: 25px;

  display: flex;
  align-items: center;
  justify-content: center;

  img {
    &+img {
      margin-left: 24px;
    }
  }

  @media ${device.tablet} {
    justify-content: left;
    margin-top: 16px;
  }
`;

export const FooterDivisionLine = styled.div`
  height: 1px;
  width: 100%;

  border: 1px solid rgba(255, 255, 255, 0.6);

  margin-top: 25px;
`;

export const FooterFooter = styled.footer`
  margin-top: 25px;
  margin-bottom: 10px;

  span.span-dash {
    display: none;
  }

  p {
    font-weight: normal;
    font-size: 12px;
    line-height: 22px;
    /* or 183% */

    text-align: center;
    letter-spacing: 0.192941px;
  }

  width: 180px;

  @media ${device.tablet} {
    width: 100%;

    p {
      display: flex;
      justify-content: center;
    }

    span.span-dash {
      display: block;
    }
  }
`;
