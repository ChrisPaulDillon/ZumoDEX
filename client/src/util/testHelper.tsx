import { render } from "@testing-library/react";
import { Web3ReactProvider } from "@web3-react/core";
import { getLibrary } from "../pages/_app";
import { ReactChild, ReactFragment, ReactPortal } from "react";
import { Provider } from "react-redux";

export const testAddress = "0x0000000000000000000000";
export const testEtherBalance = 10000000000000000;

export const testReduxRender = (
  jsx: boolean | ReactChild | ReactFragment | ReactPortal | null | undefined,
  { store, ...otherOpts }: any
) => {
  return render(<Provider store={store}>{jsx}</Provider>, otherOpts);
};

export const testReduxWeb3Render = (
  jsx: boolean | ReactChild | ReactFragment | ReactPortal | null | undefined,
  { store, ...otherOpts }: any
) => {
  return render(
    <Web3ReactProvider getLibrary={getLibrary}>
      <Provider store={store}>{jsx}</Provider>
    </Web3ReactProvider>,
    otherOpts
  );
};
