import React from 'react';
import { Label, Menu } from 'semantic-ui-react';
import './AccountMenu.scss';

const AccountMenu = ({ authUser, activeItem, onClick }) => {
  return (
    <Menu vertical className='width-100 mb-4'>
      <Menu.Item name='inbox'>
        <Label color='teal'>khoa165</Label>
        Khoa Thien Le
      </Menu.Item>
      <Menu.Item
        name='inbox'
        active={activeItem === 'Profile'}
        onClick={() => {
          onClick('Profile');
        }}
      >
        Profile
      </Menu.Item>
      <Menu.Item
        name='inbox'
        active={activeItem === 'Authentication'}
        onClick={() => {
          onClick('Authentication');
        }}
      >
        Authentication
      </Menu.Item>
      <Menu.Item
        name='inbox'
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
