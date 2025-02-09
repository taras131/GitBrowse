import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { rootReducer } from "../../../store";
import Repos from "./Repos";
import { MESSAGE_SEVERITY } from "../../message/model/slice";
import { INFORM_MESSAGE } from "../../../utils/consts";

describe("ReposList Component", () => {
  const createTestStore = (initialState = {}) => {
    return configureStore({
      reducer: rootReducer,
      preloadedState: {
        repos: {
          reposList: [],
          isLoading: false,
          informMessage: INFORM_MESSAGE.START,
        },
        message: {
          isShow: false,
          message: {
            severity: MESSAGE_SEVERITY.success,
            text: "",
          },
        },
        ...initialState,
      },
    });
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders initial state correctly", () => {
    const store = createTestStore();
    render(
      <Provider store={store}>
        <Repos />
      </Provider>
    );

    expect(screen.getByText(/Введите не менее трёх символов/i)).toBeInTheDocument();
  });


});

