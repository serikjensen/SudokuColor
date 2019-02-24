import React, { Component } from 'react'
import PropTypes from 'prop-types'

import ScreenReaderContent from '@instructure/ui-a11y/lib/components/ScreenReaderContent'
import PresentationContent from '@instructure/ui-a11y/lib/components/PresentationContent'

import Button from '../Button'

import themeable from '../theming/themeable'
import composeTheme from './theme'

class IconButton extends Component {
  static propTypes = {
    icon: PropTypes.oneOfType([PropTypes.func, PropTypes.node]),
    label: PropTypes.node,
    margin: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    color: PropTypes.oneOf(['primary', 'secondary', 'neutral'])
  }

  static defaultProps = {
    icon: null,
    label: null,
    margin: 0,
    color: 'primary'
  }

  _buttonRef = null

  focus () {
    this._buttonRef.focus()
  }

  handleButtonRef = (el) => {
    this._buttonRef = el
  }

  render () {
    const {
      label,
      icon,
      Icon = icon, // eslint-disable-line react/prop-types
      ...props
    } = this.props

    const buttonProps = {
      shape: 'rectangular',
      ref: this.handleButtonRef,
      ...props
    }

    return (
      <Button {...buttonProps}>
        <ScreenReaderContent>{label}</ScreenReaderContent>
        <PresentationContent><Icon /></PresentationContent>
      </Button>
    )
  }
}

export default themeable(IconButton, composeTheme, true)
