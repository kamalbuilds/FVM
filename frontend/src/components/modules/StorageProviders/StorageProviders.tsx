/* eslint-disable arrow-parens */
import React, {useState, useEffect, useRef} from 'react';
import {
 Flex,
 Box,
 Heading,
 Button,
 Grid,
 Input,
} from "@chakra-ui/react";

import { getStorageProviders, getStorageProviderById , queryStorageAsk } from '../../../../pages/api/miners/miners';
import { MinerCard } from './MinerCard';
import { MinerDetailsCard } from './MinerDetailsCard';
import HTMLInputElement from 'react';

type Miners = {
 id: number,
 jsonrpc: string,
 result: string[],
}

const StorageProviders = () => {

 const [miners, setMiners] = useState<Miners[]>([]);
 const [minerDetails, setMinerDetails] = useState<Miners[]>([]);
 const [refresh, setRefresh] = useState(false);
 const [providerIDs, setProviderIds] = useState<string[]>([])
 const [searchId, setSearchId] = useState<string>();
 const [peerID, setPeerID] = useState<string>();
 const [error, setError] = useState<unknown>(null);
 const numberOfCards = 20;
  // const [minerscore, setMinerscore] = useState(0);
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

 // Handles refreshing the miners
 const handleRefresh = () => {
  setRefresh((prev) => !prev);

  const randomIds = getMultipleRandom(numberOfCards);
  setProviderIds(randomIds);
 }

 // Gets new api data and Lets us refresh the page
 const fetchMiners = async () => {
  try {
   const data = await getStorageProviders();
   setMiners(data);
  } catch(err) {
   setError(err);
  }
 }



//  useEffect(() => {
//   const fetchData = async () => {
//     try {
//       const response = await fetch(`https://api.filrep.io/api/miners?search=searchId`);
//       const data = await response.json();
//       console.log(data, "score data");
//       setMinerscore(data.miners[0].score);
//       console.log(minerscore, "score");
//     } catch (err) {
//       setError(err);
//     }
//   };

//   fetchData();
// }, [searchId]);


 // Turn object into an array
  const minerDetailsData = minerDetails ? Object.entries(minerDetails) : [];
 // Necessary conditional
  const minerDetailsExist = minerDetailsData[1]?.[1];
 // Making a deep copy of our minerDetails array
  const minerDetailsDataArrayCopy = minerDetailsExist ? JSON.parse(JSON.stringify(minerDetailsExist)) : [];
  // Creating input element reference
  const inputRef = useRef<HTMLInputElement>(null);
  // Saves input element value to state variable and passed to api call
  const askRef = useRef<HTMLInputElement>(null);
  const handleEnter = () => {
   const id = inputRef.current?.value;
   if(id) {
    setSearchId(id);
    console.log(id, "id changed to this");
   }
  }

  const handleask = async () => {
    const peerid = askRef.current?.value;
    if(peerid) {
      console.log(peerid, "peerid changed to this");
      console.log(searchId, "searchid changed to this");
     setPeerID(peerid);
    }
  }

  
  fetch('https://api.zondax.ch/fil/data/v1/hyperspace/account/info/f410ffhguuq6t2otsrcid6zq5gm6hh6kl7t5aucxr6by', {
  method: 'GET',
  headers: {
    'accept': 'application/json',
    'authorization': 'Bearer eyJhbGciOiJFUzI1NiIsImtpZCI6ImtleS1iZXJ5eC0wMDEiLCJ0eXAiOiJKV1QifQ.eyJyb2xlcyI6W10sImlzcyI6IlpvbmRheCIsImF1ZCI6WyJiZXJ5eCJdLCJleHAiOjE2NzY1NjA0NzgsImp0aSI6IkthbWFsIE5heWFuLGdlbml1c2FtYW5zaW5naEBnbWFpbC5jb20ifQ.dZnOlLu8BSbLbXixdesxlWgGCWvu2SVXsPU5z-9Kei2mpJXNIynhZ4SDVv7FOknqdiTBOjcxShz_Sd6YFnKvTg',
  },
})
  .then((response => response.json()))
  .then((data => console.log('here',data)))
 
  const fetchMinerDetails = async () => {
    try {
     if (searchId) {
      const data2 = await getStorageProviderById(searchId, undefined);
      setMinerDetails(data2 as Miners[]);
     }
    } catch (err) {
     setError(err);
    }
  };
  

 useEffect(() => {
  fetchMiners();
 }, [refresh]);

 useEffect(() => {
  fetchMinerDetails();
 }, [searchId])


 const askStorage = async () => {
  try {
    if(peerID) {
      const data3 = await queryStorageAsk(peerID , searchId);
      console.log(data3,'queryStorageAsk');
    }
  } catch(err) {
    setError(err);
  }
  }

  useEffect(() => {
    askStorage();
   }, [peerID])

   console.log("minerResults", minerResults,"providerIDS", providerIDs)
 return (
  <Flex align="center" justify="center" direction="column" >
   <Flex gap={20}>
    <Heading as="h1" size="lg" mb={8}>
     Search for Miners
    </Heading>
    <Button onClick={handleRefresh}>Refresh</Button>
   </Flex>
   <Box>
    <Grid templateColumns='repeat(5, 1fr)' gap={1}>
     {minerResults && providerIDs.map((id, index) => (
       <MinerCard id={id} key={index} error={error}  />
      ))}
    </Grid>
   </Box>
   <br/>
   <Box>
    <Heading>Search for Storage Provider</Heading>
    <Flex>
     <h3>Gets more details about a storage provider..</h3>
     <span style={{backgroundColor: 'blue'}}>(params: ID, CID)</span>
    </Flex>
    <br />
    <Flex align="center" justify="center" direction="row">
     <Box>
      <Flex>
       <Input type="text" ref={inputRef} placeholder="Enter the ID of the Storage Provider" />
       <Button style={{marginLeft: '1rem'}} type="submit" onClick={handleEnter}>Enter</Button>
      </Flex>
      {searchId?.length && (
       <MinerDetailsCard details={minerDetailsDataArrayCopy} searchId={searchId} />
      )}
     </Box>
    </Flex>
    <br/>
    <Flex align="center" justify="center" direction="row">
     <Box>
      <Flex>
       <Input type="text" ref={askRef} placeholder="Enter the peerID for storage ask" />
       <Button style={{marginLeft: '1rem'}} type="submit" onClick={handleask}>Ask</Button>
      </Flex>
      {/* {searchId?.length && (
       <MinerDetailsCard details={minerDetailsDataArrayCopy} searchId={searchId} />
      )} */}
      </Box>
      </Flex>
   </Box>
  </Flex>

  )
}

export default StorageProviders;