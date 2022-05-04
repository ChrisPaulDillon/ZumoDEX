import { useToast } from "@chakra-ui/react"

const useFireToast = () => {
    const toast = useToast()

    const Positive = (title: string, description: string) => {
        toast({
            title: title,
            description: description,
            status: 'success',
            duration: 9000,
            isClosable: true,
            position: 'top'
          })
    }

    const Negative = (title: string, description: string) => {
        toast({
            title: title,
            description: description,
            status: 'error',
            duration: 9000,
            isClosable: true,
            position: 'top'
          })
    }

    const Warning = (title: string, description: string) => {
        toast({
            title: title,
            description: description,
            status: 'warning',
            duration: 9000,
            isClosable: true,
            position: 'top'
          })
    }

    return {Positive, Negative, Warning }
}

export default useFireToast;