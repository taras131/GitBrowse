import React, { useEffect, useState, useRef } from "react";
import { selectRepos, selectReposInformMessage, selectReposIsLoading } from "../model/selectors";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import { fetchGitHubRepos } from "../model/actions";
import ReposList from "./ReposList";
import Preloader from "../../../components/common/Preloader";
import ReposHeader from "./ReposHeader";
import ReposSearch from "./ReposSearch";
import { Stack } from "@mui/material";
import { resetReposList, setReposInformMessage, setReposLoading } from "../model/slice";
import { INFORM_MESSAGE, REPOS, SORT, START_SEARCH_HISTORY, TSort } from "../../../utils/consts";
import ReposEmpty from "./ReposEmpty";
import { isValidGithubUsername } from "../../../utils/services";
import { MESSAGE_SEVERITY, setMessage } from "../../message/model/slice";

const Repos = () => {
  const dispatch = useAppDispatch();
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortRepos, setSortRepos] = useState(SORT.DESC);
  const [searchHistory, setSearchHistory] = useState<string[]>(START_SEARCH_HISTORY);
  const isLoading = useAppSelector(selectReposIsLoading);
  const repos = useAppSelector(selectRepos);
  const message = useAppSelector(selectReposInformMessage);
  const handleSearch = async (newSort = sortRepos) => {
    if (searchQuery.length > 2) {
      const trimmedQuery = searchQuery.trim();
      if (!isValidGithubUsername(trimmedQuery)) {
        dispatch(setReposInformMessage(INFORM_MESSAGE.INVALID_USERNAME));
        dispatch(setMessage({ severity: MESSAGE_SEVERITY.error, text: INFORM_MESSAGE.INVALID_USERNAME }));
        dispatch(setReposLoading(false));
        return;
      }
      const result = await dispatch(
        fetchGitHubRepos({
          query: trimmedQuery,
          page: 1,
          perPage: REPOS.ITEMS_PER_PAGE,
          direction: newSort,
        }),
      );
      if (result.payload && Array.isArray(result.payload)) {
        setHasMore(result.payload.length === REPOS.ITEMS_PER_PAGE);
      }
    }
  };
  useEffect(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      if (searchQuery.length > 2) {
        setSearchHistory((prev) => {
          const filteredHistory = prev.filter((item) => item !== searchQuery);
          return [searchQuery, ...filteredHistory];
        });
        void handleSearch();
      }
    }, 2000);
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [searchQuery]);
  const handleRestartSearch = (value: string) => {
    setPage(1);
    setHasMore(true);
    dispatch(setReposInformMessage(INFORM_MESSAGE.START));
    dispatch(setReposLoading(value.length > 2));
    dispatch(resetReposList());
  };
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    handleRestartSearch(value);
    setSearchQuery(value);
  };
  const handleHistoryItemClick = (value: string) => {
    if(value !== searchQuery) {
      setSearchQuery(value);
      handleRestartSearch(value);
    }
  };
  const handleSortChange = (e: React.MouseEvent<HTMLElement>, newSort: TSort) => {
    setSortRepos(newSort);
    void handleSearch(newSort);
  };
  const handleLoadMore = async () => {
    if (!isLoading && hasMore) {
      const nextPage = page + 1;
      const result = await dispatch(
        fetchGitHubRepos({
          query: searchQuery,
          page: nextPage,
          perPage: REPOS.ITEMS_PER_PAGE,
          direction: sortRepos,
        }),
      );
      if (result.payload && Array.isArray(result.payload)) {
        setHasMore(result.payload.length === REPOS.ITEMS_PER_PAGE);
        setPage(nextPage);
      }
    }
  };
  return (
    <Stack spacing={3}>
      <ReposHeader sortRepos={sortRepos} handleSortChange={handleSortChange} />
      <ReposSearch
        handleInputChange={handleInputChange}
        message={message}
        searchQuery={searchQuery}
        searchHistory={searchHistory}
        handleHistoryItemClick={handleHistoryItemClick}
      />
      <ReposList repos={repos} onLoadMore={handleLoadMore} hasMore={hasMore} />
      {isLoading && <Preloader />}
      {!isLoading && repos.length === 0 && message === INFORM_MESSAGE.USER_FOUND && <ReposEmpty />}
    </Stack>
  );
};

export default Repos;
