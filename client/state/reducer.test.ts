import { initialState } from "./reducer";
import reducer from "./reducer";

describe("Redux Reducer", () => {
  it("should return the initial state", () => {
    expect(reducer(undefined, { type: "" })).toEqual(initialState);
  });
});
