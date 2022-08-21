import './App.css';
import { ChakraProvider } from '@chakra-ui/react';
import { Box, Button, Stack, HStack } from "@chakra-ui/react";


function App() {
  return (
    <ChakraProvider>
      <div className="App">
        <header className="App-header">
          <HStack p={10} spacing={4}>
            <Box p={4} bg={"white"} shadow="lg" rounded="30" width={500} height={700}></Box>
            <Box p={4} bg={"white"} shadow="lg" rounded="30" width={500} height={700}></Box>
          </HStack>
        </header>
      </div>
    </ChakraProvider>
  );
}

export default App;
