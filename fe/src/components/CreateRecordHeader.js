import styled from 'styled-components';

export default styled.header`
  display: flex;
  align-items: center;
  justify-content: ${({ justifyContent }) => justifyContent};
  padding-bottom: 16px;

  border-bottom: 2px solid ${({ theme }) => theme.mode.headerBorderBottomColor};

  margin-top: 32px;

  transition: all 0.2s ease-in;

  strong {
    color: ${({ theme }) => theme.mode.textColor};

    font-size: 24px;

    transition: color 0.2s ease-in;
  }

  a {
    color: ${({ theme }) => theme.colors.primary.main};
    text-decoration: none;
    font-weight: bold;

    border: 2px solid ${({ theme }) => theme.colors.primary.main};
    border-radius: 4px;

    padding: 8px 16px;

    transition: all 0.2s ease-in;

    &:hover {
      background-color: #5061FC;
      color: ${({ theme }) => theme.colors.white};
    }
  }
`;
