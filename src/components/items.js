import React, { memo } from 'react';
import Item from './item';
import SkeletonItem from './skeletonItem';
import Grid from '@material-ui/core/Grid';

const GRIDS = [5, 3, 4, 3, 6, 3, 4, 3, 5];

const Items = memo(({ items, isLoading }) => (
  <Grid container spacing={1}>
    {!isLoading
      ? items.map((item, index) => (
          <Item key={item.contentid} item={item} grid={GRIDS[index]} />
        ))
      : GRIDS.map((grid, index) => <SkeletonItem key={index} grid={grid} />)}
  </Grid>
));

Items.displayName = 'Items';

export default Items;
