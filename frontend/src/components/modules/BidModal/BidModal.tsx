import { useState } from "react";
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

import { bidForDeal } from "configs/methods/contractMethods";
import CID from "cids";

const BidModal = ({ formDataCollection, proposalId, contract, signer, setBidList} : any) => {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const [ spinner, setSpinner ] = useState(false);
  const cid = formDataCollection[proposalId]?.cid;

  const [offer, setOffer] = useState<number>(0);
  const [address, setAddress] = useState<string>("");
  // const [formData, setFormData] = useState({})

  console.log('cid', cid)
  console.log('contract', contract);
  console.log('signer', signer);
  console.log('bidForDeal', bidForDeal);

  const handleBidButton = async(cidRaw: string, provider: string, price: number) => {
    try {
      if (await signer?.getAddress && contract) {
        setSpinner(true);
        const cidInstance = new CID(cidRaw);
        if(contract) {
          const contractProps = {
            bidForDeal: contract.bidForDeal.bind(contract),
            address: contract.address,
            abi: contract.abi,
            signerOrProvider: contract.signerOrProvider,
          };
          // await setFormData({cid, provider, price});
          await bidForDeal({cidRaw, provider, price}, contractProps);
          // if(formData) {
          //   setBidList(FormData)
          // }
        } else {
          console.error('Contract is not available')
        }
      } else {
        console.error('signer not available');
      }
    } catch (error) {
      console.error(error);
    }
  }
  return (
   <div>

    {/* {data ? ( */}
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
          id="submit-bid"
          onSubmit={(event) => {
           event.preventDefault();
          }}
         >
          <Heading as='h1' size='lg' noOfLines={1}>Submit Storage Request</Heading>
          <br/>
          <FormControl>
           <FormLabel> Content Identifier </FormLabel>
           <Input readOnly name="cid" value={cid} type="string" min='1' placeholder={cid}/>

           <FormLabel>Your wallet address?</FormLabel>
            <Input
              type="string"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />

           <FormLabel>Your offer</FormLabel>
           <Input
              type="number"
              min="1"
              placeholder="Your offer to proposer in tFIL"
              value={offer}
              onChange={(e) => setOffer(parseInt(e.target.value))}
            />


           <FormHelperText>
            The available Storage Providers will accept your storage request
           </FormHelperText>
           <FormHelperText>It may take a second for your request to post to the network..</FormHelperText>
          </FormControl>
         </form>
        </ModalBody>

        <ModalFooter>
         <Button type="submit" form="submit-bid" onClick={() => handleBidButton(cid, address, offer )}>
          {!spinner ? "Submit Request" : <Spinner/>}

         </Button>
        </ModalFooter>
       </ModalContent>
     </Modal>
    </>
    {/* ) : ''} */}
   </div>
  );
};

export default BidModal;
