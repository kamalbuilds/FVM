import React, { useState, useEffect } from 'react';
import CID from 'cids';
import { useRouter } from 'next/router';
import { useContract, useSigner } from 'wagmi';
import {
  FormControl,
  FormLabel,
  Container,
  Box,
  Button,
  Input
} from '@chakra-ui/react';

import { DaoBountyContractAddress, DataDaoBountyABI } from 'configs/constants';
import { createProposal } from '../../configs/methods/contractMethods';


const AddProposal = () => {
  const [formData, setFormData] = useState({});

  const [name, setName] = useState('');
  const [cid, setCid] = useState('');
  const [dataSize, setDataSize] = useState(0);
  const [dealDurationInDays, setDealDurationInDays] = useState(0);
  const [dealStorageFees, setDealStorageFees] = useState(0);

  const router = useRouter();
  const {data: signer } = useSigner({chainId: 3141});

  const contract = useContract({
    address: DaoBountyContractAddress,
    abi: DataDaoBountyABI,
    signerOrProvider: signer
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (await signer?.getAddress) {
        const cidInstance = new CID(cid);
        await createProposal({ cid: cidInstance, dataSize, dealDurationInDays, dealStorageFees }, contract);

        await setFormData({
          name,
          cid,
          dataSize,
          dealDurationInDays,
          dealStorageFees
        });
        if (formData?.length) {
          router.push('/proposalMarketPlace');
        }
      } else {
        console.error('signer not available');
      }
    } catch (error) {
      console.error(error);
    }
};


  useEffect(() => {
    const stringifiedFormData = JSON.stringify(formData);
    sessionStorage.setItem('newProposal', stringifiedFormData);
  }, [formData])

  console.log("formData", formData)
  return (
    <>
      <Container mt="10">
        <Box mb={10} fontSize={28} >Add a Proposal</Box>
        <form onSubmit={handleSubmit}>
          <FormControl>
            <FormLabel>Name of the Proposer</FormLabel>
            <Input onChange={(e) => setName(e.target.value)} required />
          </FormControl>
          <FormControl>
            <FormLabel>CID of data to be stored</FormLabel>
            <Input onChange={(e) => setCid(e.target.value)} required />
          </FormControl>
          <FormControl>
            <FormLabel>Size of data to be stored (in bytes)</FormLabel>
            <Input type="number" onChange={(e) => setDataSize(parseInt(e.target.value))} required />
          </FormControl>
          <FormControl>
            <FormLabel>Duration of storage deal (in days)</FormLabel>
            <Input type="number" onChange={(e) => setDealDurationInDays(parseInt(e.target.value))} required />
          </FormControl>
          <FormControl>
            <FormLabel>Storage fees for the deal (in tFIL)</FormLabel>
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
