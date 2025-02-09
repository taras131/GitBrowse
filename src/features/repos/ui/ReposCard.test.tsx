import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import ReposCard from "./ReposCard";
import { IGitHubRepository } from "../../../models/IRepos";
import { REPOS } from "../../../utils/consts";

jest.mock("@mui/material/useMediaQuery", () => ({
  __esModule: true,
  default: jest.fn().mockReturnValue(false),
}));

const mockRepo: IGitHubRepository = {
  id: 1,
  name: "Test Repo",
  description: "This is a test repo",
  html_url: "https://github.com/test/repo",
  stargazers_count: 123,
  created_at: "2022-01-01T12:00:00Z",
  updated_at: "2023-01-01T12:00:00Z",
  forks_count: 0,
  watchers_count: 1,
};

describe("ReposCard Component Tests", () => {
  test("renders the repository name", () => {
    render(<ReposCard repo={mockRepo} />);
    expect(screen.getByText("Test Repo")).toBeInTheDocument();
  });

  test("renders the repository description", () => {
    render(<ReposCard repo={mockRepo} />);
    expect(screen.getByText("This is a test repo")).toBeInTheDocument();
  });

  test("renders fallback text if description is missing", () => {
    const repoWithoutDescription = { ...mockRepo, description: undefined };
    render(<ReposCard repo={repoWithoutDescription} />);
    expect(screen.getByText(REPOS.NOT_DESCRIPTION_TEXT)).toBeInTheDocument();
  });

  test("renders a link to the repository", () => {
    render(<ReposCard repo={mockRepo} />);
    const link = screen.getByText(REPOS.LINK_TEXT);
    expect(link.closest("a")).toHaveAttribute("href", mockRepo.html_url);
  });

  test("displays the star rating correctly", () => {
    render(<ReposCard repo={mockRepo} />);
    const rating = screen.getByRole("img", { name: `${mockRepo.stargazers_count} Stars` });
    expect(rating).toBeInTheDocument();
  });

  test("displays creation and update dates", () => {
    render(<ReposCard repo={mockRepo} />);
    const formattedCreationDate = "1.01.2022";
    const formattedUpdateDate = "1.01.2023";
    expect(screen.getByText(formattedCreationDate)).toBeInTheDocument();
    expect(screen.getByText(formattedUpdateDate)).toBeInTheDocument();
  });

  describe("Responsive behavior", () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });

    test("renders chips with medium size on desktop", () => {
      const useMediaQuery = require("@mui/material/useMediaQuery").default;
      useMediaQuery.mockReturnValue(false);
      render(<ReposCard repo={mockRepo} />);
      const githubIcon = screen.getByTestId("GitHubIcon");
      const accessTimeIcon = screen.getByTestId("AccessTimeIcon");
      const updateIcon = screen.getByTestId("UpdateIcon");
      expect(githubIcon).toBeInTheDocument();
      expect(accessTimeIcon).toBeInTheDocument();
      expect(updateIcon).toBeInTheDocument();
      expect(accessTimeIcon).toHaveClass("MuiChip-iconMedium");
      expect(updateIcon).toHaveClass("MuiChip-iconMedium");
    });

    test("renders chips with small size on mobile", () => {
      const useMediaQuery = require("@mui/material/useMediaQuery").default;
      useMediaQuery.mockReturnValue(true); // mobile view
      render(<ReposCard repo={mockRepo} />);
      const githubIcon = screen.getByTestId("GitHubIcon");
      const accessTimeIcon = screen.getByTestId("AccessTimeIcon");
      const updateIcon = screen.getByTestId("UpdateIcon");
      expect(githubIcon).toBeInTheDocument();
      expect(accessTimeIcon).toBeInTheDocument();
      expect(updateIcon).toBeInTheDocument();
      expect(accessTimeIcon).toHaveClass("MuiChip-iconSmall");
      expect(updateIcon).toHaveClass("MuiChip-iconSmall");

    });
  });
});
