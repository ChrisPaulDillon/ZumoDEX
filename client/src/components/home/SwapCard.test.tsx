import { fireEvent, getByTestId, screen } from "@testing-library/react";
import { updateDexInfo, updateTokenIsSpendable } from "../../state/reducer";
import configureStore from "../../state";
import { testRender } from "../../util/testHelper";
import SwapCard from "./SwapCard";

describe("Swap Card Component", () => {
  it("should display approve button", () => {
    const store = configureStore();
    testRender(<SwapCard />, { store });
    expect(screen.getByText("Approve")).toBeInTheDocument();
  });

  it("should display buy button", () => {
    const store = configureStore();
    store.dispatch(updateTokenIsSpendable({ isTokenSpendable: true }));
    testRender(<SwapCard />, { store });
    expect(screen.getByText("Buy")).toBeInTheDocument();
  });

  it("should display sell button after swap button has been pressed", () => {
    const store = configureStore();
    store.dispatch(updateTokenIsSpendable({ isTokenSpendable: true }));
    const { container } = testRender(<SwapCard />, { store });
    const button = getByTestId(container, "btn-swap");
    fireEvent.click(button);
    expect(screen.getByText("Sell")).toBeInTheDocument();
  });

  it("should display sell button after swap button has been pressed", () => {
    const store = configureStore();
    store.dispatch(updateTokenIsSpendable({ isTokenSpendable: true }));
    const { container } = testRender(<SwapCard />, { store });
    const button = getByTestId(container, "btn-swap");
    fireEvent.click(button);
    expect(screen.getByText("Sell")).toBeInTheDocument();
  });

  it("should have disabled buy button as user is not logged in", () => {
    const store = configureStore();
    store.dispatch(updateTokenIsSpendable({ isTokenSpendable: true }));
    const { container } = testRender(<SwapCard />, { store });
    const button = getByTestId(container, "btn-submit");
    expect(button).toBeDisabled();
  });

  it("should allow the user to enter values in the ethereum input when in buy mode", () => {
    const store = configureStore();
    store.dispatch(updateTokenIsSpendable({ isTokenSpendable: true }));

    const { container } = testRender(<SwapCard />, { store });

    const ethInput = container.querySelector('input[name="ETH"]');
    const tddInput = container.querySelector('input[name="TDD"]');
    fireEvent.change(ethInput!, { target: { value: "100" } });

    expect(screen.getByDisplayValue("100")).toBeInTheDocument();
    expect(tddInput).toBeDisabled();
  });

  it("should allow the user to enter values in the TDD input when in sell mode", () => {
    const store = configureStore();
    store.dispatch(updateTokenIsSpendable({ isTokenSpendable: true }));
    const { container } = testRender(<SwapCard />, { store });

    const button = getByTestId(container, "btn-swap");
    fireEvent.click(button);

    const tddInput = container.querySelector('input[name="TDD"]');
    const ethInput = container.querySelector('input[name="ETH"]');
    fireEvent.change(tddInput!, { target: { value: "50" } });

    expect(screen.getByDisplayValue("50")).toBeInTheDocument();
    expect(ethInput).toBeDisabled();
  });

  it("should have the submit button still disabled even after inputting an ethereum value as there is no TDD in exchange", () => {
    const store = configureStore();
    store.dispatch(updateTokenIsSpendable({ isTokenSpendable: true }));
    const { container } = testRender(<SwapCard />, { store });

    const ethInput = container.querySelector('input[name="ETH"]');
    fireEvent.change(ethInput!, { target: { value: "50" } });

    const button = getByTestId(container, "btn-submit");
    expect(button).toBeDisabled();
  });

  it("should have the submit button enabled after all conditions are", () => {
    const store = configureStore();
    store.dispatch(updateTokenIsSpendable({ isTokenSpendable: true }));
    store.dispatch(
      updateDexInfo({ dexInfo: { buyRate: "1", sellRate: "1", totalSales: 1, exchangeTokenBalance: 500000000, exchangeEtherBalance: 50 } })
    );
    const { container } = testRender(<SwapCard />, { store });

    const ethInput = container.querySelector('input[name="ETH"]');
    fireEvent.change(ethInput!, { target: { value: "0.000000000000001" } });

    const button = getByTestId(container, "btn-submit");
    expect(button).not.toBeDisabled();
  });
});
