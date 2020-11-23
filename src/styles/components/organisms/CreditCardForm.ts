import styled from 'styled-components';

export const Container = styled.div`
  padding: 0 8px;

  .input-credit {
    padding-left: 24px;
  }

  .card-expiration-div {
    margin-top: 24px;
    display: flex;
    justify-content: space-between;

    & > div {
      width: 100% !important;
    }

    & > div:nth-child(2) {
      margin-left: 16px;
    }
  }

  .cvv-div {
    margin-top: 24px;
    display: flex;
    align-items: center;

    header {
      margin: 0 !important;
    }

    & > div {
      width: 100%;
    }

    & > div:nth-child(2) {
      margin-left: 16px;
    }
  }
`;
