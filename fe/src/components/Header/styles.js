import styled from 'styled-components';

export const Container = styled.header`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  margin-top: 66px;
  margin-bottom: 48px;
`;

export const Svg = styled.svg`
  width: 201.38px;
  height: 34.04px;

  path:last-child {
    transition: fill 0.2s linear;

    fill: ${({ theme }) => theme.mode.logoColor};
  }
`;
