import { Button, Card, CardBody, CardFooter, CardHeader, Heading, Stack, Text } from "@chakra-ui/react";
import Link from "next/link";

const proposalCard = ({formCollectionData, id} : any) => {
  const {name, cid, dataSize, dealDurationInDays, dealStorageFees} = formCollectionData;
 return (
  <Card m={4} width='50%'>
   <CardHeader>
     <Heading as="h4" size="lg">
       Proposer: {name}
     </Heading>
     <Heading as="h5" size="md">
      CID: {cid}
     </Heading>
   </CardHeader>
   <CardBody>
    <Text>
      Data size: {dataSize}
    </Text>
    <Text>
      Deal Duration: {dealDurationInDays} days
    </Text>
    <Text>
      Locked Funds: {dealStorageFees} tFIL

    </Text>
   </CardBody>
   <CardFooter>
    <Link href="/proposalMarketPlace/proposalDetails/[id]" as={`/proposalMarketPlace/proposalDetails/${id}`}>
      <Button>See more details</Button>
    </Link>
   </CardFooter>
  </Card>
 );
}

export default proposalCard;