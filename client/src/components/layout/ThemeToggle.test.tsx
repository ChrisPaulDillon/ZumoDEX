import { fireEvent, getByTestId, queryByTestId } from "@testing-library/react";
import configureStore from "../../state";
import { testRender } from "../../util/testHelper";
import ThemeToggle from "./ThemeToggle";

describe("ThemeToggle Component", () => {
  it("should display sun icon and be in dark mode", () => {
    const store = configureStore();
    const { container } = testRender(<ThemeToggle />, { store: store });
    expect(queryByTestId(container, "sun")).not.toEqual(null);
    expect(queryByTestId(container, "moon")).toEqual(null);
  });

  it("should display moon icon and be in light mode", () => {
    const store = configureStore();
    const { container } = testRender(<ThemeToggle />, { store: store });
    const button = getByTestId(container, "btn-theme");
    fireEvent.click(button);
    expect(queryByTestId(container, "sun")).toEqual(null);
    expect(queryByTestId(container, "moon")).not.toEqual(null);
  });
});
