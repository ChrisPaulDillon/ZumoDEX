import {
  CONNECTOR_TYPE,
  initialState,
  logUserIn,
  logUserOut,
  updateEtherBalance,
  updateJsonRpcConnection,
  updateWeb3Provider,
} from "./reducer";
import reducer from "./reducer";
import { JsonRpcProvider, Web3Provider } from "@ethersproject/providers";
import { generateTestingUtils } from "eth-testing";
import { testAddress, testEtherBalance } from "../util/testHelper";

describe("Redux Reducer", () => {
  const testingUtils = generateTestingUtils({ providerType: "MetaMask" });
  const jsonRpcProvider = new JsonRpcProvider();
  let web3Provider: Web3Provider;

  beforeAll(() => {
    //@ts-ignore
    global.window.ethereum = testingUtils.getProvider();
    //@ts-ignore
    web3Provider = new Web3Provider(global.window.ethereum);
  });

  afterEach(() => {
    // Clear all mocks between tests
    testingUtils.clearAllMocks();
  });

  test("should return the initial state", () => {
    expect(reducer(undefined, { type: "" })).toEqual(initialState);
  });

  test("should update the user state to being logged in", () => {
    const state = reducer(initialState, logUserIn({ address: testAddress }));
    expect(state.isLoggedIn).toEqual(true);
    expect(state.userAddress).toEqual(testAddress);
  });

  test("should update the user state to be logged out", () => {
    const state = reducer(initialState, logUserOut());
    expect(state.isLoggedIn).toEqual(false);
    expect(state.userAddress).toEqual(undefined);
  });

  test("should update the user state to be logged out", () => {
    const state = reducer(initialState, updateWeb3Provider({ web3Provider: web3Provider }));
    expect(state.connectorStatus).toEqual(CONNECTOR_TYPE.WALLET_CONNECT);
    expect(state.web3Provider).toEqual(web3Provider);
  });

  test("should update the connection status to json RPC", () => {
    const state = reducer(initialState, updateJsonRpcConnection({ jsonRpcConnector: jsonRpcProvider }));
    expect(state.connectorStatus).toEqual(CONNECTOR_TYPE.JSON_RPC);
    expect(state.jsonRpcProvider).toEqual(jsonRpcProvider);
  });

  test("should update the users ethereum balance", () => {
    const state = reducer(initialState, updateEtherBalance({ etherBalance: testEtherBalance }));
    expect(state.etherBalance).toEqual(testEtherBalance);
  });
});
