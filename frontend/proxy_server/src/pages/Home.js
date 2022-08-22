import { AspectRatio, ChakraProvider, Spacer, VStack } from '@chakra-ui/react';
import { Box, Button, Stack, HStack, Flex, Text, Center, Image } from "@chakra-ui/react";
import TimerSvg from '../assets/timer.svg'


const Home = () => {
    return (
        <div className="App" >
            <header className="App-header">
                <VStack ml={100} mt={50}>
                    <HStack>
                        <Button p={4} bg={"white"} shadow="lg" rounded="20px" w="120px" h="120px">
                            <Image src={TimerSvg} h={75}></Image>
                        </Button>
                        <Box pl={270} pr={230} color={'#59A4CB'} fontSize="7xl" fontWeight="bold" >プロ棋士サーバ</Box>
                        <Spacer></Spacer>
                        <Box pt={2} pl={5} bg={"white"} color={"black"} fontSize={20} textAlign={"left"} shadow="lg" rounded="10px" w="180px" h="50px">チーム別</Box>
                    </HStack>
                    <Stack>aaa</Stack>
                </VStack>
            </header>
        </div >
    )
}

export default Home