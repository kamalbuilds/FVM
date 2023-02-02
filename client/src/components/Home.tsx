import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Container,
  Flex,
  Button,
  FormHelperText,
  Input
} from '@chakra-ui/react'

const Home = () => {
  const [userName, setUserName] = useState<string>('' as string);

  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    localStorage.setItem('userName', userName);
    navigate('/products');
  };

  return (
    <>
      <Container mt="10">
        <form onSubmit={handleSubmit}>
          <FormControl>
            <FormLabel>Username</FormLabel>
            <Input onChange={(e) => setUserName(e.target.value)} />
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
  );
};

export default Home;