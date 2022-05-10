import { Box, Stack, useColorMode, Text, useTimeout, Flex } from "@chakra-ui/react";
import React, { useState } from "react";
import { IconType } from "react-icons";
import { IconButton } from "@chakra-ui/react";

import { FaBan, FaCheckCircle, FaExclamation } from "react-icons/fa";

interface ToastBodyProps {
  title: string;
  description: string;
  toastType: string;
  Icon: IconType;
  iconColour: string;
}

const ToastBody: React.FC<ToastBodyProps> = ({ title, description, toastType, Icon, iconColour }) => {
  const [loading, setLoading] = useState<boolean>(true);

  useTimeout(() => {
    setLoading(false);
  }, 900);

  return (
    <Box bg="gray.700" rounded="lg">
      <Stack isInline justify="space-between" p={1}>
        <Flex flexDirection="column" ml={2} mb={1}>
          <Text fontWeight="semibold" fontSize="2xl" color={iconColour}>
            {title}
          </Text>
          <Text fontWeight="light" color={"white"}>
            {description ?? toastType}
          </Text>
        </Flex>
        <Flex alignItems="center" justifyItems="center" alignContent="center" justify="center">
          <IconButton
            icon={<Icon />}
            color={iconColour}
            aria-label=""
            variant="ghost"
            fontSize="20px"
            isLoading={loading}
          />
        </Flex>
      </Stack>
    </Box>
  );
};

interface ToastProps {
  title: string;
  description: string;
}

export const ToastSuccess: React.FC<ToastProps> = ({ title, description }) => {
  return (
    <ToastBody title={title} description={description} toastType="Success" Icon={FaCheckCircle} iconColour="green" />
  );
};

export const ToastError: React.FC<ToastProps> = ({ title, description }) => {
  const { colorMode } = useColorMode();

  return <ToastBody title={title} description={description} toastType="Error" Icon={FaBan} iconColour="red.500" />;
};

export const ToastWarning: React.FC<ToastProps> = ({ title, description }) => {
  const { colorMode } = useColorMode();

  return (
    <ToastBody
      title={title}
      description={description}
      toastType="Warning"
      Icon={FaExclamation}
      iconColour="orange.500"
    />
  );
};
