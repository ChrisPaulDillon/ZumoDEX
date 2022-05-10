import { ButtonProps, Button } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import useFireToast from "../../hooks/useFireToast";
import useWalletConnect from "../../hooks/useWalletConnect";
import { IAppState } from "../../state";
import { CONNECTOR_TYPE } from "../../state/reducer";
import { getAbbreviatedAddress } from "../../util/addressHelper";

const WalletConnectButton: React.FC<ButtonProps> = ({ ...rest }) => {
  const userAddress = useSelector((state: IAppState) => state.state.userAddress);
  const isLoggedIn = useSelector((state: IAppState) => state.state.isLoggedIn);
  const connectorStatus = useSelector((state: IAppState) => state.state.connectorStatus);
  const toast = useFireToast();
  const { login, logout } = useWalletConnect();

  const handleWalletConnect = () => {
    if (connectorStatus !== CONNECTOR_TYPE.WALLET_CONNECT) {
      toast.Negative("Error", "No Web3 wallet detected, please install MetaMask");
    } else if (isLoggedIn) {
      return logout();
    }
    return login();
  };

  return (
    <Button onClick={handleWalletConnect} {...rest}>
      {isLoggedIn ? getAbbreviatedAddress(userAddress!) : "Connect Wallet"}
    </Button>
  );
};

export default WalletConnectButton;
