import React, { createContext, useContext, useState } from 'react';

const JEJU_NAME = '제주특별자치도';
const JEJU_CODE = '39';

export const ItemsContext = createContext();

export function useItemsContext() {
  return useContext(ItemsContext);
}

const ItemsContextProvider = ({ children }) => {
  const [province, setProvince] = useState({
    name: JEJU_NAME,
    code: JEJU_CODE,
  });

  const onClick = (name, code) => {
    setProvince({ name, code });
  };

  const value = {
    province,
    onClick,
  };

  return (
    <ItemsContext.Provider value={value}>{children}</ItemsContext.Provider>
  );
};

export default ItemsContextProvider;
