import styled from 'styled-components'

import { FocusRingStyles } from '../FocusRing/styles'

/* eslint-disable import/prefer-default-export */
export const ButtonStyles = styled.button`
  position: relative;
  display: ${({ display }) => (display === 'block' ? 'flex' : 'inline-flex')};
  align-items: center;
  justify-content: center;
  cursor: pointer;
  padding: ${({ theme }) => theme.padding};
  margin: ${({ margin }) => margin};
  box-sizing: border-box;
  color: ${({ theme, color }) => theme[color].color};
  background: ${({ theme, color }) => theme[color].background};

  font-size: ${({ theme }) => theme.fontSize};
  font-weight: ${({ theme }) => theme.fontWeight};
  line-height: ${({ theme }) => theme.lineHeight};

  border-width: ${({ theme }) => theme.borderWidth};
  border-style: ${({ theme }) => theme.borderStyle};
  border-color: ${({ theme, color }) => theme[color].borderColor};
  border-radius: ${(props) => generateBorderRadius(props)};

  height: ${({ theme }) => theme.height};
  width: ${({ theme, display }) => (display === 'block' ? '100%' : theme.width)};

  transition: background ${({ theme }) => theme.transitionDuration};

  &:active {
    box-shadow: ${({ theme }) => theme.shadow};
    color: ${({ theme, color }) => theme[color].activeColor};
  }

  &:hover {
    background: ${({ theme, color }) => theme[color].hoverBackground};
    color: ${({ theme, color }) => theme[color].hoverColor};
  }

  &:focus {
    outline: none;
    color: ${({ theme, color }) => theme[color].focusColor};

    &:hover {
      color ${({ theme, color }) => theme[color].hoverColor};
    }

    ${FocusRingStyles} {
      display: inline-block;
    }
  }
`
/* eslint-enable import/prefer-default-export */

const generateBorderRadius = ({ theme, shape }) => (
  shape === 'rectangular' ? theme.borderRadiusRectangular : theme.borderRadiusCircular
)