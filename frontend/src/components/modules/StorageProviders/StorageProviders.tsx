import React, {useState, useEffect} from 'react'
import {
 Flex,
 Box,
 Text,
 Image,
 Heading,
 Card,
 CardHeader,
 CardBody,
 CardFooter,
 Stack,
 Spinner,
 Button,
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
 const [error, setError] = useState<unknown>(null);

 const minerArray = miners ? Object.entries(miners) : [];
 // const minerResults = minerArray[1]?.[1]?.length && minerArray[1][1].result?.slice(0,20);
 const minerResults = minerArray[1];

 const handleRefresh = () => {
  setRefresh((prev) => !prev);
 }

 useEffect(() => {
  const fetchData = async () => {
      try {
          const data = await getStorageProviders();
          setMiners(data);
      } catch(err) {
          setError(err);
      }
  }

  fetchData();
}, [refresh]);

 console.log(miners);
 console.log("array:", minerArray);
 console.log("results", minerResults);
 console.log("error", error);


 const minerCard = minerResults && minerResults.map((id, index) => {
  return (
   <Card key={index} m={4}>
   <CardHeader>
     <Heading as="h5" size="md">
       Miner ID: id
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
   <Button onClick={handleRefresh}>Refresh</Button>
   <Heading as="h1" size="lg" mb={8}>
    Miners
   </Heading>
   <Box>
    {minerResults ? minerCard : <Spinner /> }
   </Box>
  </Flex>
  )
}

export default StorageProviders;