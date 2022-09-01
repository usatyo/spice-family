import { Button, FormControl, FormLabel, Input, useDisclosure, Image, VStack, HStack, Stack, Box, Text, Center } from "@chakra-ui/react";
import React, { useState } from 'react';
import TimerSvg from '../assets/timer.svg'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
} from '@chakra-ui/react'

import '../styles/modal.scss'
import { TriangleUp, TriangleDown } from './Triangle';

function MyModal() {
    const { isOpen, onOpen, onClose } = useDisclosure()

    const initialRef = React.useRef(null)
    const finalRef = React.useRef(null)

    // const [count_hour, setCount] = useState("00");
    // const [count_minuit, setCount] = useState("00");
    // const [count_second, setCount] = useState("00");

    return (
        <>
            <Button onClick={onOpen} p={4} bg={"white"} shadow="lg" rounded="20px" w="120px" h="120px">
                <Image src={TimerSvg} h={75} />
            </Button>

            <Modal closeOnOverlayClick={false} initialFocusRef={initialRef}
                finalFocusRef={finalRef} isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent className={"modal-content"}>
                    <ModalBody pb={6}>
                        <VStack>
                            <VStack>
                                <HStack>
                                    <TriangleUp />
                                    <TriangleUp />
                                    <TriangleUp />
                                </HStack>
                                <Box className={"timer-rectangle"}>
                                    <Center>
                                        <HStack>
                                            <Text className={"hour"}>00</Text>
                                            <Text className={"colon"}>:</Text>
                                            <Text className={"minuit"}>00</Text>
                                            <Text className={"colon"}>:</Text>
                                            <Text className={"second"}>00</Text>
                                        </HStack>
                                    </Center>
                                </Box>
                                <HStack>
                                    <TriangleDown />
                                    <TriangleDown />
                                    <TriangleDown />
                                </HStack>
                            </VStack>
                            <HStack>
                                <FormControl className={"form-control"}>
                                    <FormLabel>先手 黒</FormLabel>
                                    <Input ref={initialRef} placeholder='名前' />
                                </FormControl>

                                <FormControl className={"form-control"}>
                                    <FormLabel>後手 白</FormLabel>
                                    <Input placeholder='名前' />
                                </FormControl>
                            </HStack>
                        </VStack>
                    </ModalBody>

                    <ModalFooter>
                        <Button className={"btn-start"} mr={3}>Start</Button>
                        <Button className={"btn-cancel"} onClick={onClose}>Cancel</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default MyModal