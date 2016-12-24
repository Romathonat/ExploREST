// import undoable, { distinctState } from 'redux-undo'
import conf from '../../conf.js';

const app = (state = conf.initialState, action) => {
    switch (action.type) {
        case 'SET_CURRENT_QUERY_PATH':
            return {
                ...state,
                currentPath: action.currentPath
            }
        case 'SET_CURRENT_JSON':
            return {
                ...state,
                currentJson: action.currentJson
            }
        case 'SET_EDITABLE':
            return {
                ...state,
                codeRights: 'write'
            }
        case 'SET_READABLE':
            return {
                ...state,
                codeRights: 'read'
            }
        case 'SET_ERROR_MESSAGE':
            return {
                ...state,
                errorMessage: {
                  simple: action.simple,
                  detailed: action.detailed
                }
            }
        case 'SET_OK_MESSAGE':
            return {
                ...state,
                okMessage: action.message
            }
        case 'SET_CURRENT_URL_SERVER':
            return {
                ...state,
                currentURLServer: action.currentURLServer
            }
        case 'SET_CURRENT_SCHEMES':
            return {
                ...state,
                currentSchemes: action.currentSchemes
            }
        default:
            return state
    }
}

//we implement the ability to have undo/redo. Works better than redux-undo ...
function undoable(reducer) {
  // Call the reducer with empty action to populate the initial state
  const initialState = {
    past: [],
    present: reducer(undefined, {}),
    future: []
  }

  // Return a reducer that handles undo and redo
  return function (state = initialState, action) {
    const { past, present, future } = state

    switch (action.type) {
      case 'UNDO':
        const previous = past[past.length - 1]
        const newPast = past.slice(0, past.length - 1)
        return {
          past: newPast,
          present: previous,
          future: [ present, ...future ]
        }
      case 'REDO':
        const next = future[0]
        const newFuture = future.slice(1)
        return {
          past: [ ...past, present ],
          present: next,
          future: newFuture
        }
      default:
        // Delegate handling the action to the passed reducer
        const newPresent = reducer(present, action)
        if (present === newPresent) {
          return state
        }
        return {
          past: [ ...past, present ],
          present: newPresent,
          future: []
        }
    }
  }
}

const undoableApp = undoable(app)

export default undoableApp
