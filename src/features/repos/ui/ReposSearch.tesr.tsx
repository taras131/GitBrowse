import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import ReposSearch from "./ReposSearch";
import { INFORM_MESSAGE, REPOS } from "../../../utils/consts";
import { TInformMessage } from "../../../models/IRepos";

describe("ReposSearch Component", () => {
  const defaultProps = {
    message: INFORM_MESSAGE.START,
    searchHistory: ["react", "typescript", "jest"],
    searchQuery: "",
    handleInputChange: jest.fn(),
    handleHistoryItemClick: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders search input with correct placeholder", () => {
    render(<ReposSearch {...defaultProps} />);

    const input = screen.getByPlaceholderText(REPOS.SEARCH_PLACEHOLDER);
    expect(input).toBeInTheDocument();
  });

  test("displays inform message correctly", () => {
    const message = "Custom test message";
    render(<ReposSearch {...defaultProps} message={message as TInformMessage} />);

    expect(screen.getByText(message)).toBeInTheDocument();
  });

  test("renders search history title", () => {
    render(<ReposSearch {...defaultProps} />);

    expect(screen.getByText(REPOS.HISTORY_SUBTITLE)).toBeInTheDocument();
  });

  test("renders correct number of history items (max 6)", () => {
    const longHistory = ["1", "2", "3", "4", "5", "6", "7", "8"];
    render(<ReposSearch {...defaultProps} searchHistory={longHistory} />);

    const historyChips = screen.getAllByRole("button");
    expect(historyChips).toHaveLength(6);
  });

  test("calls handleInputChange when input value changes", () => {
    render(<ReposSearch {...defaultProps} />);

    const input = screen.getByPlaceholderText(REPOS.SEARCH_PLACEHOLDER);
    fireEvent.change(input, { target: { value: "test query" } });

    expect(defaultProps.handleInputChange).toHaveBeenCalled();
  });

  test("calls handleHistoryItemClick when history item is clicked", () => {
    render(<ReposSearch {...defaultProps} />);

    const historyItem = screen.getByText("react");
    fireEvent.click(historyItem);

    expect(defaultProps.handleHistoryItemClick).toHaveBeenCalledWith("react");
  });

  test("displays search query value correctly", () => {
    const searchQuery = "test search";
    render(<ReposSearch {...defaultProps} searchQuery={searchQuery} />);

    const input = screen.getByPlaceholderText(REPOS.SEARCH_PLACEHOLDER) as HTMLInputElement;
    expect(input.value).toBe(searchQuery);
  });

  test("renders empty history list when searchHistory is empty", () => {
    render(<ReposSearch {...defaultProps} searchHistory={[]} />);

    const historyChips = screen.queryAllByRole("button");
    expect(historyChips).toHaveLength(0);
  });

  test("applies correct styles to history chips", () => {
    render(<ReposSearch {...defaultProps} />);

    const historyChips = screen.getAllByRole("button");
    historyChips.forEach(chip => {
      expect(chip).toHaveStyle({ cursor: "pointer" });
    });
  });

  test("renders history items in correct order", () => {
    const history = ["first", "second", "third"];
    render(<ReposSearch {...defaultProps} searchHistory={history} />);

    const historyChips = screen.getAllByRole("button");
    expect(historyChips[0]).toHaveTextContent("first");
    expect(historyChips[1]).toHaveTextContent("second");
    expect(historyChips[2]).toHaveTextContent("third");
  });

  test("handles long history item texts correctly", () => {
    const longText = "a".repeat(50);
    render(<ReposSearch {...defaultProps} searchHistory={[longText]} />);

    const historyChip = screen.getByText(longText);
    expect(historyChip).toBeInTheDocument();
  });

  describe("Component Layout", () => {
    test("renders in correct structure", () => {
      const { container } = render(<ReposSearch {...defaultProps} />);

      expect(container.querySelector(".MuiStack-root")).toBeInTheDocument();
      expect(container.querySelector(".MuiCard-root")).toBeInTheDocument();
      expect(container.querySelector(".MuiOutlinedInput-root")).toBeInTheDocument();
    });

    test("applies correct spacing to history items", () => {
      render(<ReposSearch {...defaultProps} />);

      const historyStack = screen.getByText("История:").parentElement;
      expect(historyStack).toHaveStyle({ padding: "8px" });
    });
  });

  describe("Input Behavior", () => {
    test("input is focused on tab navigation", () => {
      render(<ReposSearch {...defaultProps} />);

      const input = screen.getByPlaceholderText(REPOS.SEARCH_PLACEHOLDER);
      input.focus();
      expect(input).toHaveFocus();
    });

    test("handles multiple input changes", () => {
      render(<ReposSearch {...defaultProps} />);

      const input = screen.getByPlaceholderText(REPOS.SEARCH_PLACEHOLDER);
      fireEvent.change(input, { target: { value: "test1" } });
      fireEvent.change(input, { target: { value: "test2" } });
      fireEvent.change(input, { target: { value: "test3" } });

      expect(defaultProps.handleInputChange).toHaveBeenCalledTimes(3);
    });
  });

  describe("History Interaction", () => {
    test("handles multiple history item clicks", () => {
      render(<ReposSearch {...defaultProps} />);

      const historyItems = screen.getAllByRole("button");
      historyItems.forEach(item => {
        fireEvent.click(item);
      });

      expect(defaultProps.handleHistoryItemClick).toHaveBeenCalledTimes(historyItems.length);
    });

    test("history chips have correct size", () => {
      render(<ReposSearch {...defaultProps} />);

      const historyChips = screen.getAllByRole("button");
      historyChips.forEach(chip => {
        expect(chip).toHaveClass("MuiChip-sizeSmall");
      });
    });
  });
});