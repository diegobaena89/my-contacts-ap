import styled from 'styled-components';

export const Container = styled.div`
  & + & {
    margin-top: 16px;
  }

  small {
    display: block;
    font-size: 12px;
    margin-top: 8px;
    color: ${({ theme }) => theme.colors.danger.main}
  }

  position: relative;

  .loader {
    position: absolute;
    right: 16px;
    top: 18px;
  }
`;
