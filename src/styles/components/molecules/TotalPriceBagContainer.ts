import styled from 'styled-components';

export const Container = styled.div`
  background: #f0f6f9;
  border-top: 1px solid #bcc3d4;
  border-bottom: 1px solid #bcc3d4;
  padding: 8px 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  span {
    font-size: 14px;
    font-weight: 700;
  }

  .content-price {
    margin-right: 22px;
    span {
      font-size: 12px !important;
      font-weight: 400 !important;
    }

    h2 {
      font-size: 16px;
      margin-top: -8px;
      color: #4d49c4;
    }
  }
`;
