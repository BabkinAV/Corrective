import { combineReducers } from "redux";
import { uiReducer } from "./reducers/uiReducer";
import { dataReducer } from "./reducers/dataReducer";

export const rootReducer = combineReducers({
  ui: uiReducer,
  data: dataReducer
})