import Link from 'next/link';
import Grid from '@material-ui/core/Grid';
import ButtonBase from '@material-ui/core/ButtonBase';
import { makeStyles } from '@material-ui/core/styles';
import Image from './image';

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
    color: 'white',
    '&:hover': {
      '& div': { opacity: 0 },
    },
    '& button': {
      overflow: 'hidden',
      width: '100%',
      height: '100%',
    },
    '& a': {
      width: '100%',
      height: '100%',
      position: 'relative',
    },
    '& p': {
      position: 'absolute',
      left: 20,
      bottom: 10,
      [theme.breakpoints.down('xs')]: {
        bottom: 0,
      },
      zIndex: 2,
      fontWeight: theme.typography.fontWeightBold,
      fontSize: theme.typography.h6.fontSize,
      [theme.breakpoints.down('sm')]: {
        fontSize: theme.typography.subtitle1.fontSize,
      },
      maxWidth: '80%',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
    },
    '& div': {
      backgroundColor: 'black',
      position: 'absolute',
      width: '100%',
      height: '100%',
      zIndex: 1,
      opacity: 0.2,
      transition: theme.transitions.create('opacity'),
    },
    '& img': {
      position: 'absolute',
      top: 0,
      left: 0,
      height: '100%',
      width: '100%',
      objectFit: 'cover',
    },
  },
}));

const Item = ({ item, grid }) => {
  const classes = useStyles();

  return (
    <Grid item xs={12} sm={grid} className={classes.root}>
      <ButtonBase focusRipple>
        <Link href={`/view/${item.contentid}`}>
          <a>
            <p>{item.title}</p>
            <div></div>
            <Image
              thumbSrc={item.firstimage2}
              fullSrc={item.firstimage}
              alt={item.title}
            />
          </a>
        </Link>
      </ButtonBase>
    </Grid>
  );
};

export default Item;
