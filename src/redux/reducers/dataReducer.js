import {
  SET_SELECTED,
  SET_ROWS,
  UPDATE_ROWS_STATUS,
  SET_UNIT_NO,
  SET_USERNAME,
  SET_FOUNDUNIT,
} from '../types';

const initialState = {
  selected: [],
  rows: [],
  unitNo: '',
  username: '',
  foundUnit: true,
};

export const dataReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SELECTED:
      return { ...state, selected: action.payload };

    case SET_ROWS: {
      // TODO: implement map function over obtained payload

      return {
        ...state,
        rows: action.payload.map(el => {
          return {
						docId: el._id,
						number: el.instruction.instNumber,
            title: el.instruction.title,
						type: el.instruction.instType,
						subsystem: el.instruction.subsystem,
						publishedAt: el.instruction.releaseDate,
						status: el.status,
						link: `${process.env.REACT_APP_BASE_URL}/static/${el.instruction.link}`
          };
        }),
      };
    }

    case UPDATE_ROWS_STATUS: {
      return {
        ...state,
        rows: state.rows.map(el => {
          if (state.selected.indexOf(el.docId) !== -1) {
            el.status = action.payload;
          }
          return el;
        }),
      };
    }

    case SET_UNIT_NO: {
      return {
        ...state,
        unitNo: action.payload,
      };
    }

    case SET_USERNAME: {
      return {
        ...state,
        username: action.payload,
      };
    }

    case SET_FOUNDUNIT: {
      return {
        ...state,
        foundUnit: action.payload,
      };
    }

    default:
      return state;
  }
};
