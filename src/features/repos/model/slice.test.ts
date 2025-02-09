import reposReducer, {
  setReposLoading,
  resetReposList,
  setReposInformMessage,
  IReposState,
} from "./slice";
import { fetchGitHubRepos } from "./actions";
import { IGitHubRepository } from "../../../models/IRepos";
import { INFORM_MESSAGE } from "../../../utils/consts";

describe("repos slice", () => {
  let initialState: IReposState;
  beforeEach(() => {
    initialState = {
      informMessage: INFORM_MESSAGE.START,
      isLoading: false,
      reposList: [],
    };
  });
  it("should return initial state", () => {
    expect(reposReducer(undefined, { type: "unknown" })).toEqual(initialState);
  });
  describe("sync actions", () => {
    it("should handle setReposLoading", () => {
      const actual = reposReducer(initialState, setReposLoading(true));
      expect(actual.isLoading).toBe(true);
    });
    it("should handle resetReposList", () => {
      const stateWithRepos = {
        ...initialState,
        reposList: [{ id: 1, name: "test-repo" } as IGitHubRepository],
      };
      const actual = reposReducer(stateWithRepos, resetReposList());
      expect(actual.reposList).toEqual([]);
    });
    it("should handle setReposInformMessage", () => {
      const actual = reposReducer(
        initialState,
        setReposInformMessage(INFORM_MESSAGE.USER_FOUND)
      );
      expect(actual.informMessage).toBe(INFORM_MESSAGE.USER_FOUND);
    });
  });
  describe("async actions", () => {
    const mockRepos = [
      { id: 1, name: "repo1" },
      { id: 2, name: "repo2" },
    ] as IGitHubRepository[];
    it("should handle fetchGitHubRepos.pending", () => {
      const action = { type: fetchGitHubRepos.pending.type };
      const actual = reposReducer(initialState, action);
      expect(actual.isLoading).toBe(true);
    });
    it("should handle fetchGitHubRepos.fulfilled for first page", () => {
      const action = {
        type: fetchGitHubRepos.fulfilled.type,
        payload: mockRepos,
        meta: { arg: { page: 1 } },
      };
      const actual = reposReducer(initialState, action);
      expect(actual.isLoading).toBe(false);
      expect(actual.reposList).toEqual(mockRepos);
      expect(actual.informMessage).toBe(INFORM_MESSAGE.USER_FOUND);
    });
    it("should handle fetchGitHubRepos.fulfilled for subsequent pages", () => {
      const stateWithExistingRepos = {
        ...initialState,
        reposList: [{ id: 0, name: "existing-repo" }] as IGitHubRepository[],
      };
      const action = {
        type: fetchGitHubRepos.fulfilled.type,
        payload: mockRepos,
        meta: { arg: { page: 2 } },
      };
      const actual = reposReducer(stateWithExistingRepos, action);
      expect(actual.isLoading).toBe(false);
      expect(actual.reposList).toHaveLength(3); // 1 existing + 2 new
      expect(actual.reposList[0]).toEqual({ id: 0, name: "existing-repo" });
    });
    it("should handle fetchGitHubRepos.rejected", () => {
      const action = {
        type: fetchGitHubRepos.rejected.type,
        payload: INFORM_MESSAGE.ERROR,
      };
      const actual = reposReducer(initialState, action);

      expect(actual.isLoading).toBe(false);
      expect(actual.informMessage).toBe(INFORM_MESSAGE.ERROR);
    });
  });
  describe("combined actions", () => {
    it("should handle sequence of actions", () => {
      let state = reposReducer(initialState, setReposLoading(true));
      expect(state.isLoading).toBe(true);
      state = reposReducer(state, setReposInformMessage(INFORM_MESSAGE.USER_FOUND));
      expect(state.informMessage).toBe(INFORM_MESSAGE.USER_FOUND);
      state = reposReducer(state, resetReposList());
      expect(state.reposList).toEqual([]);
    });
  });
});
