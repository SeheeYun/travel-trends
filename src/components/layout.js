import Footer from './footer';
import Header from './header';
import LinearProgress from '@material-ui/core/LinearProgress';
import { makeStyles } from '@material-ui/core/styles';
import { memo } from 'react';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    position: 'fixed',
    zIndex: 1101,
  },
}));

const Layout = memo(({ children, isLoading }) => {
  const classes = useStyles();

  return (
    <div id="root">
      {isLoading && (
        <div className={classes.root}>
          <LinearProgress />
        </div>
      )}
      <Header />
      {children}
      <Footer />
    </div>
  );
});
export default Layout;
