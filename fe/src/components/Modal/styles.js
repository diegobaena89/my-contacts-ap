/* eslint-disable quotes */
import styled, { keyframes } from "styled-components";

const fadeIn = keyframes`
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
`;

const scaleIn = keyframes`
  from {
    transform: scale(0);
  }

  to {
    transform: scale(1);
  }
`;

export const Overlay = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(3px);
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  animation: ${fadeIn} 0.3s;
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;

  max-width: 450px;
  padding: 24px;

  background-color: #fff;
  border-radius: 4px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.04);
  animation: ${scaleIn} 0.3s;

  > strong {
    font-size: 22px;
    color: ${({ theme, danger }) => danger && theme.colors.danger.main};
  }

  .modal-body {
    margin-top: 32px;
  }
`;

export const Footer = styled.footer`
  margin-top: 32px;

  display: flex;
  align-items: center;
  justify-content: end;

  .cancel-button {
    background: none;
    border: none;
    margin-right: 24px;

    font-size: 16px;

    color: ${({ theme }) => theme.colors.gray[200]};

    &[disabled] {
      cursor: not-allowed;
    }
  }
`;

/* export const WarningContainer = styled.div`
  display: flex;
  flex-direction: column;

`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: end;

  gap: 8px;

  .delete {
    padding: 10px 16px;
    background-color: ${({ theme }) => theme.colors.danger};
    color: #fff;
    border: 2px solid #fff;
    border-radius: 4px;

  }
`; */
