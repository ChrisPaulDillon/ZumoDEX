import WalletConnectButton from "./WalletConnectButton";
import { fireEvent, getByTestId, screen } from "@testing-library/react";
import configureStore from "../../state";
import { logUserIn } from "../../state/reducer";
import { getAbbreviatedAddress } from "../../util/addressHelper";
import { testAddress, testRender } from "../../util/testHelper";

describe("WalletConnectButton", () => {
  const store = configureStore();

  it("should display 'Connect Wallet' upon initial load", () => {
    testRender(<WalletConnectButton />, { store });
    expect(screen.getByText("Connect Wallet")).toBeInTheDocument();
  });

  it("should display the users address when they are signed in", () => {
    const store = configureStore();
    store.dispatch(logUserIn({ address: testAddress }));
    testRender(<WalletConnectButton />, { store });
    expect(screen.getByText(getAbbreviatedAddress(testAddress))).toBeInTheDocument();
  });

  it("should display a toast message warning the user they do not have MetaMask installed", () => {
    const store = configureStore();
    const { container } = testRender(<WalletConnectButton />, { store });
    const button = getByTestId(container, "btn-wallet");
    fireEvent.click(button);
    expect(screen.getByText("No Web3 wallet detected, please install MetaMask")).toBeInTheDocument();
  });
});
