import React, { createContext, useContext, useEffect, useState } from 'react';

const JEJU_NAME = '제주특별자치도';
const JEJU_CODE = '39';

const Context = createContext();

export function useItemsContext() {
  return useContext(Context);
}

const ItemsContext = props => {
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

  return <Context.Provider value={value}>{props.children}</Context.Provider>;
};

export default ItemsContext;
