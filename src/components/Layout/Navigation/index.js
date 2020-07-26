import React, { useState, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import {
  Container,
  Navbar,
  Nav,
  NavbarBrand,
  NavbarToggler,
  NavItem,
  Collapse,
} from 'reactstrap';
import { AuthUserContext } from '../../Session';
import SignOutButton from '../../Auth/SignOut';
import SignIn from '../../Auth/SignIn';
import SignUp from '../../Auth/SignUp';
import PasswordForget from '../../Auth/PasswordForget';
import { SemanticUIModal } from '../Modal';
import * as ROUTES from '../../../constants/routes';
import * as ROLES from '../../../constants/roles';

import './Navigation.scss';

const NavigationPublicLinks = ({ location }) => {
  const pathname = location && location.pathname ? location.pathname : null;

  return (
    <Fragment>
      <Nav className='ml-auto' navbar>
        <NavItem className='mr-2'>
          <SemanticUIModal
            trigger={
              <Link to='#' className='nav-link'>
                <i className='fas fa-sign-in-alt mr-1' />
                Sign In
              </Link>
            }
            modalTitle='Join your fellow Survivor fans'
          >
            {location.state && location.state.form ? (
              location.state.form === ROUTES.SIGN_UP ? (
                <SignUp pathname={pathname} />
              ) : location.state.form === ROUTES.PASSWORD_FORGET ? (
                <PasswordForget pathname={pathname} />
              ) : (
                <SignIn pathname={pathname} />
              )
            ) : (
              <SignIn pathname={pathname} />
            )}
          </SemanticUIModal>
        </NavItem>
        <NavItem>
          <SemanticUIModal
            trigger={
              <Link to={ROUTES.SIGN_UP} className='nav-link'>
                <i className='fas fa-user-edit mr-1' />
                Sign Up
              </Link>
            }
            modalTitle='Join your fellow Survivor fans'
          >
            {location.state && location.state.form ? (
              location.state.form === ROUTES.SIGN_IN ? (
                <SignIn pathname={pathname} />
              ) : location.state.form === ROUTES.PASSWORD_FORGET ? (
                <PasswordForget pathname={pathname} />
              ) : (
                <SignUp pathname={pathname} />
              )
            ) : (
              <SignUp pathname={pathname} />
            )}
          </SemanticUIModal>
        </NavItem>
      </Nav>
    </Fragment>
  );
};

const Navigation = ({ icon, title, location }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  const NavigationAuthLinks = ({ authUser }) => {
    return (
      <Nav className='ml-auto' navbar>
        <NavItem className='mr-2'>
          <Link to={ROUTES.HOME} className='nav-link'>
            <i className='fas fa-home mr-1' />
            Home
          </Link>
        </NavItem>
        <NavItem className='mr-2'>
          <Link to={ROUTES.ACCOUNT} className='nav-link'>
            <i className='fas fa-info-circle mr-1' />
            Account
          </Link>
        </NavItem>
        {!!authUser.roles[ROLES.ADMIN] && (
          <NavItem className='mr-2'>
            <Link to={ROUTES.ADMIN} className='nav-link'>
              <i className='fas fa-user-lock mr-1' />
              Admin
            </Link>
          </NavItem>
        )}
        <SignOutButton />
      </Nav>
    );
  };

  return (
    <Navbar dark expand='md' id='navbar' className='py-3'>
      <Container>
        <NavbarBrand tag={Link} to={ROUTES.HOME}>
          <i className={icon} />
          <i className={icon} />
          <i className={`${icon} mr-1`} /> {title}{' '}
          <i className={`${icon} ml-1`} />
          <i className={icon} />
          <i className={icon} />
        </NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <AuthUserContext.Consumer>
            {(authUser) =>
              authUser ? (
                <NavigationAuthLinks authUser={authUser} />
              ) : (
                <NavigationPublicLinks location={location} />
              )
            }
          </AuthUserContext.Consumer>
        </Collapse>
      </Container>
    </Navbar>
  );
};

Navigation.defaultProps = {
  title: 'Survivor',
  icon: 'fas fa-fire',
};

Navigation.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
};

export default withRouter(Navigation);
