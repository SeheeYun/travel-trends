import React, { createContext, useContext, useState } from 'react';

const Context = createContext();

export function useStore() {
  return useContext(Context);
}

const Store = props => {
  const [province, setProvince] = useState(null);
  const [items, setItems] = useState([]);

  const onSetItems = data => {
    setItems(data);
  };

  const onSetProvince = name => {
    setProvince(name);
  };

  const value = {
    province,
    items,
    onSetItems,
    onSetProvince,
  };

  return <Context.Provider value={value}>{props.children}</Context.Provider>;
};

export default Store;
