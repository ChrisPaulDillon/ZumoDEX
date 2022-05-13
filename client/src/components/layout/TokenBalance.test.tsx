import { screen, queryByTestId } from "@testing-library/react";
import { updateUserTokenBalance } from "../../state/reducer";
import configureStore from "../../state";
import { testRender } from "../../util/testHelper";
import TokenBalance from "./TokenBalance";

describe("TokenBalance Component", () => {
  it("should display balance as 0", () => {
    const store = configureStore();
    const { container } = testRender(<TokenBalance />, { store: store });
    expect(screen.getByText("0")).toBeInTheDocument();
  });

  it("should display balance with a K", () => {
    const store = configureStore();
    store.dispatch(updateUserTokenBalance({ tokenBalance: 500000 }));
    const { container } = testRender(<TokenBalance />, { store: store });
    expect(screen.getByText("500K")).toBeInTheDocument();
  });

  it("should display balance with an M", () => {
    const store = configureStore();
    store.dispatch(updateUserTokenBalance({ tokenBalance: 5000000 }));
    const { container } = testRender(<TokenBalance />, { store: store });
    expect(screen.getByText("5M")).toBeInTheDocument();
  });

  it("should display balance with a B", () => {
    const store = configureStore();
    store.dispatch(updateUserTokenBalance({ tokenBalance: 5000000000 }));
    const { container } = testRender(<TokenBalance />, { store: store });
    expect(screen.getByText("5B")).toBeInTheDocument();
  });
});
