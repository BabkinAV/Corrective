import { STATUS_UPDATE_LOADING } from "../types";
import { SET_AUTHENTICATED } from "../types";


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