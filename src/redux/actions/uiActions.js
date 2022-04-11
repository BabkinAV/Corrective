import { STATUS_UPDATE_LOADING } from '../types';
import { SET_IS_LOADING } from '../types';
import { SET_AUTHENTICATED } from '../types';
import { SET_SHOW_SNACKBAR } from '../types';
import { SET_MODAL_OPEN } from '../types';

export const setStatusUpdateLoading = (isStatusUpdateLoading) => {
  return {
    type: STATUS_UPDATE_LOADING,
    payload: isStatusUpdateLoading,
  };
};

export const setIsLoading = (isLoading) => {
  return {
    type: SET_IS_LOADING,
    payload: isLoading,
  };
};

export const setAuthenticated = (isAuthenticated) => {
  return {
    type: SET_AUTHENTICATED,
    payload: isAuthenticated,
  };
};

export const setShowSnackBar = ({ show, severity }) => {
  return {
    type: SET_SHOW_SNACKBAR,
    payload: {
      show,
      severity,
    },
  };
};

export const setModalOpen = (isModalOpen) => {
  return {
    type: SET_MODAL_OPEN,
    payload: isModalOpen,
  }
}
