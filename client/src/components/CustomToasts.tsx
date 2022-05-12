import { Box, useColorMode, Flex, chakra, useColorModeValue } from "@chakra-ui/react";
import React from "react";
import { FaBan, FaCheckCircle, FaExclamation } from "react-icons/fa";
import { IoMdCheckmarkCircle } from "react-icons/io";

interface ToastBodyProps {
  title: string;
  description: string;
  toastType: string;
  Icon: any;
  color: string;
}

const ToastBody: React.FC<ToastBodyProps> = ({ title, description, toastType, Icon, color }) => {
  return (
    <Flex w="full" alignItems="center" justifyContent="center">
      <Flex maxW="sm" w="full" mx="auto" bg={useColorModeValue("white", "gray.800")} shadow="md" rounded="lg" overflow="hidden">
        <Flex justifyContent="center" alignItems="center" w={12} bg={color}>
          <Icon as={IoMdCheckmarkCircle} color="white" boxSize={6} />
        </Flex>

        <Box mx={-3} py={2} px={4}>
          <Box mx={3}>
            <chakra.span color={color} fontWeight="bold">
              {title ?? toastType}
            </chakra.span>
            <chakra.p color={useColorModeValue("gray.600", "gray.200")} fontSize="sm">
              {description}
            </chakra.p>
          </Box>
        </Box>
      </Flex>
    </Flex>
  );
};

interface ToastProps {
  title: string;
  description: string;
}

export const ToastSuccess: React.FC<ToastProps> = ({ title, description }) => {
  return <ToastBody title={title} description={description} toastType="Success" Icon={FaCheckCircle} color="green.500" />;
};

export const ToastError: React.FC<ToastProps> = ({ title, description }) => {
  const { colorMode } = useColorMode();

  return <ToastBody title={title} description={description} toastType="Error" Icon={FaBan} color="red.500" />;
};

export const ToastWarning: React.FC<ToastProps> = ({ title, description }) => {
  const { colorMode } = useColorMode();

  return <ToastBody title={title} description={description} toastType="Warning" Icon={FaExclamation} color="orange.500" />;
};
