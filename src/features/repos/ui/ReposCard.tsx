import React, { FC, memo } from "react";
import { IGitHubRepository } from "../../../models/IRepos";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Chip, Stack, useMediaQuery, Link, Tooltip } from "@mui/material";
import UpdateIcon from "@mui/icons-material/Update";
import Box from "@mui/material/Box";
import GitHubIcon from "@mui/icons-material/GitHub";
import Rating from "@mui/material/Rating";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { formatDate } from "../../../utils/services";
import { REPOS } from "../../../utils/consts";

const CARD_STYLES = {
  description: {
    height: "80px",
    overflowY: "hidden",
  },
  typography: {
    color: "text.secondary",
    display: "-webkit-box",
    WebkitLineClamp: 3,
    WebkitBoxOrient: "vertical",
    overflow: "hidden",
  },
  link: {
    display: "flex",
    alignItems: "center",
    gap: 0.5,
    color: "primary.main",
    textDecoration: "none",
    "&:hover": {
      textDecoration: "underline",
    },
  },
  chipContainer: {
    width: "100%",
    marginTop: 3,
  },
} as const;

interface IProps {
  repo: IGitHubRepository;
}

const ReposCard: FC<IProps> = memo(({ repo }) => {
  const isMobile = useMediaQuery("(max-width:380px)");
  return (
    <Card>
      <CardHeader title={repo.name} />
      <CardContent>
        <Box sx={CARD_STYLES.description}>
          <Tooltip title={repo.description} placement="top">
            <Typography variant="body2" sx={CARD_STYLES.typography}>
              {repo.description || REPOS.NOT_DESCRIPTION_TEXT}
            </Typography>
          </Tooltip>
        </Box>
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Link href={repo.html_url} target="_blank" rel="noopener noreferrer" sx={CARD_STYLES.link}>
            {REPOS.LINK_TEXT}
            <GitHubIcon sx={{ fontSize: "1.5rem" }} />
          </Link>
          <Rating name="read-only" value={repo.stargazers_count} readOnly />
        </Stack>
        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={CARD_STYLES.chipContainer}>
          <Chip
            icon={<AccessTimeIcon />}
            label={formatDate(repo.created_at)}
            color="secondary"
            size={isMobile ? "small" : "medium"}
          />
          <Chip
            icon={<UpdateIcon />}
            label={formatDate(repo.updated_at)}
            color="primary"
            size={isMobile ? "small" : "medium"}
          />
        </Stack>
      </CardContent>
    </Card>
  );
});

export default ReposCard;
