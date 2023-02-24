import styled, { css } from 'styled-components';

export default styled.input`
  width: 100%;

  background: ${({ theme }) => theme.mode.inputColor};
  border: 2px solid ${({ theme }) => theme.mode.inputColor};
  color: ${({ theme }) => theme.mode.textColor};
  border-radius: 4px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.04);
  height: 52px;
  outline: none;
  padding: 0 16px;
  appearance: none;

  transition: all 0.2s ease-in;

  &:focus {
    border-color: ${({ theme }) => theme.colors.primary.main};
  }

  &[disabled] {
    background: ${({ theme }) => theme.colors.gray[100]};
    border-color: ${({ theme }) => theme.colors.gray[200]};
  }

  ${({ theme, error }) => error && css`
    color: ${theme.colors.danger.main} !important;
    border-color: ${theme.colors.danger.main};
  `}
`;
