import { SET_SELECTED } from "../types"

const initialState = {
  selected: [],
}



export const dataReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SELECTED: 
      return {...state, selected: action.payload}

    default: return state
  }
}