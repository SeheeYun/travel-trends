import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    background: theme.palette.grey[100],
    boxShadow: 'none',
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

const Footer = () => {
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
};
export default Footer;
