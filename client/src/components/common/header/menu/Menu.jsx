import React from 'react';
import PropTypes from 'prop-types';
import { MenuItem } from 'material-ui/Menu';
import { Link } from 'react-router-dom';
import Popover from 'material-ui/Popover';

class Menu extends React.Component {
  render = () => {
    const { isOpen, handleClose, user, anchorEl, logout } = this.props;

    return (
      <Popover
        open={isOpen}
        onClose={handleClose}
        anchorEl={anchorEl}
        anchorOrigin={{ "horizontal": "center", "vertical": "bottom" }}
      >
        <div data-cy="user-menu">
          <Link to={`/profile/${user.id}`}>
            <MenuItem onClick={handleClose}>
              Profile
          </MenuItem>
          </Link>
          <Link to="/myposts">
            <MenuItem onClick={handleClose}>
              My posts
          </MenuItem>
          </Link>
          <MenuItem onClick={logout}>
            <Link to="/home">
              Log Out
          </Link>
          </MenuItem>
        </div>
      </Popover>
    );
  };
}

Menu.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  anchorEl: PropTypes.object,
  logout: PropTypes.func.isRequired,
};

export default Menu;