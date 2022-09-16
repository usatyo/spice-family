import { ArrowLeftIcon, ArrowRightIcon } from "@chakra-ui/icons"
import { Box, Button, HStack, Image, Text, VStack } from "@chakra-ui/react"
import boardImg from "../assets/ban.png"


const Record = () => {
  return (<>
    <HStack justify="center" backgroundColor="#cccccc" height="100vh">
      <Image
        src={boardImg}
        margin="20px"
        height="90vh"
      />
      <VStack spacing="20px">
        <VStack
          backgroundColor="#555555"
          color="white"
          width="300px"
          borderRadius="10px"
          padding="20px"
        >
          <Text fontSize="16px">black</Text>
          <Text fontSize="20px">usatyo</Text>
        </VStack>
        <VStack
          backgroundColor="#ffffff"
          width="300px"
          borderRadius="10px"
          padding="20px"
        >
          <Text fontSize="16px">white</Text>
          <Text fontSize="20px">usatyo</Text>
        </VStack>
        <HStack spacing="20px">
          <Button>
            <ArrowLeftIcon />
          </Button>
          <Button>
            <ArrowRightIcon />
          </Button>
        </HStack>
      </VStack>
    </HStack>
  </>)
}

export default Record