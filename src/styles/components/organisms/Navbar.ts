import styled from "styled-components";

export const Container = styled.header`
    position: fixed;
    z-index: 10;
    top: 0;
    width: 100%;
    background: #FFFFFF;
    box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.08);
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
`;

export const Badges = styled.section`
  display: flex;
`;
