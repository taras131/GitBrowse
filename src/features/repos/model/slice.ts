import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IGitHubRepository, TInformMessage } from "../../../models/IRepos";
import { fetchGitHubRepos } from "./actions";
import { INFORM_MESSAGE } from "../../../utils/consts";

export interface IReposState {
  informMessage: TInformMessage;
  isLoading: boolean;
  reposList: IGitHubRepository[];
}

const initialState: IReposState = {
  informMessage: INFORM_MESSAGE.START,
  isLoading: false,
  reposList: [],
};

const handlePending = (state: IReposState) => {
  state.isLoading = true;
};

const handleRejected = (state: IReposState, action: PayloadAction<TInformMessage>) => {
  state.isLoading = false;
  state.informMessage = action.payload;
};

export const ReposSlice = createSlice({
  name: "repos",
  initialState,
  reducers: {
    setReposLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    resetReposList: (state) => {
      state.reposList = [];
    },
    setReposInformMessage: (state, action: PayloadAction<TInformMessage>) => {
      state.informMessage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchGitHubRepos.fulfilled, (state, action) => {
        state.isLoading = false;
        if (action.meta.arg.page === 1) {
          state.reposList = action.payload;
          state.informMessage = INFORM_MESSAGE.USER_FOUND;
        } else {
          state.reposList = [...state.reposList, ...action.payload];
        }
      })
      .addMatcher((action) => action.type.endsWith("/pending"), handlePending)
      .addMatcher((action) => action.type.endsWith("/rejected"), handleRejected);
  },
});

export const { setReposLoading, resetReposList, setReposInformMessage } = ReposSlice.actions;
export default ReposSlice.reducer;
