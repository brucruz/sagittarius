import device from "@/utils/devices";
import styled from "styled-components";

export const InitialStateContainer = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;

  @media ${device.tablet} {
    height: 700px;
    flex-direction: row-reverse;
    align-items: center;
    justify-content: space-between !important;
  }
`;

export const Banner = styled.img`
  width: 100%;
  padding: 40px 64px;

  @media ${device.tablet} {
    width: 40%;
    padding-right: 8.3%;
    padding-left: 0;
  }
`;

export const InitialStateContent = styled.section`
  margin: 0 4%;

  button {
    width: 100%;
    padding: 12px 60px;
    color: #fff;
    font-weight: 700;
    background: linear-gradient(90deg, #4D49C4 0%, #7672DD 97.71%);
    border-radius: 6px;
    filter: drop-shadow(0px 4px 16px rgba(0, 0, 0, 0.16));
  }

  @media ${device.tablet} {
    margin-left: 8.3%;
    
    button {
      width: auto;
    }
  }

  @media ${device.laptop} {
    button {
      font-size: 20px;
    }
  }

`;

export const ValueProposition = styled.section`
  z-index: 100;

  h1 {
    margin-bottom: 16px;
    font-size: 24px;
    line-height: 40px;
    
    /* Titles */
    
    color: rgba(35, 43, 59, 0.96);
  }

  h3 {
    font-weight: 400;
    font-size: 16px;
    line-height: 22px;
    letter-spacing: 0.192941px;
    color: rgba(35, 43, 59, 0.96);
    margin-bottom: 24px;
  }

  @media ${device.tablet} {
    h1 {
      font-size: 32px;
    }
  }

  @media ${device.laptop} {
    h1 {
      font-size: 40px;
      line-height: 50px;
    }
  }

`;
