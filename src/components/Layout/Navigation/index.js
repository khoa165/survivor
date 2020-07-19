import React, { useState, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
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
import * as ROUTES from '../../../constants/routes';
import * as ROLES from '../../../constants/roles';

const Navigation = ({ icon, title }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  const NavigationAuthLinks = ({ authUser }) => {
    return (
      <Fragment>
        <NavItem>
          <Link to={ROUTES.HOME} className='nav-link'>
            Home
          </Link>
        </NavItem>
        <NavItem>
          <Link to={ROUTES.ACCOUNT} className='nav-link'>
            Account
          </Link>
        </NavItem>
        {!!authUser.roles[ROLES.ADMIN] && (
          <NavItem>
            <Link to={ROUTES.ADMIN} className='nav-link'>
              Admin
            </Link>
          </NavItem>
        )}
        <SignOutButton />
      </Fragment>
    );
  };

  const NavigationPublicLinks = () => {
    return (
      <Fragment>
        <NavItem>
          <Link to={ROUTES.SIGN_IN} className='nav-link'>
            <i className='fas fa-users mr-1' />
            Sign In
          </Link>
        </NavItem>
        <NavItem>
          <Link to={ROUTES.SIGN_UP} className='nav-link'>
            Sign Up
          </Link>
        </NavItem>
      </Fragment>
    );
  };

  return (
    <Navbar expand='md' id='navbar'>
      <Container>
        <NavbarBrand tag={Link} to={ROUTES.LANDING}>
          <i className={`${icon} mr-1`} /> {title}
        </NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className='ml-auto' navbar>
            <AuthUserContext.Consumer>
              {(authUser) =>
                authUser ? (
                  <NavigationAuthLinks authUser={authUser} />
                ) : (
                  <NavigationPublicLinks />
                )
              }
            </AuthUserContext.Consumer>
          </Nav>
        </Collapse>
      </Container>
    </Navbar>
  );
};

Navigation.defaultProps = {
  title: 'App name',
  icon: 'fas fa-code',
};

Navigation.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
};

export default Navigation;
