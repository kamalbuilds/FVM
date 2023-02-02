import React, { ReactNode, useEffect } from 'react'
import { Socket } from 'socket.io-client'
import {
  Box,
  Flex,
  HStack,
  Link,
  IconButton,
  useToast,
  useDisclosure,
  useColorModeValue,
} from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon, AddIcon } from '@chakra-ui/icons';
import { ClientToServerEvents, Product } from '../interfaces'
import { Link as ReachLink } from 'react-router-dom'


type NavProps = {
  socket: Socket<ClientToServerEvents>
}

const Links = ['home', 'proposals'];

const NavLink = ({ children, to }: { children: ReactNode, to: string }) => (

  <Link
    px={2}
    py={1}
    rounded={'md'}
    _hover={{
      textDecoration: 'none',
      bg: useColorModeValue('gray.200', 'gray.700'),
    }}
    as={ReachLink} to={to}>
    {children}
  </Link>
);



const NavComponent = ({ socket }: NavProps) => {
  const toast = useToast()
  useEffect(() => {
    socket.on('addResponse', (data: Product) => {
      console.log(data)
      toast({
        title: 'New product added.',
        description: `@${data.owner} added ${data.name} price $${Number(
          data.price
        ).toLocaleString()}`,
        status: 'success',
        duration: 9000,
        isClosable: true,
      })
    });


  }, [socket])

  useEffect(() => {
    socket.on('bidResponse', (data: Product) => {
      toast({
        title: 'New bidd.',
        description: `@${data.last_bidder} just bidded  $${Number(
          data.price
        ).toLocaleString()} on ${data.name}`,
        status: 'success',
        duration: 9000,
        isClosable: true,
      })
    });


  }, [socket])


  const { isOpen, onOpen, onClose } = useDisclosure();
  return (<>
    <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4}>
      <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
        <IconButton
          size={'md'}
          icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
          aria-label={'Open Menu'}
          display={{ md: 'none' }}
          onClick={isOpen ? onClose : onOpen}
        />
        <HStack spacing={8} alignItems={'center'}>
          <Box>Storage Bounty Platform</Box>
          <HStack
            as={'nav'}
            spacing={4}
            display={{ base: 'none', md: 'flex' }}>
            {Links.map((link) => (
              <NavLink key={link} to={link}>{link}</NavLink>
            ))}
          </HStack>
        </HStack>
      </Flex>

    </Box>
  </>
  );
}

export default NavComponent;
