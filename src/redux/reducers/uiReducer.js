import { STATUS_UPDATE_LOADING, SET_AUTHENTICATED, SET_SHOW_SNACKBAR, SET_IS_LOADING, SET_MODAL_OPEN } from "../types"

const initialState = {
  statusUpdateLoading: false,
  authenticated: false,
  showSnackbar: {
    show: false,
    severity: 'success'
  },
  isLoading: false,
  isModalOpen: false,
  
}

export const uiReducer = (state = initialState, action) => {
  switch (action.type) {
    case STATUS_UPDATE_LOADING: 
      return {...state, statusUpdateLoading: action.payload}
    case SET_AUTHENTICATED: 
      return {...state, authenticated: action.payload}
    case SET_IS_LOADING: 
      return {...state, isLoading: action.payload}
    case SET_SHOW_SNACKBAR: 
      return {...state, showSnackbar: {
        show: action.payload.show,
        severity: action.payload.severity
      } }
    case SET_MODAL_OPEN: 
      return {...state, isModalOpen: action.payload}

    default: return state
  }
}