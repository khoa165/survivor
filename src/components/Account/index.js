import React, { useState } from 'react';
import LoginManagementBase from './LoginManagement/LoginManagementBase';
import {
  withEmailVerification,
  withAuthorization,
  AuthUserContext,
} from '../Session';
import { withFirebase } from '../Firebase';
import { compose } from 'recompose';
import { Container, Row, Col } from 'reactstrap';
import AccountMenu from './AccountMenu';

const LoginManagement = withFirebase(LoginManagementBase);

const AccountPage = () => {
  const [activeItem, setActiveItem] = useState('Profile');
  const onClick = (itemName) => setActiveItem(itemName);

  const renderCorrespondingComponent = (authUser) => {
    switch (activeItem) {
      case 'Authentication':
        return <LoginManagement authUser={authUser} />;
      default:
        return null;
    }
  };

  return (
    <AuthUserContext.Consumer>
      {(authUser) => (
        <Container>
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
