import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import ReposEmpty from "./ReposEmpty";
import { REPOS } from "../../../utils/consts";

describe("ReposEmpty Component", () => {
  beforeEach(() => {
    render(<ReposEmpty />);
  });

  test("renders warning icon", () => {
    const warningIcon = screen.getByTestId("WarningIcon");
    expect(warningIcon).toBeInTheDocument();
  });

  test("renders main message about no repositories", () => {
    const mainMessage = screen.getByText(REPOS.EMPTY_TITLE);
    expect(mainMessage).toBeInTheDocument();
    expect(mainMessage.tagName).toBe("H6");
    expect(mainMessage).toHaveClass("MuiTypography-subtitle1");
  });

  test("renders secondary message with suggestions", () => {
    const secondaryMessage = screen.getByText(
      REPOS.EMPTY_TEXT
    );
    expect(secondaryMessage).toBeInTheDocument();
    expect(secondaryMessage).toHaveClass("MuiTypography-body2");
  });

  test("card has correct styles", () => {
    const card = screen.getByText(REPOS.EMPTY_TEXT).closest(".MuiCard-root");
    expect(card).toBeInTheDocument();
    expect(card).toHaveClass("MuiCard-root");
    expect(card).toHaveStyle({
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    });
  });
  test("matches snapshot", () => {
    const { container } = render(<ReposEmpty />);
    expect(container).toMatchSnapshot();
  });
});