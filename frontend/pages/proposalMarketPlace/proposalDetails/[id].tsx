import { useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/router';
import { useContract, useSigner } from 'wagmi';
import CID from 'cids';
import {
  Button,
  VStack,
  Flex,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Heading,
  Box,
  Stack
} from '@chakra-ui/react';
import React from "react";

import { FormDataContext, BidDataContext } from 'context';
import { Default } from 'components/layouts/Default';
import { fundDeal , activateDeal } from 'configs/methods/contractMethods';
import DetailCard from '../../../src/components/modules/ProposalDetailCard/DetailCard';
import { DaoBountyContractAddress, DataDaoBountyABI } from 'configs/constants';
import { BidModal } from 'components/modules/BidModal';

type bidProps = {
  address: string,
  price: number
}

const ProposalDetails = () => {
  const router = useRouter();
  const { id } = router.query;

  //convert id to number
  const proposalId = Number(id);
  const {data: signer } = useSigner({chainId: 3141});

  const { formCollectionData } = useContext<any>(FormDataContext);
  // const { cid, dealStoragefees} = formCollectionData;

  const { bidDataList } = useContext<any>(BidDataContext);


  const contract = useContract({
    address: DaoBountyContractAddress,
    abi: DataDaoBountyABI,
    signerOrProvider: signer
  });

  const handleFundButton = async(contentIdentifier: any, amount: number) => {
    try {
      if (await signer?.getAddress && contract) {
        const cidInstance = new CID(contentIdentifier);
        const contractProps = {
          fundDeal: contract.fundDeal.bind(contract),
          address: contract.address,
          abi: contract.abi,
          signerOrProvider: contract.signerOrProvider,
        };
        await fundDeal({cid : cidInstance, amount}, contractProps);

      } else {
        console.error('signer not available');
      }
    } catch (error) {
      console.error(error);
    }
  }

  const handleActivateButton = async(dealid : number) => {
    try {
      if (await signer?.getAddress && contract) {
        const contractProps = {
          activateDataSetDealBySP: contract.fundDeal.bind(contract),
          address: contract.address,
          abi: contract.abi,
          signerOrProvider: contract.signerOrProvider,
        };
        await activateDeal({networkDealID : dealid}, contractProps);

      } else {
        console.error('signer not available');
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
    {formCollectionData?.length > 0 && (
      <Default pageName={`Proposal: ${id}`} >
        <Box mt={4} mb={4}>
          <Flex alignItems='center' flexDirection='column'>
            <DetailCard formCollectionData={formCollectionData} id={id} />
            <Flex mt={4} flexDirection='row'>
              <Stack direction='row' spacing='25px'>
                <Button
                  colorScheme='green'
                  onClick={() => handleFundButton(formCollectionData[proposalId]?.cid, formCollectionData[proposalId]?.dealStorageFees)}
                >
                  Fund
                </Button>
                <BidModal formDataCollection={formCollectionData} signer={signer} contract={contract} proposalId={proposalId} />
              </Stack>
            </Flex>
          </Flex>
        </Box>
        <VStack
          spacing={4}
          align='stretch'
        >
          <Heading>Current Bidders: </Heading>
          <Flex mt={10}>
            <Table>
              <Thead>
                <Tr>
                  <Th>Bidder Address</Th>
                  <Th>Bidder Price</Th>
                </Tr>
              </Thead>
              {/* Data for display, we will later get it from the server */}
              <Tbody>
                {bidDataList?.length > 0 && bidDataList.map((item: any, i: number) => (
                <Tr key={i}>
                  <Td>{item?.address}</Td>
                  <Td>{item?.price}</Td>
                  <Button
                  colorScheme='red'
                  onClick={() => handleActivateButton(12343)}
                  >
                    Activate
                  </Button>
                  <Button
                  colorScheme='red'
                  onClick={() => router.push('/connect')}
                  >
                    Connect
                  </Button>
                </Tr>
                ))}
              </Tbody>
            </Table>
          </Flex>
        </VStack>
      </Default>
    )}
  </>
  )
}
export default ProposalDetails;
