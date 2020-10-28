import device from "@/utils/devices";
import styled, { css } from "styled-components";

interface SideBarProps {
  isOpen: boolean;
}

export const Container = styled.section`

`;

export const HamburguerButton = styled.button<SideBarProps>`
  height: 32px;
  width: 32px;

  background-color: rgba(188,195,212,0.3);

  border: 0;
  border-radius: 50%;

  margin-top: 8px;
  margin-bottom: 8px;
  margin-left: 24px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  svg {
    height: 20px;
    width: 20px;

    color: #4D49C4;
  }

  @media ${device.laptopL} {
    display: none;
  }

  ${props => props.isOpen && css`
    background-color: #4D49C4;

    svg {
      color: #ffffff;
    }
  `}
`

export const Menu = styled.aside<SideBarProps>`
  ${props => !props.isOpen && css`
    display: none;
  `}

  position: fixed;

  width: 147px;
  height: calc(100vh - 49px);

  background-color: #4D49C4;

  box-shadow: 4px 0px 16px rgba(0, 0, 0, 0.08);
`;

export const MenuLinks = styled.div`
  margin-left: 24px;
  margin-top: 16px;

  a {
    cursor: pointer;
    text-decoration: none;

    p {
      opacity: 1;
    }

    &+a {
      margin-top: 7px;
    }
  }

  p {
      cursor: pointer;
      color: #ffffff;
      opacity: 0.3;

      font-weight: bold;
      font-size: 12px;
      line-height: 24px;
      /* identical to box height, or 200% */

      letter-spacing: 0.192941px;
    }
`;
