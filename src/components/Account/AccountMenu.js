import React from 'react';
import { Label, Menu } from 'semantic-ui-react';

const AccountMenu = ({ authUser, activeItem, onClick }) => {
  return (
    <Menu vertical className='width-100'>
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
        active={activeItem === 'Account'}
        onClick={() => {
          onClick('Account');
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
