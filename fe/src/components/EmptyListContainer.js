import styled from 'styled-components';

export default styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  margin-top: 16px;

  p {
    margin-top: 8px;
    text-align: center;
    color: ${({ theme }) => theme.colors.gray[200]};

    strong {
      color: ${({ theme }) => theme.colors.primary.main};
    }
  }

`;
