import styled from 'styled-components';

export default styled.div`
display: flex;
align-items: flex-start;

margin-top: 16px;

gap: 24px;

span {
  color: ${({ theme }) => theme.colors.gray[200]};
  word-break: break-word;
}
`;
