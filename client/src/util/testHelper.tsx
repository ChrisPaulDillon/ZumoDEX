import { render } from "@testing-library/react";
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
