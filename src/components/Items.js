import React from 'react';
import Item from './Item';

const Items = ({ items }) => {
  return (
    <div>
      {items.length > 0 &&
        items.map(item => <Item key={item.contentid} item={item} />)}
    </div>
  );
};

export default Items;
