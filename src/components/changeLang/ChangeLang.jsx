// GlobalStateContext.js
import React, { createContext, useState, useContext } from 'react';
import DATA from '../../constant/mockData'; 


const GlobalStateContext = createContext();

export const useGlobalState = () => useContext(GlobalStateContext);

export const GlobalStateProvider = ({ children }) => {

  const [data, setData] = useState(DATA); 

  const updateData = (new_lang) => {
    setData(new_lang);
  };

  return (
    <GlobalStateContext.Provider value={{ data, updateData }}>
      {children}
    </GlobalStateContext.Provider>
  );
};
