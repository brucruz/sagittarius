import styled from 'styled-components';
import React from 'react';

export const ForgotPasswordContainer = styled.div`
  margin-top: 16px;

  & ~ button {
    margin-top: 24px;
    margin-bottom: 32px;

    & ~ span {
      font-weight: 700;
      font-size: 14px;
    }
  }
`;

export const ForgotPassword = styled.a`
  font-size: 14px;
  cursor: pointer;
  font-weight: 700;
  text-decoration: underline;
`;

export const SocialButton = styled.button`
  background: #ffffff;
  border: 1px solid #bcc3d4;
  box-sizing: border-box;
  border-radius: 4px;
  color: #3c4759;
  width: 100%;
  padding: 10px 0;
`;

export const SocialButtonsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 16px;
  margin-bottom: 24px;

  button {
    flex: 0 49%;
  }
`;

export const RegisterLink = styled.a`
  text-decoration: underline;
  font-size: 14px;
  color: rgba(0, 0, 0, 0.6);
  cursor: pointer;
  span {
    color: blue;
  }
`;
