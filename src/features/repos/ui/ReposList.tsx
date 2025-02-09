import React, { FC, memo, useCallback, useRef } from "react";
import { useAppSelector } from "../../../hooks/redux";
import {selectReposIsLoading } from "../model/selectors";
import ReposCard from "./ReposCard";
import Box from "@mui/material/Box";
import { IGitHubRepository } from "../../../models/IRepos";

const STYLES = {
  box: {
    width: "100%",
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: "24px",
    justifyItems: "center",
    "& > *": {
      minWidth: "280px",
      width: "100%",
      maxWidth: "420px",
    },
  },
};

interface IProps {
  repos: IGitHubRepository[];
  onLoadMore: () => void;
  hasMore: boolean;
}

const ReposList: FC<IProps> = memo(({ repos, onLoadMore, hasMore }) => {
  const isLoading = useAppSelector(selectReposIsLoading);
  const observer = useRef<IntersectionObserver | null>(null);
  const lastRepoElementRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (isLoading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          onLoadMore();
        }
      });

      if (node) observer.current.observe(node);
    },
    [isLoading, hasMore, onLoadMore],
  );
  const reposList = repos.map((repo, index) => (
    <div ref={index === repos.length - 1 ? lastRepoElementRef : null} key={repo.id}>
      <ReposCard key={repo.id} repo={repo} />
    </div>
  ));
  if (reposList.length === 0) return null;
  return (
    <Box sx={STYLES.box}>
      {reposList}
    </Box>
  );
});

export default ReposList;
