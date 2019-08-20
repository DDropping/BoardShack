import React from 'react';
import { connect } from 'react-redux';
import { Menu, Popover, Button, Icon } from 'antd';

import { toggleRegisterModal } from '../../actions/registerModal';
import { toggleLoginModal } from '../../actions/loginModal';
import { toggleNavDrawer } from '../../actions/drawer_nav';
import { toggleLogoutModal } from '../../actions/modal_logout';
import AccountPopover from './account/AccountPopover';

const Navbar = props => {
  return (
    <div>
      <Menu className="navigationItems" mode="horizontal">
        <Menu.Item onClick={props.toggleLogoutModal} key="home">
          Home
        </Menu.Item>
        {props.isAuthenticated && <Menu.Item key="createPost">Post</Menu.Item>}
        {props.isAuthenticated && (
          <Menu.Item key="account">
            <Popover
              placement="bottomRight"
              content={<AccountPopover />}
              trigger="click"
              style={{ padding: '10px', margin: '-10px' }}
            >
              Account
            </Popover>
          </Menu.Item>
        )}

        {!props.isAuthenticated && (
          <Menu.Item onClick={props.toggleLoginModal} key="login">
            Login
          </Menu.Item>
        )}
        {!props.isAuthenticated && (
          <Menu.Item onClick={props.toggleRegisterModal} key="register">
            Register
          </Menu.Item>
        )}
      </Menu>

      <div className="drawerButton">
        <Button onClick={props.toggleNavDrawer}>
          <Icon type="menu" />
        </Button>
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.isAuthenticated
  };
};

export default connect(
  mapStateToProps,
  { toggleRegisterModal, toggleLoginModal, toggleLogoutModal, toggleNavDrawer }
)(Navbar);
