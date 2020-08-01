import React, { useState } from 'react';
import LoginManagement from './LoginManagement';
import {
  withEmailVerification,
  withAuthorization,
  AuthUserContext,
} from '../Session';
import { compose } from 'recompose';
import { Container, Row, Col } from 'reactstrap';
import AccountMenu from './AccountMenu';
import Profile from './Profile/Profile';
import Dashboard from './Dashboard';

const AccountPage = () => {
  const [activeItem, setActiveItem] = useState('Dashboard');
  const onClick = (itemName) => setActiveItem(itemName);

  const renderCorrespondingComponent = (authUser) => {
    switch (activeItem) {
      case 'Dashboard':
        return <Dashboard authUser={authUser} />;
      case 'Profile':
        return <Profile authUser={authUser} />;
      case 'Authentication':
        return <LoginManagement authUser={authUser} />;
      default:
        return null;
    }
  };

  return (
    <AuthUserContext.Consumer>
      {(authUser) => (
        <Container id='accountPage' className='mt-4'>
          <Row className='justify-content-between'>
            <Col lg='3'>
              <AccountMenu
                authUser={authUser}
                activeItem={activeItem}
                onClick={onClick}
              />
            </Col>
            <Col lg='9'>
              {/* <LoginManagement authUser={authUser} /> */}
              {renderCorrespondingComponent(authUser)}
            </Col>
          </Row>
        </Container>
      )}
    </AuthUserContext.Consumer>
  );
};

const condition = (authUser) => !!authUser;

export default compose(
  withEmailVerification,
  withAuthorization(condition)
)(AccountPage);
