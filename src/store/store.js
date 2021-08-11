import React, { createContext, useContext, useState } from 'react';

const Context = createContext();

export function useStore() {
  return useContext(Context);
}

const KEYS = {
  대중교통: true,
  레저스포츠: true,
  렌터카: true,
  면세점: true,
  문화서비스: true,
  쇼핑: true,
  숙박업: true,
  여행업: true,
  카지노: true,
  항공사: true,
};
const COLORS = [
  '#f44336',
  '#e91e63',
  '#9c27b0',
  '#af52bf',
  '#3f51b5',
  '#2196f3',
  '#00bcd4',
  '#009688',
  '#8bc34a',
  '#cddc39',
];

const Store = props => {
  const [province, setProvince] = useState(null);
  const [items, setItems] = useState([]);
  const [keys, setKeys] = useState(KEYS);
  const colors = COLORS;

  const onSetItems = data => {
    setItems(data);
  };

  const onSetProvince = name => {
    setProvince(name);
  };

  const onChangeKeys = e => {
    setKeys(keys => {
      return { ...keys, [e.target.name]: e.target.checked };
    });
  };

  const value = {
    province,
    items,
    keys,
    colors,
    onSetItems,
    onSetProvince,
    onChangeKeys,
  };

  return <Context.Provider value={value}>{props.children}</Context.Provider>;
};

export default Store;
