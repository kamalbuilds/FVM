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
    <p>Looking for a Storage Provider to host your data on Filecoin? Click below, fill out the form and wait for your request to be accepted!</p>
    <br/>

    {data ? (
    <>
     <Button onClick={onOpen}>Request Storage</Button>
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
           <FormLabel>Amount of data to be stored in (mb)?</FormLabel>
           <Input type="number" placeholder="Enter your desired data storage size"/>

           <FormLabel>What you're willing to pay in Filecoin tokens?</FormLabel>
           <Input type="number" placeholder="Your price per mb" />

           <FormLabel>How long do you wish to store the Data?</FormLabel>
           <Input type="date" />

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
