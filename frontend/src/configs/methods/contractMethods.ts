import { Abi } from 'abitype';
import CID from 'cids';
import { ethers } from 'ethers';

type createProposalProps = {
    cid: CID,
    dataSize: number,
    dealDurationInDays: number,
    dealStorageFees: number
}

type contractProps = {
  createDataSetDealProposal(cidHex: string, dataSize: number, dealDurationInDays: number, dealStorageFees: number, arg4: { value: ethers.BigNumber; gasLimit: number; maxPriorityFeePerGas: unknown; }): unknown;
  address: string,
  abi: Abi,
  signerOrProvider: unknown
}

type fundcontractProps = {
  fundDeal(cidHex: string, arg2: { value: ethers.BigNumber; gasLimit: number; maxPriorityFeePerGas: unknown; }): unknown;
  address: string,
  abi: Abi,
  signerOrProvider: unknown
}

export const createProposal = async({cid, dataSize, dealDurationInDays, dealStorageFees} : createProposalProps, contract : contractProps) => {

  try {
    const cidV1 = new CID(cid).toV1();
    const cidHexRaw = cidV1.toString('base16').substring(1);
    const cidHex = `0x00${cidHexRaw}`;
    console.log("Bytes are:", cidHex);

    if(contract) {
      await contract?.createDataSetDealProposal(cidHex, dataSize, dealDurationInDays, dealStorageFees, {
        value: ethers.utils.parseUnits(`${dealStorageFees}`),
        gasLimit: 1000000000,
        maxPriorityFeePerGas: undefined
      })
    } else {
      console.error('contract is null');
    }
  } catch(error) {
    console.error("Contract method not invoked", error);
  }

}


type fundDealProps = {
  cid: CID,
  amount: number
}

export const fundDeal = async({cid, amount}: fundDealProps, contract: fundcontractProps) => {
  try {
    const cidV1 = new CID(cid).toV1();
    const cidHexRaw = cidV1.toString('base16').substring(1);
    const cidHex = `0x00${cidHexRaw}`;

    if (contract) {
      await contract?.fundDeal(cidHex, {
        value: ethers.utils.parseEther(`${amount}`),
        gasLimit: 1000000000,
        maxPriorityFeePerGas: undefined
      })
    } else {
      console.error('contract is null');
    }
  } catch(error) {
    console.error("Funding deal failed", error);
  }
}

export const bidForDeal = async({cid, provider, price}: bidProps, contract: bidcontractProps) => {
  try {
    if (contract) {
      const cidV1 = new CID(cid).toV1();
      const cidHexRaw = cidV1.toString('base16').substring(1);
      const cidHex = `0x${cidHexRaw}`;
      await contract.bidForDeal(cidHex, provider,{
        price : ethers.utils.parseUnits(`${price}`, 'ether'),
        gasLimit: 1000000000,
        maxPriorityFeePerGas: undefined
      });
    } else {
      console.error('contract is null');
    }
  } catch (error) {
    console.error("Contract method not invoked", error);
  }
};

type bidProps = {
  cid: CID,
  provider: string,
  price: number
}

type bidcontractProps = {
  bidForDeal(cidRaw: string, provider: string, arg3: { price: ethers.BigNumber; gasLimit: number; maxPriorityFeePerGas: unknown; }): Promise<void>;
  address: string,
  abi: Abi,
  signerOrProvider: ethers.Signer | ethers.providers.Provider
}


type activateDealProps = {
  networkDealID: number
}

type activateDealContractProps = {
  activateDataSetDealBySP(networkDealID: number): Promise<void>;
  address: string,
  abi: Abi,
  signerOrProvider: ethers.Signer | ethers.providers.Provider
}

export const activateDeal = async({networkDealID}: activateDealProps, contract: activateDealContractProps) => {
  try {
    if (contract) {
      await contract.activateDataSetDealBySP(networkDealID);
    } else {
      console.error('contract is null');
    }
  } catch (error) {
    console.error("Activating deal failed", error);
  }
};