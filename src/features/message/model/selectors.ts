import {RootState} from "../../../store";
import {createSelector} from "@reduxjs/toolkit";

const selectMessageState = (state: RootState) => state.message;

// Мемоизированные селекторы
export const selectMessage = createSelector(
    selectMessageState,
    (messageState) => messageState.message
);

export const selectIsShowMessage = createSelector(
    selectMessageState,
    (messageState) => messageState.isShow
);