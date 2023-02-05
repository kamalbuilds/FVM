type Miners = {
 id: number,
 jsonrpc: string,
 result: []
}

type MinerData = {
 id: number,
 jsonrpc: string,
 result: object
}

type CID = {
  version: number,
  codec: string,
  multihash: string
}

const baseURL = "https://api.node.glif.io";

export const getStorageProviders = async (): Promise<Miners[]> => {
 try {
    const response = await fetch(baseURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        jsonrpc: "2.0",
        method: "Filecoin.StateListMiners",
        params: [null],
        id: 1,
      }),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return Promise.reject(error);
 }
}

export const getStorageProviderById = async (id: string, cid: any = undefined): Promise<MinerData[]> => {
 try {

  const params = [id];
  if(cid) {
    params.push(cid);
  }

  const response = await fetch(baseURL, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      jsonrpc: "2.0",
      method: "Filecoin.StateMinerInfo",
      params: [id, cid],
      id: 1,
    }),
  });
    const data = await response.json();
    console.log('data', data);
    return data;
  } catch (error) {
    console.error('api error:', error);
    return Promise.reject(error);
  }
}

export const queryStorageAsk = async (peerid: string, id: any): Promise<MinerData[]> => {
 try {

  // const params = [id];
  // if(peerid) {
  //   params.push(peerid);
  // }

  const response = await fetch(baseURL, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
    },
    mode: "no-cors",
    body: JSON.stringify({
      jsonrpc: "2.0",
      method: "Filecoin.ClientQueryAsk",
      params: [peerid, id],
      id: 1,
    }),
  });
  
    const data = await response.json();
    console.log('data', data);
    return data;
  } catch (error) {
    console.error('api error:', error);
    return Promise.reject(error);
  }
}