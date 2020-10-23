import styled from "styled-components";
import devices from '@/utils/devices';

interface OnlineUserMenuProps {
  isMenuOpen: boolean;
}

export const Container = styled.section`
  display: flex;
`;

export const OfflineUser = styled.button`
  display: flex;

  margin-right: 16.5px;

  @media ${devices.tablet} {
    margin-right: 0;
  }

  p {
    font-weight: bold;
    font-size: 16px;
    line-height: 24px;
    /* identical to box height, or 150% */

    text-align: right;
    letter-spacing: 0.192941px;

    /* azul CTA */

    color: #4D49C4;

    margin-left: 8.5px;
    margin-top: 12px;
    margin-bottom: 12px;
  }
`;

export const UserAvatarDummy = styled.div`
  background-color: rgba(188,195,212,0.3);

  border-radius: 50%;

  margin-top: 8px;
  margin-bottom: 8px;

  display: flex;
  align-items: center;
  justify-content: center;

  height: 32px;
  width: 32px;

  svg {
    color: #4D49C4;
    height: 20px;
    width: 20px;
  }
`;

export const OnlineUserMenu = styled.button`
  margin-right: 15px;

  position: relative;
`;

export const UserMenuContainer = styled.section`
  position: absolute;

  top: 40px;
  left: calc(-106px/2 + 32px/2);
`;

export const MenuArrow = styled.div`
  display: block;
  height: 20px;
  width: 20px;
  background-color: #EBEDF2;
  border: inherit;
  position: absolute;
  top: 5px;
  left: 43px;
  clip-path: polygon(0% 0%, 100% 100%, 0% 100%);
  transform: rotate(135deg);
  border-radius: 0 0 0 0.25em;
`;

export const MenuItems = styled.section`
  background: #EBEDF2;
  box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.08);
  border-radius: 6px;

  position: absolute;
  top: 11px;


  width: 106px;

  padding-top: 16px;
  padding-bottom: 11.5px;
  padding-left: 13px;

  text-align: left;
`;

export const MenuHelloItem = styled.article`
  p {
    font-style: normal;
    font-weight: 600;
    font-size: 12px;
    line-height: 16px;

    /* roxo */

    color: #4D49C4;
  }
`;

export const MenuItem = styled.article`
  p {
    font-style: normal;
    font-weight: 600;
    font-size: 12px;
    line-height: 16px;

    /* font */

    color: rgba(0, 0, 0, 0.7);

    margin-top: 8.3px;
  }
`;

