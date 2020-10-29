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

  h3 {
    margin-bottom: 24px;
  }
`

export const Group = styled.article`
  margin-bottom: 24px;

  h4 {
    font-weight: bold;
    font-size: 16px;
    line-height: 24px;
    /* identical to box height, or 150% */

    letter-spacing: 0.192941px;

    /* Paragrafo */

    color: #3C4759;

    margin-bottom: 8px;
  }

  div {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  }
`;
