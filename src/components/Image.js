import { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  thumb: {
    filter: 'blur(4px)',
    transition: 'visibility 0ms ease 300ms',
  },
  full: {
    transition: 'opacity 300ms ease 0ms',
  },
}));

const Image = ({ thumbSrc, fullSrc, alt }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const classes = useStyles();

  return (
    <>
      <img
        className={classes.thumb}
        alt={alt}
        src={thumbSrc}
        style={{ visibility: isLoaded ? 'hidden' : 'visible' }}
      />
      <img
        onLoad={() => {
          setIsLoaded(true);
        }}
        className={classes.full}
        style={{ opacity: isLoaded ? 1 : 0 }}
        alt={alt}
        src={fullSrc}
      />
    </>
  );
};
export default Image;
