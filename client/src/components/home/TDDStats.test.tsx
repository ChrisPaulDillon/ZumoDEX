import { screen } from "@testing-library/react";
import { IDexInfo, ITokenInfo, updateDexInfo, updateTokenInfo } from "../../state/reducer";
import configureStore from "../../state";
import { testRender } from "../../util/testHelper";
import TDDStats from "./TDDStats";

describe("TTD Stats Component", () => {
  it("should display token data gathered from redux state", () => {
    const tokenInfo: ITokenInfo = {
      name: "TestDexToken",
      symbol: "TDD",
      totalSupply: 100000,
    };
    const store = configureStore();
    store.dispatch(updateTokenInfo({ tokenInfo: tokenInfo }));
    testRender(<TDDStats />, { store });
    expect(screen.getByText("Exchange Information")).toBeInTheDocument();
    expect(screen.getByText(tokenInfo.name)).toBeInTheDocument();
    expect(screen.getByText(tokenInfo.symbol)).toBeInTheDocument();
    expect(screen.getByText(tokenInfo.totalSupply + " Max Supply")).toBeInTheDocument();
  });

  it("should display dex info data gathered from redux state", () => {
    const dexInfo: IDexInfo = {
      buyRate: "50",
      sellRate: "50",
      totalSales: 1,
      exchangeTokenBalance: 50,
      exchangeEtherBalance: 50,
    };
    const store = configureStore();
    store.dispatch(updateDexInfo({ dexInfo: dexInfo }));
    testRender(<TDDStats />, { store });

    expect(screen.getByText("Exchange Information")).toBeInTheDocument();
    expect(screen.getByText(dexInfo.exchangeTokenBalance + " Exchange TDD Balance")).toBeInTheDocument();
    expect(screen.getByText(dexInfo.exchangeTokenBalance + " Exchange Ether Balance")).toBeInTheDocument();
  });
});
