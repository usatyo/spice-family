import { AspectRatio, ChakraProvider, Spacer, VStack } from '@chakra-ui/react';
import { Box, Button, Stack, HStack, Flex, Text, Center } from "@chakra-ui/react";
import './../App.css';
const Timer = () => {

  const sente = <Box bg={"black"} shadow="lg" rounded="full" w="70px" h="30px">
    <Center h='100%'>
      <Text fontSize="md" fontWeight="bold" color="white">先手</Text>
    </Center>
  </Box>;

  return (
    <div className="App">
      <header className="App-header">
        <AspectRatio w="full" ratio={16 / 9} >
          <HStack p={8} spacing={4}>
            <Box p={4} bg={"white"} shadow="lg" rounded="20px" w="900px" h="full" margin={"0%"}>
              <VStack h="full">
                <HStack w="full">
                  {sente}
                  <Spacer />
                </HStack>
                <Spacer />
                <Box>
                  <Text fontSize="xl" fontWeight="bold" color="black">ここに時計</Text>
                </Box>
                <Spacer />
                <Button colorScheme="blue" variant="outline" w="full" h="50px" borderRadius={10}>
                  <Text fontSize="xl" fontWeight="bold" colorScheme="blue">着手</Text>
                </Button>
              </VStack>
            </Box>
            <Box w="full" h="full" >
              <VStack spacing={4} h="full">
                {sente}
                <Box>
                  <Text as="span" fontSize={60} color="blue.400" fontWeight="bold">1</Text>
                  <Text as="span" fontSize={30} color="blue.400" fontWeight="bold">手目</Text>
                </Box>

                <Box bg="white" shadow="lg" w="full" h="full" borderRadius={10}>
                </Box>

                <Button colorScheme="blue" variant="solid" w="full" h="100px" borderRadius={10}>
                  <Text fontSize="xl" fontWeight="bold" colorScheme="blue">投了</Text>
                </Button>
              </VStack>

            </Box>

            <Box p={4} bg={"white"} shadow="lg" rounded={20} w="900px" h="full" margin={"0%"}></Box>
          </HStack>
        </AspectRatio>
      </header >
    </div >
  )
}

export default Timer