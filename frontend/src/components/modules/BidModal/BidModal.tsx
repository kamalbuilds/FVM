import { useContext, useEffect, useState } from "react";
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
import { BidDataContext } from "context/bidDataContext";

interface FormData {
  cid: string | CID,
  address: string,
  offer: number,
}

const BidModal = ({ formDataCollection, proposalId, contract, signer} : any) => {
  const { BidDataList, setBidDataList } = useContext<any>(BidDataContext);
  const { isOpen, onClose, onOpen } = useDisclosure();
  const [ spinner, setSpinner ] = useState(false);
  const cid = formDataCollection[proposalId]?.cid;

  const [offer, setOffer] = useState<number>(0);
  const [address, setAddress] = useState<string>("");
  const [formData, setFormData] = useState<FormData>({
    cid: '', address: '', offer: 0
  });
  const handleBidButton = async(cidRaw: CID, provider: string, price: number) => {
    try {
      if (await signer?.getAddress && contract) {
        const cidInstance = new CID(cidRaw);
        if(contract) {
          const contractProps = {
            bidForDeal: contract.bidForDeal.bind(contract),
            address: contract.address,
            abi: contract.abi,
            signerOrProvider: contract.signerOrProvider,
          };
          await setFormData({cid, address, offer});
          setBidDataList([...BidDataList, formData]);
          console.log('Biddatalist' , BidDataList);

          await bidForDeal({cid : cidInstance, provider, price}, contractProps);
     
          setSpinner(true);
          

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
          <Heading as='h1' size='lg' noOfLines={1}>Submit Proposal Bid </Heading>
          <br/>
          <FormControl>
           <FormLabel> Content Identifier </FormLabel>
           <Input readOnly name="cid" value={cid} type="string" placeholder={cid}/>

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
              Place your bid on this storage proposal
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
