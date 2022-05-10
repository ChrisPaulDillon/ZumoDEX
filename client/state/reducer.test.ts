import { initialState, logUserIn, logUserOut, updateEtherBalance } from "./reducer";
import reducer from "./reducer";

const testAddress = "0xb794f5ea0ba39494ce839613fffba74279579268";
const testEtherBalance = 10000000000000000;

describe("Redux Reducer", () => {
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

  test("should update the users ethereum balance", () => {
    const state = reducer(initialState, updateEtherBalance({ etherBalance: testEtherBalance }));
    expect(state.etherBalance).toEqual(testEtherBalance);
  });
});
