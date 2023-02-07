import { Box, Button, Flex, Heading, Spacer, Stack, Table, Tbody, Td, Th, Thead, Tr, VStack } from "@chakra-ui/react";
import router from "next/router";
import { useContext } from "react";

import { BidDataContext } from "context";

type BiddersTableProps = {
 id: number ,
 handleActivateButton: any;
}

const BiddersTable = ({id, handleActivateButton}: BiddersTableProps) => {

  const { BidDataList } = useContext<any>(BidDataContext);

 
  return (
   <>
     <Heading>Current Bidders: </Heading>
     <Flex mt={10}>
      <Table>
       <Thead>
        <Tr>
         <Th>Bidder Address</Th>
         <Th>Bidder Price</Th>
        </Tr>
       </Thead>
       <Tbody>
        {BidDataList?.length > 0 && BidDataList.map((item: any, i: number) => (
         <Tr key={i}>
          <Td>{item?.address}</Td>
          <Td>{item[id]?.price}</Td>
          <Stack direction='row' spacing='25px' mt='5' >
           <Button
            colorScheme='red'
            onClick={() => handleActivateButton(BidDataList.length)}
           >
            Activate
           </Button>
           <Button
            colorScheme='red'
            onClick={() => router.push('/connect')}
           >
            Connect
           </Button>
          </Stack>
         </Tr>
        ))}
       </Tbody>
      </Table>
     </Flex>
  </>
 )
}
export default BiddersTable;
