import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Container, Table } from 'reactstrap';
import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';
import Spinner from '../Spinner/Spinner';
const UserList = ({ firebase }) => {
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    setLoading(true);
    firebase.users().on('value', (snapshot) => {
      const usersObject = snapshot.val();

      const usersList = Object.keys(usersObject).map((key) => ({
        ...usersObject[key],
        uid: key,
      }));

      setUsers(usersList);
      setLoading(false);
    });

    return () => {
      firebase.users().off();
    };
  }, [firebase]);

  return loading ? (
    <Spinner />
  ) : (
    <Container>
      <Table striped hover>
        <thead className='thead-dark'>
          <tr className='d-flex'>
            <th className='col-4'>User ID</th>
            <th className='col-4'>Full name</th>
            <th className='col-4'>Username</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr
              className={`d-flex ${
                user.roles.Developer
                  ? 'table-success'
                  : user.roles.Admin
                  ? 'table-warning'
                  : 'table-default'
              }`}
              key={user.uid}
            >
              <td className='col-4'>{user.uid}</td>
              <td className='col-4'>{user.fullname}</td>
              <td className='col-4 d-flex justify-content-between'>
                {user.roles.Developer ? (
                  <span>
                    <i className='fas fa-dragon width-50px'></i>
                    {user.username}
                  </span>
                ) : user.roles.Admin ? (
                  <span>
                    <i className='fas fa-fire width-50px'></i>
                    {user.username}
                  </span>
                ) : (
                  <span>
                    <i className='fas fa-user width-50px'></i>
                    {user.username}
                  </span>
                )}
                <Link
                  className='text-dark'
                  to={{
                    pathname: `${ROUTES.ADMIN}/${user.uid}`,
                    state: { user },
                  }}
                >
                  <i className='fas fa-external-link-alt'></i>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default withFirebase(UserList);
