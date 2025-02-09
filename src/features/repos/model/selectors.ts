import {RootState} from "../../../store";
import {createSelector} from "@reduxjs/toolkit";

const selectReposState = (state: RootState) => state.repos;

export const selectReposIsLoading = createSelector(
    [selectReposState],
    (reposState) => reposState.isLoading
);

export const selectRepos = createSelector(
    [selectReposState],
    (reposState) => reposState.reposList
);

export const selectReposInformMessage = createSelector(
  [selectReposState],
  (reposState) => reposState.informMessage
);
