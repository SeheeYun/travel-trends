import React, { memo } from 'react';
import Items from './Items';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { useItemsContext } from '../../context/ItemsContext';
import { useItems } from '../../hooks/useItems';

const useStyles = makeStyles(theme => ({
  section: {
    backgroundColor: theme.palette.background.paper,
    boxShadow:
      '0 16px 24px 2px rgb(0 0 0 / 14%), 0 6px 30px 5px rgb(0 0 0 / 12%), 0 8px 10px -5px rgb(0 0 0 / 20%)',
    borderRadius: '4px',
    marginBottom: 60,
    padding: '30px 20px',
    position: 'relative',
    '&::before': {
      content: '""',
      borderTop: '0px solid transparent',
      borderLeft: '25px solid transparent',
      borderRight: '25px solid transparent',
      borderBottom: '25px solid #fff',
      position: 'absolute',
      left: '15%',
      top: -25,
    },
    '& h2': {
      marginBottom: 10,
    },
  },
  bold: {
    fontWeight: theme.typography.fontWeightBold,
  },
}));

const ItemsSection = memo(() => {
  const classes = useStyles();
  const {
    province: { name, code },
  } = useItemsContext();
  const { data: items, isLoading } = useItems(code);

  return (
    <section className={classes.section}>
      <Typography component="h2">
        <Typography component="span" className={classes.bold}>
          {name}
        </Typography>
        의 추천 여행지
      </Typography>
      <Items items={items} isLoading={isLoading} />
    </section>
  );
});

ItemsSection.displayName = 'ItemsSection';

export default ItemsSection;
