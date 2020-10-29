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
