import styled from "styled-components";

export const Container = styled.header`
    position: fixed;
    top: 0;
    width: 100%;
    background-color: #fff;
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

export const Line = styled.div`
  height: 1px;
  width: 100%;
  background-color: rgba(196, 196, 196, 0.2);
`;
