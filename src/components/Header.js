import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';

function ElevationScroll({ children }) {
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 100,
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
    style: {
      background: trigger ? '#111' : 'transparent',
    },
  });
}

ElevationScroll.propTypes = {
  children: PropTypes.element.isRequired,
};

const Header = props => {
  return (
    <ElevationScroll {...props}>
      <AppBar position="fixed">
        <Toolbar>
          <Typography variant="h6">Travel Trends</Typography>
        </Toolbar>
      </AppBar>
    </ElevationScroll>
  );
};
export default Header;
