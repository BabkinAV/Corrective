import {
  SET_SELECTED,
  SET_ROWS,
  UPDATE_ROWS_STATUS,
  SET_UNIT_NO
} from '../types';

const initialState = {
  selected: [],
  rows: [],
  unitNo: ''
};

export const dataReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SELECTED:
      return { ...state, selected: action.payload };
    case SET_ROWS: {
      return { ...state, rows: action.payload };
    }

    case UPDATE_ROWS_STATUS: {
      return {
        ...state,
        rows: state.rows.map((el) => {
          if (state.selected.indexOf(el.docId) !== -1) {
            el.status = action.payload;
          }
          return el;
        }),
      };
    }

    case SET_UNIT_NO: {
      return {
        ...state, unitNo: action.payload
      }
    }

    default:
      return state;
  }
};
