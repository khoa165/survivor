import React from 'react';
import { Button, Col } from 'reactstrap';
import { Icon } from 'semantic-ui-react';

const SocialLoginToggle = ({
  isTheOnlyActive,
  isEnabled,
  signInMethod,
  onConnect,
  onDisconnect,
}) => (
  <Col md='6' lg='3'>
    {isEnabled ? (
      <Button
        outline
        onClick={() => onDisconnect(signInMethod.id)}
        disabled={isTheOnlyActive}
        className='width-100 text-left mb-3'
      >
        <Icon name='check' color='green' className='mr-3' />
        <Icon name={signInMethod.icon} /> {signInMethod.name}
      </Button>
    ) : (
      <Button
        outline
        onClick={() => {
          if (signInMethod.id !== 'password') {
            onConnect(signInMethod.provider);
          }
        }}
        className='width-100 text-left mb-3'
      >
        <Icon name='x' color='red' className='mr-3' />
        <Icon name={signInMethod.icon} /> {signInMethod.name}
      </Button>
    )}
  </Col>
);

export default SocialLoginToggle;
