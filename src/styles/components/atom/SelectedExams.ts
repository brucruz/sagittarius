import styled from 'styled-components';

export const SelectedExamsContainer = styled.section`
  width: 100%;

  margin-bottom: 16px;

  position: relative;
  z-index: 10;
`;

export const SelectedExamsSummary = styled.header`
  width: 100%;
  display: flex;
  justify-content: space-between;

  background: #ffffff;
  /* grey staff */

  border: 1px solid #bcc3d4;
  box-sizing: border-box;
  border-radius: 6px;

  z-index: 200;

  margin-top: 12px;

  cursor: pointer;

  p {
    font-weight: bold;
    font-size: 16px;
    line-height: 24px;
    /* identical to box height, or 150% */

    letter-spacing: 0.192941px;

    margin-left: 16px;
    margin-top: 13px;
    margin-bottom: 11px;
  }

  button {
    background: rgba(188, 195, 212, 0.3);

    height: 32px;
    width: 32px;

    border-radius: 50%;
    border: 0;

    margin-right: 12px;
    margin-top: 8px;
    margin-bottom: 8px;

    display: flex;
    align-items: center;
    justify-content: center;

    svg {
      color: #4d49c4;
      height: 20px;
      width: 20px;
    }
  }
`;

export const SelectedExamsDetail = styled.footer`
  width: 100%;

  background: #ffffff;
  /* grey staff */

  border: 1px solid #bcc3d4;

  position: absolute;
  z-index: -2;
  top: 45px;

  border-bottom: 1px solid rgba(35, 43, 59, 0.16);

  max-height: 100px;
  overflow-x: hidden;
  overflow-y: auto;

  article {
    display: flex;
    justify-content: space-between;

    border-bottom: 1px solid rgba(35, 43, 59, 0.16);

    p {
      margin-top: 10px;
      margin-bottom: 10px;
      margin-left: 24px;

      font-style: normal;
      font-weight: 600;
      font-size: 12px;
      line-height: 16px;

      /* Paragrafo */

      color: #3c4759;
      opacity: 0.8;
    }

    svg {
      margin-top: 10px;
      margin-bottom: 10px;
      margin-right: 20px;

      height: 16px;
      width: 16px;

      color: rgba(60, 71, 89, 0.6);

      cursor: pointer;
    }
  }
`;
