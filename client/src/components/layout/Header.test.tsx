import Header from "./Header";
import { screen } from "@testing-library/react";
import configureStore from "../../state";
import { testRender } from "../../util/testHelper";

describe("Header Component", () => {
  beforeEach(() => {});

  it("should display company label and wallet label", () => {
    const store = configureStore();
    testRender(<Header />, { store });
    expect(screen.getByText("ZumoSwap!")).toBeInTheDocument();
    expect(screen.getByText("Connect Wallet")).toBeInTheDocument();
  });
});
