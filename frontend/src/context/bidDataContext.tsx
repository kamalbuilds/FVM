import React, { createContext, useState } from 'react';

type ContextProps = {
  children: React.ReactNode;
}

const BidDataContext = createContext({});

const BidDataProvider = ({children}: ContextProps) => {
 const [BidDataList, setBidDataList] = useState([]);

 return (
    <BidDataContext.Provider value={{BidDataList, setBidDataList}}>
    {children}
    </BidDataContext.Provider>
 )

}

export { BidDataContext, BidDataProvider};