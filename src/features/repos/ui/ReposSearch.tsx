import React, { FC } from "react";
import Card from "@mui/material/Card";
import { Chip, OutlinedInput, Stack } from "@mui/material";
import Typography from "@mui/material/Typography";
import { REPOS } from "../../../utils/consts";
import { TInformMessage } from "../../../models/IRepos";

const STYLES = {
  card: {
    p: 2,
    display: "flex",
    flexDirection: { xs: "column", sm: "row" },
    alignItems: "center",
    gap: 2,
  },
  typography: {
    flex: 1,
    textAlign: { xs: "center", sm: "left" },
  },
  stack: {
    flexWrap: "wrap",
    rowGap: 1,
  },
};

interface IProps {
  message: TInformMessage;
  searchHistory: string[];
  searchQuery: string;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleHistoryItemClick: (value: string) => void;
}

const ReposSearch: FC<IProps> = ({
  message,
  handleInputChange,
  searchHistory,
  handleHistoryItemClick,
  searchQuery,
}) => {
  const searchHistoryList = searchHistory
    .slice(0, 6)
    .map((item, index) => (
      <Chip
        color="info"
        key={`${item}_${index}`}
        label={item}
        sx={{ cursor: "pointer" }}
        onClick={() => handleHistoryItemClick(item)}
        size="small"
      />
    ));
  return (
    <Stack>
      <Card sx={STYLES.card}>
        <OutlinedInput
          fullWidth
          placeholder={REPOS.SEARCH_PLACEHOLDER}
          onChange={handleInputChange}
          value={searchQuery}
          sx={{ flex: 1 }}
        />
        <Typography variant="subtitle1" sx={STYLES.typography}>
          {message}
        </Typography>
      </Card>
      <Stack direction="row" spacing={2} p={1} sx={STYLES.stack}>
        <Typography variant="subtitle2">История:</Typography>
        {searchHistoryList}
      </Stack>
    </Stack>
  );
};

export default ReposSearch;
