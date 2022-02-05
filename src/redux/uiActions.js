import { STATUS_UPDATE_LOADING } from "./types";


export const setStatusUpdateLoading = (loading) => {
  return {
    type: STATUS_UPDATE_LOADING,
    payload: loading
  }
}