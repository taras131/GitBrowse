import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import ReposReducer from "features/repos/model/slice";
import MessageReducer from "features/message/model/slice";

export const rootReducer = combineReducers({
  repos: ReposReducer,
  message: MessageReducer,

});
export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
  });
};
export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];
