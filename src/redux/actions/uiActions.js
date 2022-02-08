import { STATUS_UPDATE_LOADING } from "../types";
import { SET_AUTHENTICATED } from "../types";
import { SET_SHOW_SNACKBAR } from "../types";


export const setStatusUpdateLoading = (isLoading) => {
  return {
    type: STATUS_UPDATE_LOADING,
    payload: isLoading
  }
}

export const setAuthenticated = (isAuthenticated) => {
  return {
    type: SET_AUTHENTICATED,
    payload: isAuthenticated
  }
}

export const setShowSnackBar = ({show, severity}) => {
  return {
    type: SET_SHOW_SNACKBAR,
    payload: {
      show,
      severity
    }
  }
}