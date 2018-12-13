import { generateEmptyPuzzle } from '../util/generatePuzzle'
import setTile from '../util/setTile'
import resetPuzzle from '../util/resetPuzzle'

import {
  RECEIVED_PUZZLE,
  REQUEST_PUZZLE,
  RESET_PUZZLE,
  SET_TILE
} from '../constants/actionTypes'

export const defaultState = {
  puzzle: generateEmptyPuzzle(),
  requestingPuzzle: false,
  failedPuzzleRequest: null
}

export default function reducer (state = defaultState, action = { type: null }) {
  switch (action.type) {
    case REQUEST_PUZZLE: {
      return {
        ...defaultState,
        requestingPuzzle: true
      }
    }
    case RECEIVED_PUZZLE: {
      const { puzzle } = action.payload

      if (!action.error) {
        return {
          ...defaultState,
          puzzle
        }
      }

      return {
        ...defaultState,
        failedPuzzleRequest: action.payload
      }
    }
    case RESET_PUZZLE: {
      const { puzzle } = action.payload

      return {
        ...defaultState,
        puzzle: resetPuzzle(puzzle)
      }
    }
    case SET_TILE: {
      const { coords, value } = action.payload
      return {
        ...defaultState,
        puzzle: setTile(state.puzzle, coords, value)
      }
    }
    default: {
      return state
    }
  }
}
