import { StarIcon } from "@chakra-ui/icons";
import { Card, CardBody, CardHeader, Heading, Stack, Text } from "@chakra-ui/react";

type MinerCardProps = {
 id: string,
 key: number,
 error: unknown
}

const minerCard = ({id, error} : MinerCardProps) => {

 if(error) {
   return (
     <Card>
      <CardHeader>
        <Heading as="h5" size="md">
          Error Has Occurred
        </Heading>
      </CardHeader>
      <CardBody>
        <Text>error: {error as string}</Text>
      </CardBody>
    </Card>
   )
  }

 return (
  <Card m={4}>
   <CardHeader>
     <Heading as="h5" size="md">
       Miner ID: {id}
     </Heading>
   </CardHeader>
   <CardBody>
     <Text>
       Reputation Score:{" "}
       <Stack isInline>
         {[1, 2, 3, 4, 5].map((i) => (
           <StarIcon
             key={i}
             color={id ? "teal" : "gray"}
           />
         ))}
       </Stack>
     </Text>
   </CardBody>
  </Card>
 );
}

export default minerCard;