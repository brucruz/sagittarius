import device from "@/utils/devices";
import styled from "styled-components";

export const DateRange = styled.section`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;

  @media ${device.mobileM} {
    flex-direction: row;
    justify-content: space-between;

    section:last-child {
      div:nth-child(3) {
        right: 22px;

        @media ${device.tablet} {
          right: auto;
        }
      }
    }
  }
`;

export const HourSelection = styled.section`
  margin-top: 25px;

  section {
    margin-top: 16px;
  }
`
