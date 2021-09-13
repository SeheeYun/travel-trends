import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { memo } from 'react';

const useStyles = makeStyles(theme => ({
  root: {
    borderTop: `1px solid ${theme.palette.grey[400]}`,
    color: theme.palette.grey[700],
    display: 'flex',
    justifyContent: 'center',
  },
  toolbar: {
    minHeight: 50,
    maxHeight: 50,
  },
  title: { fontSize: '0.9rem' },
}));

const Footer = memo(() => {
  const classes = useStyles();

  return (
    <footer className={classes.root}>
      <Toolbar className={classes.toolbar}>
        <Typography className={classes.title}>
          ⓒ 2021. 윤세희 All Rights Reserved.
        </Typography>
      </Toolbar>
    </footer>
  );
});

Footer.displayName = 'Footer';

export default Footer;
