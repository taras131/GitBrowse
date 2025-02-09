import React, { memo } from "react";
import Typography from "@mui/material/Typography";
import { Warning as WarningIcon } from "@mui/icons-material";
import Card from "@mui/material/Card";
import { REPOS } from "../../../utils/consts";

const CARD_STYLES = {
  card: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    height: "100%",
    p: 4,
    gap: 2,
  },
  warning_icon: {
    fontSize: 40,
    color: "warning.main",
    mb: 1,
  },
  subtitle_1: {
    fontWeight: "bold",
  },
};

const ReposEmpty = memo(() => {
  return (
    <Card sx={CARD_STYLES.card}>
      <WarningIcon data-testid="WarningIcon" sx={CARD_STYLES.warning_icon} />
      <Typography variant="subtitle1" sx={CARD_STYLES.subtitle_1} textAlign="center">
        {REPOS.EMPTY_TITLE}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {REPOS.EMPTY_TEXT}
      </Typography>
    </Card>
  );
});

export default ReposEmpty;
