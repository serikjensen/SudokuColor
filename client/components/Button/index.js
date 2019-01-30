import React, { Component } from 'react'
import PropTypes from 'prop-types'

import FocusRing from '../FocusRing'

import themeable from '../theming/themeable'
import composeTheme from './theme'
import { ButtonStyles } from './styles'

class Button extends Component {
  static propTypes = {
    children: PropTypes.node,
    color: PropTypes.oneOf(['primary', 'secondary', 'neutral']),
    shape: PropTypes.oneOf(['circular', 'rectangular']),
    display: PropTypes.oneOf(['inline', 'block']),
    margin: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
  }

  static defaultProps = {
    children: null,
    color: 'primary',
    shape: 'circular',
    display: 'inline',
    margin: 0
  }

  render () {
    const {
      shape,
      children,
      ...props
    } = this.props

    const buttonProps = {
      shape,
      ...props
    }

    return (
      <ButtonStyles {...buttonProps}>
        {children}
        <FocusRing shape={shape} />
      </ButtonStyles>
    )
  }
}

export default themeable(Button, composeTheme)
