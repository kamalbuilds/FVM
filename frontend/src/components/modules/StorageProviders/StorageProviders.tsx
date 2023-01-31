import React, {useState, useEffect} from 'react'
import {
 Flex,
 Box,
 Text,
 Heading,
 Card,
 CardHeader,
 CardBody,
 Stack,
 Spinner,
 Button,
 Grid,
} from "@chakra-ui/react";
import { StarIcon } from '@chakra-ui/icons';

import { getStorageProviders } from '../../../../pages/api/miners/miners';

type Miners = {
 id: number,
 jsonrpc: string,
 result: string[],
}

const StorageProviders = () => {
 const [miners, setMiners] = useState<Miners[]>([]);
 const [refresh, setRefresh] = useState(false);
 const [providerIDs, setProviderIds] = useState<string[]>([])
 const [error, setError] = useState<unknown>(null);
 const numberOfCards = 20;

 // Turn state object with stored api object into an array
 const minerArray = miners ? Object.entries(miners) : [];

 // Necessary Conditional check to ensure data is there
 const minerResults = minerArray[1]?.[1];

 // Make a deep copy of the array but only the property 'results' and its value are needed (we get that from minerResults)
 const minerArrayCopy = minerResults ? JSON.parse(JSON.stringify(minerResults)) : [];

 // Returns an array that has random id's
 const getMultipleRandom = (num: number) => {
  const shuffled = [...minerArrayCopy].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, num);
 }

 const handleRefresh = () => {
  setRefresh((prev) => !prev);

  const randomIds = getMultipleRandom(numberOfCards);
  setProviderIds(randomIds);
 }

 // Gets new api data and Lets us refresh the page
 const fetchData = async () => {
  try {
   const data = await getStorageProviders();
   setMiners(data);
  } catch(err) {
   setError(err);
  }
 }

 useEffect(() => {
  fetchData();
 }, [refresh]);

 const minerCard = minerResults && providerIDs.map((id: string, index: number) => {

  if(error) {
   console.log("error:", error);
  }

  return (
   <Card key={index} m={4}>
    <CardHeader>
      <Heading as="h5" size="md">
        Miner ID: {id}
      </Heading>
    </CardHeader>
    <CardBody>
      <Text>
        Reputation Score:{" "}
        <Stack isInline>
          {[1, 2, 3, 4, 5].map((i) => (
            <StarIcon
              key={i}
              color={id ? "teal" : "gray"}
            />
          ))}
        </Stack>
      </Text>
    </CardBody>
   </Card>
  );
 })

 return (
  <Flex align="center" justify="center" direction="column" >
   <Flex gap={20}>
    <Heading as="h1" size="lg" mb={8}>
     Miners
    </Heading>
    <Button onClick={handleRefresh}>Refresh</Button>
   </Flex>
   <Box>
    <Grid templateColumns='repeat(5, 1fr)' gap={1}>
     {minerResults ? minerCard : <Spinner /> }
    </Grid>
   </Box>
  </Flex>
  )
}

export default StorageProviders;