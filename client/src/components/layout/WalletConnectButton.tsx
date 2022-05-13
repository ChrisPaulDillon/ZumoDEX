import { ButtonProps, Button } from "@chakra-ui/react";
import useDetectWalletStatus from "hooks/useDetectWalletStatus";
import useFireToast from "../../hooks/useFireToast";
import { CONNECTOR_TYPE, getConnectionStatusSelector, getLoginStatusSelector } from "../../state/reducer";
import { getAbbreviatedAddress } from "../../util/addressHelper";

const WalletConnectButton: React.FC<ButtonProps> = ({ ...rest }) => {
  const { userAddress, isLoggedIn } = getLoginStatusSelector();
  const connectorStatus = getConnectionStatusSelector();
  const toast = useFireToast();
  const { login, logout } = useDetectWalletStatus();

  const handleWalletConnect = () => {
    if (connectorStatus !== CONNECTOR_TYPE.WALLET_CONNECT) {
      toast.Negative("Error", "No Web3 wallet detected, please install MetaMask");
    } else if (isLoggedIn) {
      return logout();
    }
    return login();
  };

  return (
    <Button data-testid="btn-wallet" onClick={handleWalletConnect} {...rest}>
      {isLoggedIn ? getAbbreviatedAddress(userAddress!) : "Connect Wallet"}
    </Button>
  );
};

export default WalletConnectButton;
