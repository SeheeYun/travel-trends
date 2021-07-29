import React from 'react';
import Item from './Item';
import styles from '../../styles/Items.module.css';

const Items = ({ items, display }) => {
  const style = display === 'row' ? styles.row : styles.column;

  return (
    <div className={style}>
      {items.length > 0 &&
        items.map(item => <Item key={item.contentid} item={item} />)}
    </div>
  );
};

export default Items;
