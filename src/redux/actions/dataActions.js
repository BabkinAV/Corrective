import { SET_SELECTED } from '../types';
import { SET_ROWS } from '../types';
import {
  UPDATE_ROWS_STATUS,
  SET_UNIT_NO,
  SET_USERNAME,
  SET_FOUNDUNIT,
} from '../types';
import axios from 'axios';

import { setStatusUpdateLoading, setShowSnackBar, setIsLoading } from './uiActions';

export const setSelected = (selected) => {
  return {
    type: SET_SELECTED,
    payload: selected,
  };
};

export const handleSelectAllClick = (event) => (dispatch, getState) => {
  const { data } = getState();
  const rows = data.rows;
  if (event.target.checked) {
    const newSelecteds = rows.map((n) => n.docId);
    dispatch(setSelected(newSelecteds));
    return;
  }
  dispatch(setSelected([]));
}

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

export const setUsername = (username) => {
  return {
    type: SET_USERNAME,
    payload: username,
  };
};

export const setFoundUnit = (foundUnit) => {
  return {
    type: SET_FOUNDUNIT,
    payload: foundUnit,
  };
};

export const saveStatus = (selected, status, unitNo) => (dispatch) => {
  if (selected.length > 0) {
    let arrayToSaveDb = selected.map((el) => ({
      docId: el,
      status: status,
    }));

    dispatch(setStatusUpdateLoading(true));
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

export const fetchInstructionsHandler =
  (firstLoad, unitNoInputRef) => (dispatch) => {
    
    !firstLoad && dispatch(setIsLoading(true));

    // let unitNo = 'B7NZ1111'
    let inputNoObtained = firstLoad
      ? 'B7NZ1111'
      : unitNoInputRef.value.toUpperCase();

    dispatch(setUnitNo(inputNoObtained));
    axios
      .get(
        `${process.env.REACT_APP_BASE_URL}/unit/${inputNoObtained}`
      )
      .then((response) => {
        const myData = response.data;
        if (myData.unit.instructions.length > 0) {
          dispatch(setRows(myData.unit.instructions));
          dispatch(setFoundUnit(true));
        } else {
          dispatch(setFoundUnit(false));
        }
      })
      .catch((error) => {
        // handle error
        console.log(error);
      })
      .then(() => {
        dispatch(setIsLoading(false));
      });
  };

  export const fetchUserName = (authenticated, api_key) => (dispatch) => {
    if (authenticated) {
      const idToken = localStorage.FBIdToken.split('bearer ')[1];
      axios
        .post(
          `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${api_key}`,
          {
            idToken,
          }
        )
        .then((response) => {
          dispatch(setUsername(response.data.users[0].displayName));
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }
