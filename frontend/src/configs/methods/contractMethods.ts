
import { FetchSignerResult } from '@wagmi/core';
import { Abi } from 'abitype';
import CID from 'cids';
import { ethers } from 'ethers';

type createProposalProps = {
    cid: CID,
    size: number,
    dealDurationInDays: number,
    dealStorageFees: number
}

type contractProps = {
  createDataSetDealProposal(cidHex: string, size: number, dealDurationInDays: number, dealStorageFees: number, arg4: { value: ethers.BigNumber; gasLimit: number; maxPriorityFeePerGas: unknown; }): unknown;
  address: string,
  abi: Abi,
  signerOrProvider: unknown
}

export const createProposal = async({cid, size, dealDurationInDays, dealStorageFees} : createProposalProps, signer: FetchSignerResult, contract : contractProps) => {

  try {
    const callRpc = async (method: string, params: undefined) => {
      try {
        const options = {
          method: "POST",
          url: "https://wss.hyperspace.node.glif.io/apigw/lotus/rpc/v1",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            jsonrpc: "2.0",
            method,
            params,
            id: 1,
          }),
        };
        const res = await fetch(options.url);
        return JSON.parse(await res.text()).result;
      } catch(error) {
        console.error("JSON failed to parse: ", error)
      }
    }

    const cidV1 = new CID(cid).toV1();
    const cidHexRaw = cidV1.toString('base16').substring(1);
    const cidHex = `0x00${cidHexRaw}`;
    console.log("Bytes are:", cidHex);

    const priorityFee = await callRpc("eth_maxPriorityFeePerGas ", undefined)

    if(contract) {
      await contract?.createDataSetDealProposal(cidHex, size, dealDurationInDays, dealStorageFees, {
      value: ethers.utils.parseUnits(`${dealStorageFees}`),
      gasLimit: 1000000000,
      maxPriorityFeePerGas: priorityFee
      })
    } else {
      console.error('contract is null');
    }
  } catch(error) {
    console.error("Contract method not invoked", error);
  }

}
