import styled, { css } from 'styled-components';

export const StyledButton = styled.button`
  height: 52px;
  padding: 0 16px;
  font-size: 16px;
  background-color: ${({ theme }) => theme.colors.primary.main};
  border: none;
  border-radius: 4px;
  color: #fff;
  font-weight: bold;

  display: flex;
  align-items: center;
  justify-content: center;

  transition: all 0.2s ease-in;

  &:hover {
    background-color: ${({ theme }) => theme.colors.primary.light};
  }

  &:active {
    background-color: ${({ theme }) => theme.colors.primary.dark};
  }

  &[disabled] {
    background-color: ${({ theme }) => theme.mode.buttonDisabledColor} !important;
    color: ${({ theme }) => theme.mode.textDisabledColor} !important;
    cursor: default !important;
  }

  ${({ theme, danger }) => danger && css`
    background-color: ${theme.colors.danger.main};

    &:hover {
      background-color: ${theme.colors.danger.light};
    }

    &:active {
      background-color: ${theme.colors.danger.dark};
    }

  `}
`;
