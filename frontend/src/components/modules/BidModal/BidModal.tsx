import {
 Modal,
 ModalOverlay,
 ModalContent,
 ModalHeader,
 ModalCloseButton,
 ModalBody,
 FormControl,
 FormLabel,
 FormHelperText,
 Input,
 ModalFooter,
 Button,
 useDisclosure,
 Heading,
 Spinner,
} from "@chakra-ui/react";
import { useSession } from 'next-auth/react';
import { useState } from "react";

const StorageRequestForm = () => {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const { data } = useSession();
  const [ spinner, setSpinner ] = useState(false);

  const handleSubmit = () => {
   console.log("submitted");
   setSpinner(true);

   setTimeout(() => {
    setSpinner(false)
   }, 5000)

  }
  return (
   <div>

    {data ? (
    <>
     <Button colorScheme='green' onClick={onOpen}>Bid</Button>
     <Modal
      isOpen={isOpen}
      onClose={onClose}
      blockScrollOnMount={false}
      isCentered
      motionPreset="slideInBottom"
      >
       <ModalOverlay />
       <ModalContent>
        <ModalHeader>
         <ModalCloseButton />
        </ModalHeader>

        <ModalBody>
         <form
          id="submit-storage-request"
          onSubmit={(event) => {
           event.preventDefault();
          }}
         >
          <Heading as='h1' size='lg' noOfLines={1}>Submit Storage Request</Heading>
          <br/>
          <FormControl>
           <FormLabel> Desired Storage Size? (in megaBytes) </FormLabel>
           <Input type="number" min='1' placeholder="Enter your desired data storage size"/>

           <FormLabel>What you're willing to pay in FIL?</FormLabel>
           <Input type="number" min='10' placeholder="Your price per mb" />

           <FormLabel>How long do you wish to store the Data? (In days) </FormLabel>
           <Input type="number" max='365' min='180' />

           <FormHelperText>
            The available Storage Providers will accept your storage request
           </FormHelperText>
           <FormHelperText>It may take a second for your request to post to the network..</FormHelperText>
          </FormControl>
         </form>
        </ModalBody>

        <ModalFooter>
         <Button type="submit" form="submit-storage-request" onClick={handleSubmit}>
          {!spinner ? "Submit Request" : <Spinner/>}

         </Button>
        </ModalFooter>
       </ModalContent>
     </Modal>
    </>
    ) : ''}
   </div>
  );
};

export default StorageRequestForm;
