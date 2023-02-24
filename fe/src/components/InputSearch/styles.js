import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;

  input {
    background: ${({ theme }) => theme.mode.inputColor};
    color: ${({ theme }) => theme.mode.textColor};

    width: 100%;
    height: 50px;
    padding: 0 16px;

    border: none;
    border-radius: 25px;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);

    outline: 0;

    transition: all 0.2s ease-in;

    &::placeholder {
      color: ${({ theme }) => theme.colors.gray[200]};
    }
  }
`;
