import styled from 'styled-components';

export const Container = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;

  padding: 16px 0;

  svg {
    color: ${({ theme }) => theme.colors.primary.main};
    cursor: pointer;
  }
`;
