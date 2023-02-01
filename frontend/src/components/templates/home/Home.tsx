import { CheckCircleIcon, SettingsIcon } from '@chakra-ui/icons';
import { Heading, VStack, List, ListIcon, ListItem } from '@chakra-ui/react';

import {StorageRequestForm} from '../../modules/StorageRequestForm';

const Home = () => {
  return (
    <Heading size="md" marginBottom={6}>
    <StorageRequestForm />
    </Heading>
  );
};

export default Home;
