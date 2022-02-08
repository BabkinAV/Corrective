import { STATUS_UPDATE_LOADING, SET_AUTHENTICATED, SET_SHOW_SNACKBAR } from "../types"

const initialState = {
  statusUpdateLoading: false,
  authenticated: false,
  showSnackbar: {
    show: false,
    severity: 'success'
  }
  
}

export const uiReducer = (state = initialState, action) => {
  switch (action.type) {
    case STATUS_UPDATE_LOADING: 
      return {...state, statusUpdateLoading: action.payload}
    case SET_AUTHENTICATED: 
      return {...state, authenticated: action.payload}
    case SET_SHOW_SNACKBAR: 
      return {...state, showSnackbar: {
        show: action.payload.show,
        severity: action.payload.severity
      } }

    default: return state
  }
}