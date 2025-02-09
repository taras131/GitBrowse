import type { Components } from "@mui/material/styles";

import type { Theme } from "../types";
import { MuiButton } from "./button";
import { MuiCard } from "./card";
import { MuiCardContent } from "./card-content";
import { MuiCardHeader } from "./card-header";
import { MuiLink } from "./link";
import { MuiChip } from "./chip";

export const components = {
  MuiButton,
  MuiCard,
  MuiCardContent,
  MuiCardHeader,
  MuiLink,
  MuiChip,
} satisfies Components<Theme>;
