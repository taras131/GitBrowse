import React from "react";
import { render, screen, fireEvent, act } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Provider } from "react-redux";
import { setupStore } from "../../../store";
import Repos from "./Repos";
import { INFORM_MESSAGE, REPOS } from "../../../utils/consts";

const mockIntersectionObserver = jest.fn();
mockIntersectionObserver.mockImplementation(() => {
  return {
    observe: jest.fn(),
    disconnect: jest.fn(),
    unobserve: jest.fn(),
  };
});
window.IntersectionObserver = mockIntersectionObserver;

describe("Repos Component", () => {
  let store: ReturnType<typeof setupStore>;

  beforeEach(() => {
    store = setupStore();
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  test("renders initial state correctly", () => {
    render(
      <Provider store={store}>
        <Repos />
      </Provider>
    );

    expect(screen.getByPlaceholderText(REPOS.SEARCH_PLACEHOLDER)).toBeInTheDocument();
    expect(screen.getByText(REPOS.SORT_BUTTON_DESK_TEXT)).toBeInTheDocument();
    expect(screen.getByText(REPOS.SORT_BUTTON_ASK_TEXT)).toBeInTheDocument();
  });

  test("shows initial inform message", () => {
    render(
      <Provider store={store}>
        <Repos />
      </Provider>
    );

    expect(screen.getByText(INFORM_MESSAGE.START)).toBeInTheDocument();
  });

  test("updates search query on input change", () => {
    render(
      <Provider store={store}>
        <Repos />
      </Provider>
    );

    const searchInput = screen.getByPlaceholderText(REPOS.SEARCH_PLACEHOLDER);
    fireEvent.change(searchInput, { target: { value: "test" } });

    expect(searchInput).toHaveValue("test");
  });

  test("shows search history and handles history item click", () => {
    render(
      <Provider store={store}>
        <Repos />
      </Provider>
    );

    expect(screen.getByText("gaearon")).toBeInTheDocument();
    expect(screen.getByText("markerikson")).toBeInTheDocument();
    expect(screen.getByText("taras131")).toBeInTheDocument();

    fireEvent.click(screen.getByText("gaearon"));
    const searchInput = screen.getByPlaceholderText(REPOS.SEARCH_PLACEHOLDER);
    expect(searchInput).toHaveValue("gaearon");
  });

  test("handles sort change", () => {
    render(
      <Provider store={store}>
        <Repos />
      </Provider>
    );

    const ascButton = screen.getByText(REPOS.SORT_BUTTON_DESK_TEXT);
    fireEvent.click(ascButton);

    expect(ascButton).toHaveAttribute("aria-pressed", "false");
  });

  test("resets repos list when search query is cleared", () => {
    render(
      <Provider store={store}>
        <Repos />
      </Provider>
    );

    const searchInput = screen.getByPlaceholderText(REPOS.SEARCH_PLACEHOLDER);

    fireEvent.change(searchInput, { target: { value: "test" } });
    fireEvent.change(searchInput, { target: { value: "" } });

    expect(store.getState().repos.reposList).toHaveLength(0);
    expect(store.getState().repos.informMessage).toBe(INFORM_MESSAGE.START);
  });

  test("debounces search input", async () => {
    jest.useFakeTimers();

    render(
      <Provider store={store}>
        <Repos />
      </Provider>
    );

    const searchInput = screen.getByPlaceholderText(REPOS.SEARCH_PLACEHOLDER);
    store.dispatch({ type: "repos/setReposLoading", payload: false });
    expect(store.getState().repos.isLoading).toBeFalsy();
    await act(async () => {
      fireEvent.change(searchInput, { target: { value: "test" } });
    });
    await act(async () => {
      jest.runAllTimers();
    });

    expect(store.getState().repos.isLoading).toBeTruthy();

    jest.useRealTimers();
  });

  test("shows empty state when no repositories found", () => {
    store.dispatch({
      type: "repos/setReposInformMessage",
      payload: INFORM_MESSAGE.USER_FOUND,
    });

    render(
      <Provider store={store}>
        <Repos />
      </Provider>
    );
    expect(screen.getByText(REPOS.EMPTY_TITLE)).toBeInTheDocument();
  });
});
