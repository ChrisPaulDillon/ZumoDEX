import { ButtonProps, Button } from "@chakra-ui/react";
import useWalletConnect from "../../../hooks/useWalletConnect";
import { getAbbreviatedAddress } from "../../../util/addressHelper";

const WalletConnectButton: React.FC<ButtonProps> = ({ ...rest }) => {
  const { active, login, logout, account } = useWalletConnect();

  return (
    <Button onClick={active ? logout : login} {...rest}>
      {active ? getAbbreviatedAddress(account!) : "Connect Wallet"}
    </Button>
  );
};

export default WalletConnectButton;
