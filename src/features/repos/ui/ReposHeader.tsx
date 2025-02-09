import React, { FC, memo } from "react";
import { ToggleButton, ToggleButtonGroup, useMediaQuery } from "@mui/material";
import Typography from "@mui/material/Typography";
import { REPOS, SORT, TSort } from "../../../utils/consts";
import Box from "@mui/material/Box";

const STYLES = {
  box: {
    display: "flex",
    width: "100%",
    flexDirection: { xs: "column", sm: "row" },
    alignItems: "center",
    justifyContent: "space-between",
    gap: 4,
  },
};

interface IProps {
  sortRepos: TSort;
  handleSortChange: (e: React.MouseEvent<HTMLElement>, newSort: TSort) => void;
}

const ReposHeader: FC<IProps> = memo(({ sortRepos, handleSortChange }) => {
  const isTable = useMediaQuery("(max-width:800px)");
  return (
    <Box sx={STYLES.box}>
      <Typography variant="h2" fontSize="2rem">
        {REPOS.TITLE}
      </Typography>
      <ToggleButtonGroup
        value={sortRepos}
        exclusive
        onChange={handleSortChange}
        color="primary"
        size={isTable ? "small" : "medium"}
        aria-label="sort repos"
      >
        <ToggleButton value={SORT.DESC} aria-label="descending">
          {REPOS.SORT_BUTTON_DESK_TEXT}
        </ToggleButton>
        <ToggleButton value={SORT.ASK} aria-label="ascending">
          {REPOS.SORT_BUTTON_ASK_TEXT}
        </ToggleButton>
      </ToggleButtonGroup>
    </Box>
  );
});

export default ReposHeader;
