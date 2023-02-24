import styled from 'styled-components';

export const Container = styled.div`
  margin-bottom: 24px;

  button {
    display: flex;
    align-items: center;

    background: transparent;
    border: none;

    font-size: 16px;

    text-decoration: none;

    span {
      color: ${({ theme }) => theme.colors.primary.main};
      font-weight: bold;
    }


    img {
      transform: rotate(-90deg);
      margin-right: 8px;
    }
  }

  h1 {
    transition: all 0.2s ease-in;

    color: ${({ theme }) => theme.mode.textColor};

    font-size: 24px;
  }
`;
