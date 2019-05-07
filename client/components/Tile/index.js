import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { omitProps } from '@instructure/ui-react-utils'

import { ScreenReaderContent, PresentationContent } from '@instructure/ui-a11y'

import { IconEditLine, IconTrashSolid } from '@instructure/ui-icons'

import FocusRing from '../FocusRing'

import themeable from '../theming/themeable'
import composeTheme from './theme'
import {
  DefaultFacadeStyles,
  PresentationFacadeStyles,
  EditFacadeStyles,
  RemoveFacadeStyles,
  EditLabelStyles,
  HighlightStyles
} from './styles'

class Tile extends Component {
  static propTypes = {
    value: PropTypes.number,
    label: PropTypes.node,
    facade: PropTypes.oneOf(['default', 'presentation', 'edit', 'remove']),
    onClick: PropTypes.func,
    onKeyDown: PropTypes.func,
    tabIndex: PropTypes.number,
    elementRef: PropTypes.func,
    editing: PropTypes.bool,
    highlighted: PropTypes.bool,
    coords: PropTypes.shape({
      i: PropTypes.number.isRequired,
      j: PropTypes.number.isRequired
    }).isRequired
  }

  static defaultProps = {
    value: null,
    label: null,
    facade: 'default',
    onClick: () => {},
    onKeyDown: () => {},
    tabIndex: -1,
    elementRef: () => {},
    editing: false,
    highlighted: false
  }

  shouldComponentUpdate (nextProps) {
    const {
      value,
      label,
      facade,
      highlighted,
      tabIndex,
      editing
    } = this.props

    return value !== nextProps.value ||
      label !== nextProps.label ||
      facade !== nextProps.facade ||
      highlighted !== nextProps.highlighted ||
      tabIndex !== nextProps.tabIndex ||
      editing !== nextProps.editing
  }

  get facade () {
    const { facade } = this.props

    if (facade === 'presentation') return PresentationFacadeStyles
    if (facade === 'remove') return RemoveFacadeStyles
    if (facade === 'edit') return EditFacadeStyles

    return DefaultFacadeStyles
  }

  _element = null

  handleClick = (event) => {
    const { onClick, value, coords } = this.props
    onClick(event, { coords, value })
  }

  handleKeyDown = (event) => {
    const { onKeyDown, value, coords } = this.props
    onKeyDown(event, { coords, value })
  }

  handleElementRef = (el) => {
    this.props.elementRef(el)
    this._element = el
  }

  render () {
    const {
      value,
      label,
      tabIndex,
      facade,
      editing,
      highlighted,
      ...props
    } = this.props

    const Facade = this.facade

    const facadeProps = {
      tabIndex,
      value,
      onKeyDown: this.handleKeyDown,
      onClick: this.handleClick,
      onFocus: this.handleFocus,
      onBlur: this.handleBlur,
      ref: this.handleElementRef,
      as: facade === 'presentation' ? 'span' : 'button',
      ...omitProps(props, Tile.propTypes)
    }

    let children = (
      <React.Fragment>
        {label}
        {highlighted && <HighlightStyles />}
      </React.Fragment>
    )

    if (facade === 'edit') {
      children = (
        <React.Fragment>
          <ScreenReaderContent>{label}</ScreenReaderContent>
          <PresentationContent>
            <EditLabelStyles editing={editing}>
              <IconEditLine size="small" />
            </EditLabelStyles>
          </PresentationContent>
        </React.Fragment>
      )
    }

    if (facade === 'remove') {
      children = (
        <React.Fragment>
          <ScreenReaderContent>{label}</ScreenReaderContent>
          <PresentationContent>
            <IconTrashSolid size="x-small" />
          </PresentationContent>
        </React.Fragment>
      )
    }

    return (
      <Facade {...facadeProps}>
        {children}
        <FocusRing />
      </Facade>
    )
  }
}

export default themeable(Tile, composeTheme)
