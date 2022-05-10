import WalletConnectButton from "./WalletConnectButton";
import { screen } from "@testing-library/react";
import configureStore from "../../state";
import { logUserIn } from "../../state/reducer";
import { getAbbreviatedAddress } from "../../util/addressHelper";
import { testAddress, testReduxRender } from "../../util/testHelper";

describe("WalletConnectButton", () => {
  const store = configureStore();
  //const spy = jest.spyOn(store, getConnectionStatusSelector());
  //spy.mockReturnValue({ username: "test" });
  beforeEach(() => {});

  it("should display 'Connect Wallet' upon initial load", () => {
    testReduxRender(<WalletConnectButton />, { store });
    expect(screen.getByText("Connect Wallet")).toBeInTheDocument();
  });

  it("should display the users address when they are signed in", () => {
    const store = configureStore();
    store.dispatch(logUserIn({ address: testAddress }));
    testReduxRender(<WalletConnectButton />, { store });
    expect(screen.getByText(getAbbreviatedAddress(testAddress))).toBeInTheDocument();
  });
});
