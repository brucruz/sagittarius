import device from "@/utils/devices";
import styled from "styled-components";

export const Container = styled.main``;

export const InitialState = styled.section`
  @media ${device.tablet} {
    height: 700px;
    background-color: #c4c4c4;
  }
`;

export const Banner = styled.img`
  width: 100%;

  margin-top: 15px;

  @media ${device.tablet} {
    display: none;
  }
`;

export const InitialStateContent = styled.section`
  margin: 0 8.3%;

  @media ${device.tablet} {
    position: absolute;
    top: 300px;
  }
`;

export const ValueProposition = styled.section`
  z-index: 100;
  margin-top: -180px;

  @media ${device.mobileM} {
    margin-top: -110px;
  }

  @media ${device.mobileL} {
    margin-top: -150px;
  }

  @media ${device.tablet} {
    margin-top: -80px;
  }

  h1 {
    margin-bottom: 20px;

    font-weight: 800;
    font-size: 32px;
    line-height: 34px;
    /* or 106% */

    letter-spacing: 0.192941px;
  }

  h3 {
    line-height: 1.4rem;
    margin-bottom: 48px;
  }

`;

export const ExamState = styled.section`
  margin-left: 25px;
  margin-right: 25px;

  padding-top: 2px;

  @media ${device.tablet} {
    max-width: 400px;
    margin: 64px auto;
  }
`;

export const AddressState = styled.section`
  margin-left: 25px;
  margin-right: 25px;

  padding-top: 2px;

  @media ${device.tablet} {
    max-width: 400px;
    margin: 64px auto;
  }
`;


