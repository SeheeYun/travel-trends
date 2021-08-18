import React from 'react';
import Item from './item';
import Grid from '@material-ui/core/Grid';

const GRIDS = [5, 3, 4, 3, 6, 3, 4, 3, 5];

const Items = ({ items }) => (
  <Grid container spacing={1}>
    {!(items.length === 0) &&
      items.map(item => (
        <Item
          key={item.contentid}
          item={item}
          grid={GRIDS[items.indexOf(item)]}
        />
      ))}
  </Grid>
);

export default Items;
