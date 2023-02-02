import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { Socket } from 'socket.io-client'
import { ClientToServerEvents } from '../interfaces'
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Container,
  Flex,
  Box,
  Button,
  FormHelperText,
  Input
} from '@chakra-ui/react'

type BidProductProps = {
  socket: Socket<ClientToServerEvents>
}

const BidProduct = ({ socket }: BidProductProps) => {
  const { name, price } = useParams();
  //sets the default value as the current price from the Product page
  const [userInput, setUserInput] = useState<string>(price as string);
  //Destructured from the URL
  const navigate = useNavigate();
  const [error, setError] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (Number(userInput) > Number(price)) {
      socket.emit('bidProduct', {
        price: Number(userInput),
        last_bidder: localStorage.getItem('userName')!.toString(),
        name
      });
      navigate('/products');
    } else {
      setError(true);
    }
  };

  return (
    <>
      <Container mt="10">
        <Box mb={10} fontSize={28} >Place a Bid</Box>
        <form onSubmit={handleSubmit}>
          <FormControl>
            <FormLabel>Bidding Amount</FormLabel>
            {/* The error message */}
            {error && (
              <p style={{ color: 'red' }}>
                The bidding amount must be greater than {price}
              </p>
            )}
            <Input onChange={(e) => setUserInput(e.target.value)} placeholder={price} required />
          </FormControl>
          <Button
            mt={4}
            colorScheme='teal'
            type='submit'
          >
            Send
          </Button>
        </form>
      </Container>
    </>
  )
}

export default BidProduct
