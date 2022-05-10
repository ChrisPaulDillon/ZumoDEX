import Footer from "./Footer";
import { screen } from "@testing-library/react";
import configureStore from "../../state";
import { testRender } from "../../util/testHelper";
import { updateJsonRpcConnection, updateWeb3Provider } from "../../state/reducer";
import { JsonRpcProvider, Web3Provider } from "@ethersproject/providers";
import { generateTestingUtils } from "eth-testing";

describe("Footer Component", () => {
  const testingUtils = generateTestingUtils({ providerType: "MetaMask" });
  const jsonRpcProvider = new JsonRpcProvider();
  let web3Provider: Web3Provider;

  beforeEach(() => {
    //@ts-ignore
    global.window.ethereum = testingUtils.getProvider();
    //@ts-ignore
    web3Provider = new Web3Provider(global.window.ethereum);
  });

  it("should display company label and not connected label", () => {
    const store = configureStore();
    testRender(<Footer />, { store });
    expect(screen.getByText("Zumo")).toBeInTheDocument();
    expect(screen.getByText("Status: Not Connected")).toBeInTheDocument();
  });

  it("should display connected to json rpc label", () => {
    const store = configureStore();
    store.dispatch(updateJsonRpcConnection({ jsonRpcConnector: jsonRpcProvider }));
    testRender(<Footer />, { store });
    expect(screen.getByText("Zumo")).toBeInTheDocument();
    expect(screen.getByText("Status: Connected to Json RPC")).toBeInTheDocument();
  });

  it("should display connected to wallet label", () => {
    const store = configureStore();
    store.dispatch(updateWeb3Provider({ web3Provider: web3Provider }));
    testRender(<Footer />, { store });
    expect(screen.getByText("Zumo")).toBeInTheDocument();
    expect(screen.getByText("Status: Connected to Wallet")).toBeInTheDocument();
  });
});
