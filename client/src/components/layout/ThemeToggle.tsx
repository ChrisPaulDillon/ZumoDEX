import { IconButton, useColorMode } from "@chakra-ui/react";
import { RiMoonFill, RiSunLine } from "react-icons/ri";

const ThemeToggle = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <IconButton
      data-testid="btn-theme"
      aria-label="theme toggle"
      icon={colorMode === "light" ? <RiMoonFill data-testid="moon" /> : <RiSunLine data-testid="sun" />}
      onClick={toggleColorMode}
    />
  );
};

export default ThemeToggle;
