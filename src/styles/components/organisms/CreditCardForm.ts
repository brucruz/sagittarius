import styled from 'styled-components';

export const Container = styled.div`
  padding: 0 8px;

  .installments-container {
    margin: 24px 0;
  }
`;

export const MainCard = styled.div`
  margin-top: 32px;
  display: flex;
  align-items: center;
  background-color: #fff;
  border: 1px solid #bcc3d4;
  border-radius: 6px;
  padding: 6px 16px;

  div {
    margin-left: 16px;
    display: flex;
    flex-direction: column;
    align-items: baseline;

    span {
      font-weight: bold;
      font-size: 14px;
    }

    caption {
      font-size: 12px;
    }
  }

  img {
    height: 32px;
    width: 32px;
  }

  caption {
    min-width: max-content;
  }

  button {
    self-align: right;
    color: #4d49c4;
    text-decoration: underline;
    margin-left: auto;
  }
`;

export const ModalContainer = styled.div`
  width: 100%;
  padding: 24px 24px;
  max-width: 375px;
  align-self: center;

  h3 {
    font-size: 24px;
    line-height: 32px;
    letter-spacing: 0.192941px;
    color: #4d49c4;
  }

  .add-new-credit-card {
    text-align: center;
    width: 100% !important;
    margin: 24px 0;
    color: #4d49c4;
    text-decoration: underline;
  }

  .card-expiration-div > div {
    z-index: 4000;
  }

  .container-credit-card-fields {
    margin-top: 16px;
    background: #f0f6f9;
    border: 2px solid #4d49c4;
    box-sizing: border-box;
    border-radius: 6px;
    padding: 0 8px 24px 8px;
  }
`;

export const CardContainer = styled.div`
  margin: 16px 0;
  max-height: 220px;
  overflow-y: scroll;

  &::-webkit-scrollbar {
    display: block !important;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #4d49c4;
  }

  &::-webkit-scrollbar {
    width: 5px;
  }

  & > div {
    margin-top: 16px;
  }
`;

export const CardContent = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  padding: 6px 16px;
  background: #fff;
  border: 1px solid #bcc3d4;
  border-radius: 6px;

  img {
    height: 32px;
    width: 32px;
  }

  span {
    margin-left: 16px;
  }

  svg {
    color: #4d49c4;
    height: 22px;
    width: 22px;
    margin-left: auto;
  }
`;

export const CloseDiv = styled.div`
  margin-left: auto;
  margin-right: 16px;
  margin-top: 16px;
`;
