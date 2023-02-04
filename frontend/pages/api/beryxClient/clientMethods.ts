import CID from 'cids';

import {CLIENT} from './client';

// These are all Beryx JS Client api methods

export const getAccountBalance = (address: string) => {
 return CLIENT?.data.getAccountBalance(address);
};

export const getAccountInfo = (address: string) => {
 return CLIENT?.data.getAccountInfo(address);
};

export const getAccountTransactions = (address: string) => {
 return CLIENT.data.getAccountTransactions(address);
};

export const getAccountVesting = (address: string) => {
 return  CLIENT?.data.getAccountVesting(address)
};

export const getDealsByCID =  (cid: CID) => {
 return  CLIENT?.data.getDealsByCid(`${cid}`)
};

export const getDealsByClient =  (client: string) => {
 return  CLIENT?.data.getDealsByClient(client)
};

export const getDealsByHeight =  (blockHeight: number) => {
 return  CLIENT?.data.getDealsByHeight(blockHeight)
};

export const getDealsByProvider =  (provider: string) => {
 return  CLIENT?.data.getDealsByProvider(provider)
};

export const getTipset =  (blockHeight: number) => {
 return  CLIENT?.data.getTipset(blockHeight)
};

export const getTransactions =  (txHeightOrHash: string | number | undefined) => {
 return  CLIENT?.data.getTransactions(txHeightOrHash)
};
