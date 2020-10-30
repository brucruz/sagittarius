import device from "@/utils/devices";
import styled from "styled-components";

export const Header = styled.section`
  margin-top: 20px;
  margin-bottom: 12px;
`;

export const HeaderContent = styled.article`
  h4 {
    font-weight: bold;
    font-size: 16px;
    line-height: 24px;
    /* identical to box height, or 150% */

    letter-spacing: 0.192941px;

    /* Paragrafo */

    color: #3C4759;

    span {
      margin-left: 16px;

      font-weight: normal;
      font-size: 16px;
      line-height: 22px;
    }

    p {
      /* margin-left: 16px; */

      font-weight: normal;
      font-size: 16px;
      line-height: 22px;
    }

    & + h4 {
      margin-top: 10px;
    }
  }

  & + article {
    margin-top: 10px;
  }
`;

export const ModalHeader = styled.header`
  padding-top: 18px;
  padding-left: 18px;
  padding-right: 18px;

  @media ${device.tablet} {
    padding-left: 75px;
    padding-right: 75px;
  }

  h3 {
    font-weight: bold;
    font-size: 24px;
    line-height: 32px;
    /* or 133% */

    text-align: center;
    letter-spacing: 0.192941px;

    /* Azul Heali */

    color: #2F2C77;

    margin-bottom: 20px;
  }

  h5 {
    font-weight: bold;
    font-size: 16px;
    line-height: 24px;
    /* or 150% */

    text-align: center;
    letter-spacing: 0.192941px;

    /* Paragrafo */

    color: #3C4759;
  }
`;

export const CloseButton = styled.button`
  svg {
      margin-left: calc(100% - 18px);
      color: #BCC3D4;
      height: 20px;
      width: 20px;
    }
`;

export const ModalFooter = styled.footer`
  border-top: 1px solid #BCC3D4;

  div {
    padding-top: 16px;
    padding-left: 30px;
    padding-right: 30px;
    padding-bottom: 15px;

    @media ${device.tablet} {
    padding-left: 81px;
    padding-right: 81px;
  }
  }
`
