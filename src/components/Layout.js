import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

const Layout = ({ children }) => (
  <div>
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" className="title">
          Travel Trends
        </Typography>
      </Toolbar>
    </AppBar>
    <div>{children}</div>
  </div>
);
export default Layout;
