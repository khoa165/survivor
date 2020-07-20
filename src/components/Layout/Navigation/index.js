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
import './NavigationBar.scss';

const Navigation = ({ icon, title }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  const NavigationAuthLinks = ({ authUser }) => {
    return (
      <Fragment>
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
      </Fragment>
    );
  };

  const NavigationPublicLinks = () => {
    return (
      <Fragment>
        <NavItem className='mr-2'>
          <Link to={ROUTES.SIGN_IN} className='nav-link'>
            <i className='fas fa-sign-in-alt mr-1' />
            Sign In
          </Link>
        </NavItem>
        <NavItem>
          <Link to={ROUTES.SIGN_UP} className='nav-link'>
            <i className='fas fa-user-edit mr-1' />
            Sign Up
          </Link>
        </NavItem>
      </Fragment>
    );
  };

  return (
    <Navbar expand='md' id='navbar' className='py-3'>
      <Container>
        <NavbarBrand tag={Link} to={ROUTES.LANDING}>
          <i className={icon} />
          <i className={icon} />
          <i className={`${icon} mr-1`} /> {title}{' '}
          <i className={`${icon} ml-1`} />
          <i className={icon} />
          <i className={icon} />
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
  title: 'Survivor 39days',
  icon: 'fas fa-fire',
};

Navigation.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
};

export default Navigation;
