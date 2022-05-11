import { useToast } from "@chakra-ui/react";
import { ToastError, ToastSuccess, ToastWarning } from "../components/CustomToasts";

const useFireToast = () => {
  const toast = useToast();

  const Positive = (title: string, description: string, id?: string) => {
    toast({
      id: id,
      position: "top",
      render: () => <ToastSuccess title={title} description={description} />,
      duration: 9000,
      isClosable: true,
    });
  };

  const Negative = (title: string, description: string, id?: string) => {
    toast({
      id: id,
      position: "top",
      render: () => <ToastError title={title} description={description} />,
      duration: 9000,
      isClosable: true,
    });
  };

  const Warning = (title: string, description: string, id?: string) => {
    toast({
      id: id,
      position: "top",
      render: () => <ToastWarning title={title} description={description} />,
      duration: 9000,
      isClosable: true,
    });
  };

  return { Positive, Negative, Warning, ...toast };
};

export default useFireToast;
