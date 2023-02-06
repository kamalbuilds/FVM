import { useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/router';
import { useContract, useSigner } from 'wagmi';
import CID from 'cids';
import {
  CircularProgress,
  Button,
  VStack,
  Center,
  Flex,
  Spacer,
  Container,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Heading,
  Box
} from '@chakra-ui/react'

import { FormDataContext } from 'context';
import { Default } from 'components/layouts/Default';
import { fundDeal } from 'configs/methods/contractMethods';
import DetailCard from './DetailCard';
// import { getAccountBalance, getAccountTransactions, getDealsByCID } from '../../api/beryxClient/clientMethods';
import { DaoBountyContractAddress, DataDaoBountyABI } from 'configs/constants';

type expectedProposalParameters = {
  name: string,
  cid: CID | string | undefined,
  dataSize: number,
  dealDurationInDays: number,
  dealStorageFees: number
}

const ProposalDetails = () => {
  const router = useRouter();
  const { id } = router.query;
  console.log(id);

  //convert id to number
  const proposalId = Number(id);
  const {data: signer } = useSigner({chainId: 3141});

  const { formCollectionData } = useContext<any>(FormDataContext);
  const { cid, dealStoragefees} = formCollectionData;
  console.log(formCollectionData , cid , dealStoragefees);



  const Contract = useContract({
    address: DaoBountyContractAddress,
    abi: DataDaoBountyABI,
    signerOrProvider: signer
  });

  const handleFundButton = async(contentIdentifier: any, amount: number) => {
    try {
      if (await signer?.getAddress && Contract) {
        const cidInstance = new CID(contentIdentifier);
        const contractProps = {
          fundDeal: Contract.fundDeal.bind(Contract),
          address: Contract.address,
          abi: Contract.abi,
          signerOrProvider: Contract.signerOrProvider,
        };
        await fundDeal({cid : cidInstance, amount}, contractProps);

      } else {
        console.error('signer not available');
      }
    } catch (error) {
      console.error(error);
    }

  }


  const handleBid = () => {
    console.log('bid')
  }

  return (
    <>
    {formCollectionData?.length > 0 && (
      <Default pageName={`Proposal: ${id}`} >
        <Box mt={4} mb={4}>
          <Flex alignItems='center' flexDirection='column'>
            <DetailCard formCollectionData={formCollectionData} id={id} />
            <Flex mt={4} flexDirection='row'>
                
                <Button
                  colorScheme='green'
                  onClick={() => handleFundButton(formCollectionData[proposalId]?.cid, formCollectionData[proposalId]?.dealStorageFees)}
                >
                  Fund
                </Button>
                <Button colorScheme='green' onClick={handleBid}>Bid</Button>
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
                  <Th>Name</Th>
                  <Th>CID</Th>
                  <Th>Data Size</Th>
                  <Th>Deal duration Proposed</Th>
                  <Th>Locked Funds</Th>
                </Tr>
              </Thead>
              {/* Data for display, we will later get it from the server */}
              <Tbody>
                {formCollectionData?.map((item: expectedProposalParameters, i: number) => (
                <Tr key={i}>
                  <Td>{}</Td>
                  <Td>{}</Td>
                  <Td>{}</Td>
                  <Td>{}</Td>
                  <Td>{}</Td>
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