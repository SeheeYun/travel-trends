import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    color: 'white',
  },
}));

const Header = () => {
  const classes = useStyles();

  return (
    <AppBar position="sticky" className={classes.root}>
      <Toolbar>
        <Typography variant="h6">Travel Trends</Typography>
      </Toolbar>
    </AppBar>
  );
};
export default Header;
