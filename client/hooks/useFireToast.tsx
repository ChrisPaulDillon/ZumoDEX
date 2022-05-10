import { toast, useToast } from "@chakra-ui/react";
import { ToastError, ToastSuccess, ToastWarning } from "../src/lib/components/CustomToasts";

const useFireToast = () => {
  const toast = useToast();

  const Positive = (title: string, description: string) => {
    toast({
      position: "top",
      render: () => <ToastSuccess title={title} description={description} />,
      duration: 9000,
      isClosable: true,
    });
  };

  const Negative = (title: string, description: string) => {
    toast({
      position: "top",
      render: () => <ToastError title={title} description={description} />,
      duration: 9000,
      isClosable: true,
    });
  };

  const Warning = (title: string, description: string) => {
    toast({
      position: "top",
      render: () => <ToastWarning title={title} description={description} />,
      duration: 9000,
      isClosable: true,
    });
  };

  return { Positive, Negative, Warning };
};

export default useFireToast;
