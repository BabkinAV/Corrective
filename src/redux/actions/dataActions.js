import { SET_SELECTED } from "../types";

export const setSelected = (selected) => {
  return {
    type: SET_SELECTED,
    payload: selected
  }
}