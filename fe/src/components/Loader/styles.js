import styled from 'styled-components';

export const Overlay = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  background: ${({ theme }) => theme.mode.overlayColor};
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
`;
