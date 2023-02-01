import { Box, Card, CardBody, Flex, Text } from "@chakra-ui/react";

type CardDetailsProps = {
 details: {
  Owner: string;
  Worker: string;
  NewWorker: string;
  ControlAddresses: null | any;
  WorkerChangeEpoch: number;
  PeerId: string;
  Multiaddrs: null | any;
  WindowPoStProofType: number;
  SectorSize: number;
  WindowPoStPartitionSectors: number;
  ConsensusFaultElapsed: number;
  Beneficiary: string;
  BeneficiaryTerm: {
   Quota: string;
   UsedQuota: string;
   Expiration: number;
  };
  PendingBeneficiaryTerm: null | any;
 },
 searchId: string
};

const MinerDetailsCard = ({ details, searchId }: CardDetailsProps) => {
 return (
  <>
   {searchId && (
    <Box m={4}>
     <Flex direction="column">
      <Card m={4}>
       <CardBody>
        <Text fontWeight="bold">Owner:</Text>
        <Text>{details?.Owner}</Text>
        <Text fontWeight="bold">Worker:</Text>
        <Text>{details?.Worker}</Text>
        <Text fontWeight="bold">New Worker:</Text>
        <Text>{details?.NewWorker}</Text>
        <Text fontWeight="bold">Control Addresses:</Text>
        <Text>{details?.ControlAddresses}</Text>
        <Text fontWeight="bold">Worker Change Epoch:</Text>
        <Text>{details?.WorkerChangeEpoch}</Text>
        <Text fontWeight="bold">Peer ID:</Text>
        <Text>{details?.PeerId}</Text>
        <Text fontWeight="bold">Multiaddrs:</Text>
        <Text>{details?.Multiaddrs}</Text>
        <Text fontWeight="bold">Window PoSt Proof Type:</Text>
        <Text>{details?.WindowPoStProofType}</Text>
        <Text fontWeight="bold">Sector Size:</Text>
        <Text>{details?.SectorSize}</Text>
        <Text fontWeight="bold">Window PoSt Partition Sectors:</Text>
        <Text>{details?.WindowPoStPartitionSectors}</Text>
        <Text fontWeight="bold">Consensus Fault Elapsed:</Text>
        <Text>{details?.ConsensusFaultElapsed}</Text>
        <Text fontWeight="bold">Beneficiary:</Text>
        <Text>{details?.Beneficiary}</Text>
        <Text fontWeight="bold">Beneficiary Term:</Text>
        <Text>Quota: {details?.BeneficiaryTerm?.Quota}</Text>
        <Text>Used Quota: {details?.BeneficiaryTerm?.UsedQuota}</Text>
        <Text>Expiration: {details?.BeneficiaryTerm?.Expiration}</Text>
        <Text fontWeight="bold">Pending Beneficiary Term:</Text>
        <Text>{details?.PendingBeneficiaryTerm}</Text>
       </CardBody>
      </Card>
     </Flex>
    </Box>
   )}
  </>
 );
};

export default MinerDetailsCard;