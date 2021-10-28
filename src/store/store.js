import React, { createContext, useContext, useState } from 'react';
import axios from 'axios';

const Context = createContext();

export function useStore() {
  return useContext(Context);
}

const Store = props => {
  const [province, setProvince] = useState(null);
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getItems = async areaCode => {
    try {
      const res = await axios.get(`/api/${areaCode}`);
      setItems(
        res.data.map(data => {
          const { contentid, title, firstimage, firstimage2 } = data;
          return {
            contentid: contentid,
            title: title,
            firstimage: firstimage.replace(/http/i, 'https'),
            firstimage2: firstimage2.replace(/http/i, 'https'),
          };
        })
      );
      setIsLoading(false);
    } catch (e) {
      console.error(e);
    }
  };

  const onClick = (name, areaCode) => {
    setProvince(name);
    getItems(areaCode);
  };

  const value = {
    province,
    items,
    isLoading,
    onClick,
  };

  return <Context.Provider value={value}>{props.children}</Context.Provider>;
};

export default Store;
