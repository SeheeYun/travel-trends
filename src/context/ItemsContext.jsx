import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';

const JEJU_NAME = '제주특별자치도';
const JEJU_CODE = 39;

const Context = createContext();

export function useItemsContext() {
  return useContext(Context);
}

const ItemsContext = props => {
  const [province, setProvince] = useState(JEJU_NAME);
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

  useEffect(() => {
    getItems(JEJU_CODE);
  }, []);

  const value = {
    province,
    items,
    isLoading,
    onClick,
  };

  return <Context.Provider value={value}>{props.children}</Context.Provider>;
};

export default ItemsContext;
