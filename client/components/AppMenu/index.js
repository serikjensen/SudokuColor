import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import IconHamburger from '@instructure/ui-icons/lib/Line/IconHamburger'
import IconX from '@instructure/ui-icons/lib/Line/IconX'

import Tray from '../util/Tray'

import Button from '../Button'
import IconButton from '../IconButton'

import { requestPuzzle, resetPuzzle } from '../../actions/puzzleActions'

class AppMenu extends Component {
  static propTypes = {
    requestPuzzle: PropTypes.func,
    onRequestPuzzle: PropTypes.func,
    resetPuzzle: PropTypes.func,
    onResetPuzzle: PropTypes.func,
    submittedPuzzle: PropTypes.bool,
    filledPuzzle: PropTypes.bool
  }

  static defaultProps = {
    requestPuzzle: () => {},
    onRequestPuzzle: () => {},
    resetPuzzle: () => {},
    onResetPuzzle: () => {},
    submittedPuzzle: false,
    filledPuzzle: false
  }

  state = {
    open: false
  }

  componentWillReceiveProps (nextProps) {
    if (this.props.submittedPuzzle && !nextProps.submittedPuzzle && !nextProps.filledPuzzle) {
      this._trigger.focus()
    }
  }

  setTrayStatus (open) {
    this.setState({ open })
  }

  _trigger = null

  handleMenuTriggerClick = () => {
    this.setTrayStatus(true)
  }

  handleTrayCloseClick = () => {
    this.setTrayStatus(false)
  }

  handleNewPuzzle = () => {
    this.props.requestPuzzle()
    this.props.onRequestPuzzle()
    this.setTrayStatus(false)
  }

  handleResetPuzzle = () => {
    this.props.resetPuzzle()
    this.props.onResetPuzzle()
    this.setTrayStatus(false)
  }

  handleTriggerRef = el => {
    this._trigger = el
  }

  render () {
    return (
      <div>
        <IconButton
          ref={this.handleTriggerRef}
          onClick={this.handleMenuTriggerClick}
          label="Open menu"
          color="neutral"
          icon={() => <IconHamburger />}
        />
        <Tray
          label="Menu"
          open={this.state.open}
          placement="end"
        >
          <div>
            <IconButton
              onClick={this.handleTrayCloseClick}
              label="Close menu"
              color="neutral"
              icon={() => <IconX />}
            />
            <h2>Sudoku Color</h2>
            <Button
              color="primary"
              display="block"
              onClick={this.handleResetPuzzle}
              margin="0.5rem 0 0 0"
            >
              Reset
            </Button>
            <Button
              color="secondary"
              display="block"
              onClick={this.handleNewPuzzle}
              margin="0.5rem 0 0 0"
            >
                New Puzzle
            </Button>
          </div>
        </Tray>
      </div>
    )
  }
}

const mapStateToProps = state => state.puzzle

export default connect(mapStateToProps, { requestPuzzle, resetPuzzle })(AppMenu)
