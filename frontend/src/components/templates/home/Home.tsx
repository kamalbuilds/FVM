// import io from 'socket.io-client';
// import { CheckCircleIcon, SettingsIcon } from '@chakra-ui/icons';
import { Heading, VStack, List, ListIcon, ListItem } from '@chakra-ui/react';
import { io } from 'socket.io-client';

import {StorageRequestForm} from '../../modules/StorageRequestForm';
import { AddProposal, BidProposal, Proposals } from '../../temp/index';

const socket = io('http://localhost:4000', { transports: ['websocket'] });

const Home = () => {
  return (
    <Heading size="md" marginBottom={6}>
    {/* <StorageRequestForm /> */}
    <AddProposal />
    <BidProposal socket={socket} />
    <Proposals />
    </Heading>
  );
};

export default Home;
