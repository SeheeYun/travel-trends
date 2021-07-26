import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';

function ElevationScroll({ children }) {
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  });

  return React.cloneElement(children, {
    style: {
      background: trigger
        ? 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)'
        : 'transparent',
      transition: '0.5s',
      boxShadow: trigger ? '0 3px 5px 2px rgba(255, 105, 135, .5)' : 'none',
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
