import { IGitHubRepository } from "../../../models/IRepos";
import { TSort } from "../../../utils/consts";

interface IReposAPI {
  getReposByName: (
    name: string,
    page?: number,
    perPage?: number,
    direction?: TSort,
  ) => Promise<IGitHubRepository[]>;
}

const USERS_PATH = `${process.env.REACT_APP_API_URL}/users`;
const REPOS_PATH = "/repos";

export const reposAPI: IReposAPI = {
  getReposByName: async (name: string, page = 1, perPage = 20, direction = "desc") => {
    const res = await fetch(
      `${USERS_PATH}/${name}${REPOS_PATH}?page=${page}&per_page=${perPage}&sort=updated&direction=${direction}`,
    );
    if (!res.ok) {
      const data = await res.json();
      throw new Error(data.message);
    }
    return await res.json();
  },
};
