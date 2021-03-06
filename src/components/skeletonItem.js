import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import { memo } from 'react';

const useStyles = makeStyles(theme => ({
  root: {
    height: 400,
    [theme.breakpoints.down('sm')]: {
      height: 260,
    },
    [theme.breakpoints.down('xs')]: {
      height: 100,
    },
    position: 'relative',
    '& div': {
      backgroundColor: theme.palette.grey[300],
      height: '100%',
    },
  },
}));

const SkeletonItem = memo(({ grid }) => {
  const classes = useStyles();

  return (
    <Grid item xs={12} sm={grid} className={classes.root}>
      <div></div>
    </Grid>
  );
});

SkeletonItem.displayName = 'SkeletonItem';

export default SkeletonItem;
