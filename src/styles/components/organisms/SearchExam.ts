import device from "@/utils/devices";
import styled from "styled-components";

export const Container = styled.main``;

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


