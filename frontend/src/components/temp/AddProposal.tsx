import React, { useState } from 'react';
import { useRouter } from 'next/router'
import { useContract, useSigner } from 'wagmi';
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
import { createProposal } from '../../configs/methods/contractMethods';

import CID from 'cids';
import { DaoBountyContractAddress, DataDaoBountyABI } from 'configs/constants';

// type AddProposalProps = {
//   socket: Socket<ClientToServerEvents>
// }

const AddProposal = () => {

  const [cid, setCid] = useState('');
  const [size, setSize] = useState(0);
  const [dealDurationInDays, setDealDurationInDays] = useState(0);
  const [dealStorageFees, setDealStorageFees] = useState(0);

  const router = useRouter();


  const {data: signer } = useSigner({chainId: 3141});
  console.log("signer:", signer);

  const contract = useContract({
    address: DaoBountyContractAddress,
    abi: DataDaoBountyABI,
    signerOrProvider: signer
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // socket.emit('addProduct', {
    //   owner: localStorage.getItem('userName')!.toString(),
    //   name: undefined
    // });

    if(await signer?.getAddress) {

      const cidInstance = new CID(cid);
      await createProposal({ cid: cidInstance, size, dealDurationInDays, dealStorageFees }, signer, contract);

      // router.push('/Proposals');
    } else {
      console.error('signer not available')
    }
  };
  return (
    <>
      <Container mt="10">
        <Box mb={10} fontSize={28} >Add a Proposal</Box>
        <form onSubmit={handleSubmit}>
          <FormControl>
            <FormLabel>CID of data to be stored</FormLabel>
            <Input onChange={(e) => setCid(e.target.value)} required />
          </FormControl>
          <FormControl>
            <FormLabel>Size of data to be stored (in bytes)</FormLabel>
            <Input type="number" onChange={(e) => setSize(parseInt(e.target.value))} required />
          </FormControl>
          <FormControl>
            <FormLabel>Duration of storage deal (in days)</FormLabel>
            <Input type="number" onChange={(e) => setDealDurationInDays(parseInt(e.target.value))} required />
          </FormControl>
          <FormControl>
            <FormLabel>Storage fees for the deal (in wei)</FormLabel>
            <Input type="number" onChange={(e) => setDealStorageFees(parseInt(e.target.value))} required min='1' />
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
