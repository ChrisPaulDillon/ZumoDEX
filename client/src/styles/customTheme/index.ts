import { extendTheme } from "@chakra-ui/react";

import colors from "./colors";
import Button from "./components/button";
import fonts from "./fonts";

const config = {
  initialColorMode: 'dark',
  useSystemColorMode: false
}

const customTheme = extendTheme({
  fonts,
  colors,
  config,
  components: {
    Button,
  },
});

export default customTheme;
