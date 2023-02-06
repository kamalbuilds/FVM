import React, { useState, useEffect, useContext } from 'react';
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
import { createProposal } from '../../../../configs/methods/contractMethods';
import { FormDataContext } from 'context';

const newProposal = () => {
  const [formData, setFormData] = useState<FormData>({ name: '', cid: '', dataSize: 0, dealDurationInDays: 0, dealStorageFees: 0 });
  const { formCollectionData, setFormCollectionData } = useContext<any>(FormDataContext);

  const [name, setName] = useState('');
  const [cid, setCid] = useState('');
  const [dataSize, setDataSize] = useState(0);
  const [dealDurationInDays, setDealDurationInDays] = useState(0);
  const [dealStorageFees, setDealStorageFees] = useState(0);

  const router = useRouter();
  const {data: signer } = useSigner({chainId: 3141});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const contract = useContract({
    address: DaoBountyContractAddress,
    abi: DataDaoBountyABI,
    signerOrProvider: signer
  });

  interface FormData {
  name: string;
  cid: string;
  dataSize: number;
  dealDurationInDays: number;
  dealStorageFees: number;
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (await signer?.getAddress && contract) {
        const cidInstance = new CID(cid);
        const contractProps = {
          createDataSetDealProposal: contract.createDataSetDealProposal.bind(contract),
          address: contract.address,
          abi: contract.abi,
          signerOrProvider: contract.signerOrProvider,
        };
        await createProposal({ cid: cidInstance, dataSize, dealDurationInDays, dealStorageFees }, contractProps);
        setIsSubmitting(true);
        await setFormData({
          name,
          cid,
          dataSize,
          dealDurationInDays,
          dealStorageFees
        });


        if (formCollectionData) {
          router.push('/proposalMarketPlace/proposals');
        }
      } else {
        console.error('signer not available');
      }
    } catch (error) {
      console.error(error);
    }
};


  useEffect(() => {
    if(formCollectionData.findIndex((item: any) =>
      item.name === formData.name &&
      item.cid === formData.cid &&
      item.dataSize === formData.dataSize &&
      item.dealDurationInDays === formData.dealDurationInDays &&
      item.dealStorageFees === formData.dealStorageFees
    ) === -1) {
      setFormCollectionData([...formCollectionData, formData]);
    }
  }, [isSubmitting])


  return (
    <>
      <Container mt="10">
        <Box mb={10} fontSize={28} >Add a Client Proposal</Box>
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
            <Input type="number" onChange={(e) => setDealStorageFees(parseInt(e.target.value))} required min='0.001' />
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

export default newProposal
