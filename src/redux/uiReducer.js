import { STATUS_UPDATE_LOADING } from "./types"

const initialState = {
  loading: false
}

export const uiReducer = (state = initialState, action) => {
  switch (action.type) {
    case STATUS_UPDATE_LOADING: 
      return {...state, loading: action.payload}
    default: return state
  }
}