import styled from 'styled-components';

export const Container = styled.div`
  margin-top: 24px;

  .input-payment {
    padding-left: 24px;
  }

  .last-element {
    margin-bottom: 24px;
  }

  .docs-div {
    display: flex;
    margin-top: 16px;
    justify-content: space-between;
  }

  .double-input-div {
    width: 100%;
    display: flex;

    section {
      width: 100%;
      max-width: 50%;
    }

    div {
      width: fit-content;
    }

    input {
      width: 100%;
    }

    section:last-child {
      margin-left: 16px;
    }
  }
`;
