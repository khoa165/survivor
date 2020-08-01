import React from 'react';
import { Row, Col } from 'reactstrap';

const DashboardHeader = ({
  data: { picture, username, fullname, email, bio },
}) => {
  return (
    picture !== undefined && (
      <Row>
        <Col lg='4'>
          {picture ? (
            <div className='user-avatar-wrapper'>
              <img className='user-avatar' alt='user avatar' src={picture} />
            </div>
          ) : (
            <div className='avatar-placeholder-wrapper'>
              <div className='avatar-placeholder'>
                <i className='fas fa-user user-icon' />
              </div>
            </div>
          )}
        </Col>
        <Col lg='8'>
          <div className='user-basic-info'>
            <h1 className='user-identifier'>{`${fullname} (@${username})`}</h1>
            {email ? <p className='user-email'>{`[${email}]`}</p> : null}
            <p className='user-bio'>{bio}</p>
          </div>
        </Col>
      </Row>
    )
  );
};

export default DashboardHeader;
