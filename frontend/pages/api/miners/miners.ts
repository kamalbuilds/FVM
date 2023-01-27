type Miners = {
 id: number,
 jsonrpc: string,
 result: []
}

export const getStorageProviders = async (): Promise<Miners[]> => {
 try {
    const response = await fetch("https://api.node.glif.io", {
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

