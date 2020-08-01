import React from 'react';
import { Label, Menu } from 'semantic-ui-react';
import './AccountMenu.scss';

const AccountMenu = ({ authUser, activeItem, onClick }) => {
  return (
    <Menu vertical className='width-100 mb-4'>
      <Menu.Item>
        {authUser.username ? (
          <Label color='teal'>{authUser.username}</Label>
        ) : null}
        <span className='user-fullname'>
          {authUser.fullname ? authUser.fullname : authUser.email}
        </span>
      </Menu.Item>
      <Menu.Item
        active={activeItem === 'Dashboard'}
        onClick={() => {
          onClick('Dashboard');
        }}
      >
        Dashboard
      </Menu.Item>
      <Menu.Item
        active={activeItem === 'Profile'}
        onClick={() => {
          onClick('Profile');
        }}
      >
        Profile
      </Menu.Item>
      <Menu.Item
        active={activeItem === 'Authentication'}
        onClick={() => {
          onClick('Authentication');
        }}
      >
        Authentication
      </Menu.Item>
      <Menu.Item
        active={activeItem === 'Settings'}
        onClick={() => {
          onClick('Settings');
        }}
      >
        Settings
      </Menu.Item>
    </Menu>
  );
};

export default AccountMenu;
