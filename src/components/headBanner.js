import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import { memo } from 'react';

const useStyles = makeStyles(theme => ({
  container: {
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    color: 'white',
    height: 600,
    [theme.breakpoints.down('xs')]: {
      height: 400,
    },
    display: 'flex',
    alignItems: 'center',
  },
  container_title: {
    width: 570,
    fontSize: theme.typography.h3.fontSize,
    [theme.breakpoints.down('sm')]: {
      width: 420,
      fontSize: theme.typography.h4.fontSize,
    },
    [theme.breakpoints.down('xs')]: {
      width: 300,
      fontSize: theme.typography.h5.fontSize,
    },
  },
}));

const HeadBanner = memo(({ image, title }) => {
  const classes = useStyles();

  return (
    <Container
      maxWidth={false}
      className={classes.container}
      style={{
        backgroundImage: `linear-gradient( rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url(${image.replace(
          /http/i,
          'https'
        )})`,
      }}
    >
      <Container>
        {title ? (
          <Typography component="h1" className={classes.container_title}>
            {title}
          </Typography>
        ) : (
          <div></div>
        )}
      </Container>
    </Container>
  );
});

HeadBanner.displayName = 'HeadBanner';

export default HeadBanner;
