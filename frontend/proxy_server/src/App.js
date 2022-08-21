import './App.css';
import { AspectRatio, ChakraProvider, VStack } from '@chakra-ui/react';
import { Box, Button, Stack, HStack, RectBox } from "@chakra-ui/react";


function App() {
  return (

    <ChakraProvider>
      <div className="App">
        <header className="App-header">
          <AspectRatio w="full" ratio={16 / 9} >
            <HStack p={8} spacing={4}>
              <Box p={4} bg={"white"} shadow="lg" rounded={30} w={700} h="full" margin={"0%"}>
              </Box>
              <Box w="full" h="full" bg="green.100" >
                {/* <VStack spacing={4}>


                </VStack> */}
              </Box>
              <Box p={4} bg={"white"} shadow="lg" rounded={30} w={700} h="full" margin={"0%"}></Box>
            </HStack>
          </AspectRatio>
        </header>
      </div>
    </ChakraProvider >
  );
}

export default App;
