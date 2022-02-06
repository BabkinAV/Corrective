import { STATUS_UPDATE_LOADING, SET_AUTHENTICATED } from "../types"

const initialState = {
  statusUpdateLoading: false,
  authenticated: false,
  
}

export const uiReducer = (state = initialState, action) => {
  switch (action.type) {
    case STATUS_UPDATE_LOADING: 
      return {...state, statusUpdateLoading: action.payload}
    case SET_AUTHENTICATED: 
      return {...state, authenticated: action.payload}

    default: return state
  }
}