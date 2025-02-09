import { render, screen, fireEvent } from "@testing-library/react";
import ReposHeader from "./ReposHeader";
import { REPOS, SORT } from "../../../utils/consts";
import { useMediaQuery } from "@mui/material";

jest.mock("@mui/material", () => ({
  ...jest.requireActual("@mui/material"),
  useMediaQuery: jest.fn(),
}));

describe("ReposHeader Component", () => {
  const mockHandleSortChange = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders with correct initial props", () => {
    (useMediaQuery as jest.Mock).mockReturnValue(false);

    render(
      <ReposHeader
        sortRepos={SORT.DESC}
        handleSortChange={mockHandleSortChange}
      />
    );

    expect(screen.getByText(REPOS.TITLE)).toBeInTheDocument();
    expect(screen.getByText(REPOS.SORT_BUTTON_DESK_TEXT)).toBeInTheDocument();
    expect(screen.getByText(REPOS.SORT_BUTTON_ASK_TEXT)).toBeInTheDocument();
  });

  test("handles sort change correctly", () => {
    (useMediaQuery as jest.Mock).mockReturnValue(false);

    render(
      <ReposHeader
        sortRepos={SORT.DESC}
        handleSortChange={mockHandleSortChange}
      />
    );

    const ascButton = screen.getByText(REPOS.SORT_BUTTON_ASK_TEXT);
    fireEvent.click(ascButton);

    expect(mockHandleSortChange).toHaveBeenCalled();
  });

  test("applies correct button states based on sortRepos prop", () => {
    (useMediaQuery as jest.Mock).mockReturnValue(false);

    render(
      <ReposHeader
        sortRepos={SORT.DESC}
        handleSortChange={mockHandleSortChange}
      />
    );

    const descButton = screen.getByLabelText("descending");
    expect(descButton).toHaveAttribute("aria-pressed", "true");

    const ascButton = screen.getByLabelText("ascending");
    expect(ascButton).toHaveAttribute("aria-pressed", "false");
  });

  test("renders with small size buttons on mobile view", () => {
    (useMediaQuery as jest.Mock).mockReturnValue(true);

    render(
      <ReposHeader
        sortRepos={SORT.DESC}
        handleSortChange={mockHandleSortChange}
      />
    );

    const buttons = screen.getAllByRole("button");
    buttons.forEach(button => {
      expect(button).toHaveClass("MuiToggleButton-sizeSmall");
    });
  });

  test("renders with medium size buttons on desktop view", () => {
    (useMediaQuery as jest.Mock).mockReturnValue(false);

    render(
      <ReposHeader
        sortRepos={SORT.DESC}
        handleSortChange={mockHandleSortChange}
      />
    );

    const buttons = screen.getAllByRole("button");
    buttons.forEach(button => {
      expect(button).not.toHaveClass("MuiToggleButton-sizeSmall");
      expect(button).toHaveClass("MuiToggleButton-sizeMedium");
    });
  });

  test("renders with medium size buttons on desktop view", () => {
    (useMediaQuery as jest.Mock).mockReturnValue(false);

    render(
      <ReposHeader
        sortRepos={SORT.DESC}
        handleSortChange={mockHandleSortChange}
      />
    );

    const buttonGroup = screen.getByRole("group");
    expect(buttonGroup).not.toHaveClass("MuiToggleButtonGroup-sizeSmall");
  });

  test("applies correct styles based on theme breakpoints", () => {
    (useMediaQuery as jest.Mock).mockReturnValue(false);

    const { container } = render(
      <ReposHeader
        sortRepos={SORT.DESC}
        handleSortChange={mockHandleSortChange}
      />
    );

    const boxElement = container.firstChild;
    expect(boxElement).toHaveStyle({
      display: "flex",
      width: "100%",
    });
  });

  test("memorized component renders correctly", () => {
    (useMediaQuery as jest.Mock).mockReturnValue(false);

    const { rerender } = render(
      <ReposHeader
        sortRepos={SORT.DESC}
        handleSortChange={mockHandleSortChange}
      />
    );

    rerender(
      <ReposHeader
        sortRepos={SORT.DESC}
        handleSortChange={mockHandleSortChange}
      />
    );

    // Проверяем, что все элементы на месте после перерендера
    expect(screen.getByText(REPOS.TITLE)).toBeInTheDocument();
    expect(screen.getByText(REPOS.SORT_BUTTON_DESK_TEXT)).toBeInTheDocument();
    expect(screen.getByText(REPOS.SORT_BUTTON_ASK_TEXT)).toBeInTheDocument();
  });
});