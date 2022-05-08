import { ButtonProps, Button } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import useWalletConnect from "../../../hooks/useWalletConnect";
import { IAppState } from "../../../state";
import { getAbbreviatedAddress } from "../../../util/addressHelper";

const WalletConnectButton: React.FC<ButtonProps> = ({ ...rest }) => {
  const userAddress = useSelector(
    (state: IAppState) => state.state.userAddress
  );
  const isLoggedIn = useSelector((state: IAppState) => state.state.isLoggedIn);

  const { active, login, logout, account } = useWalletConnect();

  return (
    <Button onClick={isLoggedIn ? logout : login} {...rest}>
      {isLoggedIn ? getAbbreviatedAddress(userAddress!) : "Connect Wallet"}
    </Button>
  );
};

export default WalletConnectButton;
