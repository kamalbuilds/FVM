import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Socket } from 'socket.io-client'
import { ClientToServerEvents } from '../interfaces'
import {
  FormControl,
  FormLabel,
  Container,
  Box,
  Button,
  Input
} from '@chakra-ui/react'

type AddProposalProps = {
  socket: Socket<ClientToServerEvents>
}

const AddProposal = ({ socket }: AddProposalProps) => {
  const [name, setName] = useState<string>('');
  const [price, setPrice] = useState<number>(0);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    socket.emit('addProduct', {
      name,
      price,
      owner: localStorage.getItem('userName')!.toString(),
    });
    navigate('/Proposals');
  };
  return (
    <>

      <Container mt="10">
        <Box mb={10} fontSize={28} >Add a Proposal</Box>
        <form onSubmit={handleSubmit}>
          <FormControl>
            <FormLabel>Client Address</FormLabel>
            <Input onChange={(e) => setName(e.target.value)} />
          </FormControl>
          <FormControl>
            <FormLabel>CID of data to be stored</FormLabel>
            <Input onChange={(e) => setName(e.target.value)} />
          </FormControl>
          <FormControl>
            <FormLabel>Starting price</FormLabel>
            <Input type="number" onChange={(e) => setPrice(parseInt(e.target.value))} />
          </FormControl>
          <Button
            mt={4}
            colorScheme='teal'
            type='submit'
          >
            Submit
          </Button>
        </form>
      </Container>
    </>
  )
}

export default AddProposal
