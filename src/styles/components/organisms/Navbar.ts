import device from "@/utils/devices";
import styled from "styled-components";

export const Container = styled.header`
  z-index: 1000;
  position: fixed;
  margin: 0;
  top: 0;
  width: 100%;
  background: #FFFFFF;
  box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.08);

  @media ${device.laptop} {
    padding: 0 8.3%;
  }
`;

export const Content = styled.section`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const SidebarAndLogo = styled.section`
  display: flex;
`;

export const Logo = styled.h1`
  font-style: normal;
  font-weight: 900;
  color: #4D49C4;
  letter-spacing: 0.07em;

  font-size: 22px;
  line-height: 30px;

  margin-top: 9px;
  margin-bottom: 8px;
  margin-left: 16px;

  @media ${device.laptop} {
    font-size: 30px;
    line-height: 41px;
    margin-left: 0;
  }
`;

export const NavLinks = styled.section`
  display: none;

  @media ${device.laptop} {
    display: flex;
  }

  margin-top: 22px;
  margin-bottom: 22px;

  p {
    font-weight: normal;
    font-size: 16px;
    line-height: 22px;
    /* identical to box height, or 137% */

    text-align: right;
    letter-spacing: 0.192941px;

    /* Titles */

    color: #232B3B;

    & + p {
      margin-left: 1.5rem;

      @media ${device.laptopL} {
        margin-left: 49px;
      }
    }
  }
`;

export const Badges = styled.section`
  display: flex;
`;
