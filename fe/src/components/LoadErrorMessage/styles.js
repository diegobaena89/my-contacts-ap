import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  gap: 24px;

  padding: 16px;

  div {
    span {
      font: bold 22px 'Sora', sans-serif;
      color: ${({ theme }) => theme.colors.danger.dark};
      display: block;
      padding-bottom: 8px;
    }
  }
`;
