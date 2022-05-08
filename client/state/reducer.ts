import { createAction, createReducer } from "@reduxjs/toolkit";

export const updateUserLoggedIn = createAction<{ userExpertMode: boolean }>(
  "state/updateUserLoggedIn"
);

export interface IGlobalState {
  userAddress: string;
  isLoggedIn: boolean;
}

export const initialState: IGlobalState = {
  userAddress: "",
  isLoggedIn: false,
};

export default createReducer(initialState, (builder) =>
  builder.addCase(updateUserLoggedIn, (state, action) => {
    state.userAddress = "";
    state.isLoggedIn = false;
  })
);
