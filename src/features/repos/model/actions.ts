import { createAsyncThunk } from "@reduxjs/toolkit";
import { reposAPI } from "../api";
import { AppDispatch } from "../../../store";
import { IGitHubRepository, TInformMessage } from "../../../models/IRepos";
import { MESSAGE_SEVERITY, setMessage } from "../../message/model/slice";
import { INFORM_MESSAGE, TSort } from "../../../utils/consts";

type ThunkConfig = {
  dispatch: AppDispatch;
  rejectValue: string;
};

interface FetchReposParams {
  query: string;
  page: number;
  perPage: number;
  direction: TSort
}

export const fetchGitHubRepos = createAsyncThunk<IGitHubRepository[], FetchReposParams, ThunkConfig>(
  "repos/fetchGitHubRepos",
  async ({ query, page, perPage, direction }, { dispatch, rejectWithValue }) => {
    try {
      const res = await reposAPI.getReposByName(query, page, perPage, direction);
      if (page === 1) {
        dispatch(setMessage({ severity: MESSAGE_SEVERITY.success, text: INFORM_MESSAGE.USER_FOUND }));
      }
      return res;
    } catch (e) {
      let errorMessage: TInformMessage = INFORM_MESSAGE.ERROR;
      if (e instanceof Error && e.message === "Not Found") {
        errorMessage = INFORM_MESSAGE.USER_NOT_FOUND;
      }
      dispatch(setMessage({ severity: MESSAGE_SEVERITY.error, text: errorMessage }));
      return rejectWithValue(errorMessage);
    }
  },
);
