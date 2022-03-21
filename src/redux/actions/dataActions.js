import { SET_SELECTED } from '../types';
import { SET_ROWS } from '../types';
import { UPDATE_ROWS_STATUS, SET_UNIT_NO } from '../types';
import axios from 'axios';

import { setStatusUpdateLoading, setShowSnackBar } from './uiActions';

export const setSelected = (selected) => {
  return {
    type: SET_SELECTED,
    payload: selected,
  };
};

export const setRows = (rows) => {
  return {
    type: SET_ROWS,
    payload: rows,
  };
};

export const updateRowsStatus = (status) => {
  return {
    type: UPDATE_ROWS_STATUS,
    payload: status,
  };
};

export const setUnitNo = (unitNo) => {
  return {
    type: SET_UNIT_NO,
    payload: unitNo,
  };
};

export const saveStatus = (selected, status, unitNo) => (dispatch) => {
  if (selected.length > 0) {
    let arrayToSaveDb = selected.map((el) => ({
      docId: el,
      status: status,
    }));

    setStatusUpdateLoading(true);
    axios
      .patch(
        `https://europe-west1-corrective-afe97.cloudfunctions.net/api/updateunit/${unitNo}`,
        arrayToSaveDb
      )
      .then((response) => {
        dispatch(updateRowsStatus(status));
        dispatch(setSelected([]));
        dispatch(setStatusUpdateLoading(false));
        dispatch(setShowSnackBar({ show: true, severity: 'success' }));
      })
      .catch((error) => {
        // handle error
        dispatch(setStatusUpdateLoading(false));
        dispatch(setShowSnackBar({ show: true, severity: 'error' }));
        dispatch(setSelected([]));
        console.log(error);
      });
  }
};

export const handleClick = (event, id) => (dispatch, getState) => {
  const { data } = getState();
  const selected = data.selected;
  const selectedIndex = selected.indexOf(id);
  let newSelected = [];

  if (selectedIndex === -1) {
    newSelected = newSelected.concat(selected, id);
  } else if (selectedIndex === 0) {
    newSelected = newSelected.concat(selected.slice(1));
  } else if (selectedIndex === selected.length - 1) {
    newSelected = newSelected.concat(selected.slice(0, -1));
  } else if (selectedIndex > 0) {
    newSelected = newSelected.concat(
      selected.slice(0, selectedIndex),
      selected.slice(selectedIndex + 1)
    );
  }

  dispatch(setSelected(newSelected));
};
