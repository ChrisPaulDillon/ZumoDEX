import {
  ActionCreatorWithPayload,
  createAction,
  createReducer,
  PayloadAction,
} from "@reduxjs/toolkit";

export const logUserIn = createAction<{ address: string }>("state/logUserIn");
export const logUserOut = createAction("state/logUserOut");

export interface IGlobalState {
  userAddress: string | undefined;
  isLoggedIn: boolean;
}

export const initialState: IGlobalState = {
  userAddress: "",
  isLoggedIn: false,
};

export default createReducer(initialState, (builder) =>
  builder
    .addCase(logUserIn, (state: IGlobalState, { payload: { address } }) => {
      state.userAddress = address;
      state.isLoggedIn = true;
    })
    .addCase(logUserOut, (state: IGlobalState) => {
      state.userAddress = undefined;
      state.isLoggedIn = false;
    })
);
