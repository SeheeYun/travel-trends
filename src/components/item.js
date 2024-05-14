import Link from 'next/link';
import Grid from '@material-ui/core/Grid';
import ButtonBase from '@material-ui/core/ButtonBase';
import { makeStyles } from '@material-ui/core/styles';
import Image from 'next/image';
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
    color: 'white',
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
  },
  div: {
    backgroundColor: 'black',
    position: 'absolute',
    width: '100%',
    height: '100%',
    zIndex: 1,
    opacity: 0.2,
    transition: theme.transitions.create('opacity'),
    '&:hover': {
      opacity: 0,
    },
  },
  image: {
    objectFit: 'cover',
    backgroundColor: theme.palette.grey[300],
  },
}));

const Item = memo(
  ({ item: { contentid, title, firstimage, firstimage2 }, grid }) => {
    const classes = useStyles();

    return (
      <Grid item xs={12} sm={grid} className={classes.root}>
        <ButtonBase focusRipple>
          <Link href={`/view/${contentid}`}>
            <a>
              <p>{title}</p>
              <div className={classes.div}></div>
              {firstimage && firstimage2 && (
                <Image
                  className={classes.image}
                  alt={title}
                  src={firstimage}
                  layout="fill"
                  placeholder="blur"
                  blurDataURL={firstimage2}
                />
              )}
            </a>
          </Link>
        </ButtonBase>
      </Grid>
    );
  }
);

Item.displayName = 'Item';

export default Item;
