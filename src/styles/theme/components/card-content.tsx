import type { Components } from "@mui/material/styles";

import type { Theme } from "../types";

export const MuiCardContent = {
  styleOverrides: {
    root: {
      padding: "24px 24px",
      "&:last-child": { paddingBottom: "32px" },
    },
  },
} satisfies Components<Theme>["MuiCardContent"];
