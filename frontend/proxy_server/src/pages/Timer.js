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

  const sente = <Box bg={"black"} rounded="full" w="80px" h="40px">
    <Center h='100%'>
      <Text fontSize="md" fontWeight="bold" color="white">先手</Text>
    </Center>
  </Box>;
  const gote = <Box bg={"white"} border='1px' borderColor='black' rounded="full" w="80px" h="40px">
    <Center h='100%'>
      <Text fontSize="md" fontWeight="bold" color="black">後手</Text>
    </Center>
  </Box>;

  var timerSeconds = 1 * 60;
  return (
    <div className="App">
      <header className="App-header">
        <AspectRatio w="full" ratio={16 / 9} >
          <HStack p={8} spacing={4}>
            {/* 左のプレイヤー */}
            <Box p={4} bg={"white"} shadow="2xl" rounded="30px" w="1000px" h="full" margin={"0%"}>
              <VStack h="full">
                <HStack w="full">
                  {sente}
                  <Spacer />
                </HStack>
                <Spacer />
                <Box shadow="xl" rounded=" full" padding={2}>
                  <CountdownCircleTimer
                    size={250}
                    strokeWidth={10}
                    isPlaying
                    duration={timerSeconds}
                    colors={["#5a97db", "#5a97db", "#f4d849", "#A30000"]}
                    colorsTime={[60, 20, 10, 0]}
                    onComplete={() => ({ shouldRepeat: true, delay: 1 })}
                  >
                    {renderTime}
                  </CountdownCircleTimer>
                </Box>
                <Box marginStart={10}>
                  <Text as="span" fontSize={20} color="blue.400" fontWeight="bold">考慮回数 </Text>
                  <Text as="span" fontSize={40} color="blue.400" fontWeight="bold">1</Text>
                  <Text as="span" fontSize={20} color="blue.400" fontWeight="bold">回</Text>
                </Box>
                <Spacer />
                <Button colorScheme="blue" shadow="lg" variant="outline" w="full" h="70px" borderRadius={20}>
                  <Text fontSize="2xl" fontWeight="bold" colorScheme="blue">着手</Text>
                </Button>
              </VStack>
            </Box>
            {/* 真ん中のところ */}
            <Box w="full" h="full" >
              <VStack spacing={0} h="full">
                {sente}
                <Box>
                  <Text as="span" fontSize={60} color="blue.400" fontWeight="bold">1</Text>
                  <Text as="span" fontSize={30} color="blue.400" fontWeight="bold">手目</Text>
                </Box>
                <Box bg="white" shadow="lg" borderRadius={10} padding="10px">
                  <img src={banImg} w="full" />
                </Box>
                <Box w="full">
                  <HStack marginTop={4}>
                    <Button colorScheme="blue" variant="outline" w="50%" h="70px" borderRadius={20}>
                      <Text fontSize="2xl" fontWeight="bold" colorScheme="blue">一時停止</Text>
                    </Button>
                    <Button colorScheme="blue" variant="solid" w="80%" h="70px" borderRadius={20}>
                      <Text fontSize="2xl" fontWeight="bold" colorScheme="blue">終了</Text>
                    </Button>
                  </HStack>
                </Box>

              </VStack>

            </Box>
            {/* 右のプレイヤー */}
            <Box p={4} bg={"white"} shadow="2xl" rounded="30px" w="1000px" h="full" margin={"0%"}>
              <VStack h="full">
                <HStack w="full">
                  {gote}
                  <Spacer />
                </HStack>
                <Spacer />
                <Box shadow="xl" rounded=" full" padding={2}>
                  <CountdownCircleTimer
                    size={250}
                    strokeWidth={10}
                    isPlaying
                    duration={timerSeconds}
                    colors={["#5a97db", "#5a97db", "#f4d849", "#A30000"]}
                    colorsTime={[60, 20, 10, 0]}
                    onComplete={() => ({ shouldRepeat: true, delay: 1 })}
                  >
                    {renderTime}
                  </CountdownCircleTimer>
                </Box>
                <Box marginStart={10}>
                  <Text as="span" fontSize={20} color="blue.400" fontWeight="bold">考慮回数 </Text>
                  <Text as="span" fontSize={40} color="blue.400" fontWeight="bold">1</Text>
                  <Text as="span" fontSize={20} color="blue.400" fontWeight="bold">回</Text>
                </Box>
                <Spacer />
                <Button colorScheme="blue" shadow="lg" variant="outline" w="full" h="70px" borderRadius={20}>
                  <Text fontSize="2xl" fontWeight="bold" colorScheme="blue">着手</Text>
                </Button>
              </VStack>
            </Box>
          </HStack >
        </AspectRatio >
      </header >
    </div >
  )
}

export default Timer