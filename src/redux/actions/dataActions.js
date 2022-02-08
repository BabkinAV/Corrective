import { SET_SELECTED } from "../types";
import {SET_ROWS} from '../types'
import { UPDATE_ROWS_STATUS } from "../types";

export const setSelected = (selected) => {
  return {
    type: SET_SELECTED,
    payload: selected
  }
}

export const setRows = (rows) => {
  
  return {
    type: SET_ROWS,
    payload: rows
  }
}

export const updateRowsStatus = (status) => {
  return {
    type: UPDATE_ROWS_STATUS,
    payload: status
  }
}