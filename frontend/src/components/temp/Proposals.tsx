import { useEffect, useState } from 'react'
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
} from '@chakra-ui/react';
import { useContract, useSigner } from 'wagmi';
import { DaoBountyContractAddress , DataDaoBountyABI  } from 'configs/constants';
import { getAccountBalance, getAccountTransactions, getDealsByCID } from '../../../pages/api/beryxClient/clientMethods';

import { fundDeal } from 'configs/methods/contractMethods';

type expectedProposalParameters = {
  name: string,
  cid: CID | string | undefined,
  dataSize: number,
  dealDurationInDays: number,
  dealStorageFees: number
}







const Proposals = () => {
  const {data: signer } = useSigner({chainId: 3141});
  const contract = useContract({
    address: DaoBountyContractAddress,
    abi: DataDaoBountyABI,
    signerOrProvider: signer
  });
  const [collection, setCollection] = useState<expectedProposalParameters[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [cid, setCid] = useState('');
  useEffect(() => {
    const newProposal = JSON.parse(sessionStorage.getItem('newProposal') || '{}');
    if (!Object.keys(newProposal).length) {return;}

    // don't add any duplicate objects
    if (collection.some((object) => JSON.stringify(object) === JSON.stringify(newProposal))) {return;}

    setCollection((prevCollection) => [...prevCollection, newProposal]);
    setLoading(false);
    sessionStorage.removeItem('newProposal');
    console.log('collection', collection);
    console.log("checking", newProposal);
  }, []);

  const handleTest = async() => {
    if(collection?.length) {
      const txHistory = await getAccountTransactions('0xCb9456Cc51789F28916fBdF11496458afAcDFe5e');
      console.log(txHistory);

    }

  }

  const handleFundButton = async(cid: any, amount: number) => {
    try {
      if (await signer?.getAddress && contract) {
        const cidInstance = new CID(cid);
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


  return (
    <>
      <VStack
        spacing={4}
        align='stretch'
      >
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
              {loading ? <CircularProgress isIndeterminate color='green.300' /> :
                collection?.length && collection.map((item, i) => (
                  <Tr key={i}>
                    <Td>{item.name}</Td>
                    <Td>{item.cid?.toString()}</Td>
                    <Td>{item.dataSize}</Td>
                    <Td>{item.dealDurationInDays}</Td>
                    <Td>{item.dealStorageFees}</Td>
                    <Td>
                      <Button colorScheme='green' onClick={() => {console.log('fund')}}>Fund</Button>
                    </Td>
                    <Td>
                      <Button colorScheme='green' onClick={() => handleFundButton(item.cid, item.dealStorageFees)}>Fund</Button>
                    </Td>
                  </Tr>
              ))}
            </Tbody>
          </Table>
        </Flex>
      </VStack>

    </>
  )
}
export default Proposals