import { Card, CardBody, CardHeader, Heading, Stack, Text } from "@chakra-ui/react";
import Link from "next/link";

const DetailsCard = ({formCollectionData, id} : any) => {

 return (
  <Card m={4} width='70%'>
   <CardHeader>
     <Heading as="h5" size="md">
       Proposal Id: {id}
     </Heading>
     <Heading as="h5" size="md">
       Proposer: {formCollectionData[id]?.name}
     </Heading>
   </CardHeader>
   <CardBody>
    <Text>
      Content Identifier: {formCollectionData[id]?.cid}
    </Text>
    <Text>
      Data size: {formCollectionData[id]?.dataSize}
    </Text>
    <Text>
      Deal Duration: {formCollectionData[id]?.dealDurationInDays} days
    </Text>
    <Text>
      Locked Funds: {formCollectionData[id]?.dealStorageFees} tFIL
    </Text>
   </CardBody>
  </Card>
 );
}

export default DetailsCard;
