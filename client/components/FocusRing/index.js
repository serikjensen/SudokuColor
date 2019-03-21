import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import themeable from '../theming/themeable'
import composeTheme from './theme'
import { FocusRingStyles } from './styles'

class FocusRing extends PureComponent {
  static propTypes = {
    shape: PropTypes.oneOf(['rectangular', 'circular'])
  }

  static defaultProps = {
    shape: 'rectangular'
  }

  render () {
    return <FocusRingStyles {...this.props} />
  }
}

export default themeable(FocusRing, composeTheme)