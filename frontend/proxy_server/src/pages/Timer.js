import { AspectRatio, ChakraProvider, Spacer, VStack } from '@chakra-ui/react';
import { Box, Button, Stack, HStack, Flex, Text, Center } from "@chakra-ui/react";

const Timer = () => {
    return (
        <div className="App">
          <header className="App-header">
            <AspectRatio w="full" ratio={16 / 9} >
              <HStack p={8} spacing={4}>
                <Box p={4} bg={"white"} shadow="lg" rounded="20px" w="700px" h="full" margin={"0%"}>
                  <VStack h="full">
                    <HStack w="full">
                      <Box bg={"black"} shadow="lg" rounded="full" w="70px" h="30px" >
                        <Center h='100%'>
                          <Text fontSize="md" fontWeight="bold" color="white">先手</Text>
                        </Center>
                      </Box>
                      <Spacer />
                    </HStack>
                    <Spacer />
                    <Box>
                      <Text fontSize="xl" fontWeight="bold" color="black">ここに時計</Text>
                    </Box>
                    <Spacer />
                    <Button colorScheme="blue" variant="outline" w="full" borderRadius={10}>
                      <Text fontSize="xl" fontWeight="bold" colorScheme="blue">着手</Text>
                    </Button>
                  </VStack>
                </Box>
                <Box w="full" h="full" bg="green.100" >
                  {/* <VStack spacing={4}>
  
  
                  </VStack> */}
                </Box>
                <Box p={4} bg={"white"} shadow="lg" rounded={20} w={700} h="full" margin={"0%"}></Box>
              </HStack>
            </AspectRatio>
          </header>
        </div >
    )
}

export default Timer