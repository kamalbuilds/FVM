import React, { createContext, useState } from 'react';

type ContextProps = {
  children: React.ReactNode;
}

const FormDataContext = createContext({});

const FormDataProvider = ({children}: ContextProps) => {
 const [formCollectionData, setFormCollectionData] = useState([]);

 return (
    <FormDataContext.Provider value={{formCollectionData, setFormCollectionData}}>
    {children}
    </FormDataContext.Provider>
 )

}

export { FormDataContext, FormDataProvider};