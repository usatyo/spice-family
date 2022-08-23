import { AspectRatio, ChakraProvider, Spacer, VStack } from '@chakra-ui/react';
import { Box, Button, Stack, HStack, Flex, Text, Center } from "@chakra-ui/react";
import { CountdownCircleTimer } from 'react-countdown-circle-timer'
import './../App.css';
import banImg from './../images/ban.png';

const renderTime = ({ remainingTime }) => {
  const minutes = Math.floor(remainingTime / 60)
  const seconds = remainingTime % 60
  const padMin = ('00' + minutes).slice(-2);
  const padSec = ('00' + seconds).slice(-2);
  return (
    <div className="timer">
      <div className="value">{`${padMin}:${padSec}`}</div>
    </div>
  );
}


const Timer = () => {

  const sente = <Box bg={"black"} shadow="lg" rounded="full" w="80px" h="40px">
    <Center h='100%'>
      <Text fontSize="md" fontWeight="bold" color="white">先手</Text>
    </Center>
  </Box>;
  var timerSeconds = 40 * 60;
  return (
    <div className="App">
      <header className="App-header">
        <AspectRatio w="full" ratio={16 / 9} >
          <HStack p={8} spacing={4}>
            <Box p={4} bg={"white"} shadow="lg" rounded="20px" w="1000px" h="full" margin={"0%"}>
              <VStack h="full">
                <HStack w="full">
                  {sente}
                  <Spacer />
                </HStack>
                <Spacer />
                <Box>
                  <CountdownCircleTimer
                    isPlaying
                    duration={timerSeconds}
                    colors={["#004777", "#F7B801", "#A30000", "#A30000"]}
                    colorsTime={[10, 6, 3, 0]}
                    onComplete={() => ({ shouldRepeat: true, delay: 1 })}
                  >
                    {renderTime}
                  </CountdownCircleTimer>
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

                <Box bg="white" shadow="lg" borderRadius={10} padding="10px">
                  <img src={banImg} w="full" />
                </Box>

                <Button colorScheme="blue" variant="solid" w="full" h="100px" borderRadius={10}>
                  <Text fontSize="xl" fontWeight="bold" colorScheme="blue">投了</Text>
                </Button>
              </VStack>

            </Box>

            <Box p={4} bg={"white"} shadow="lg" rounded={20} w="1000px" h="full" margin={"0%"}></Box>
          </HStack>
        </AspectRatio>
      </header >
    </div >
  )
}

export default Timer