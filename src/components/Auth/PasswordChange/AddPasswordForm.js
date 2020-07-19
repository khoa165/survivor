import React, { useState } from 'react';
import { notifyErrors } from '../../../utils/Toast';
import { Row, Col, Form, FormGroup, Input, Label } from 'reactstrap';

const AddPasswordForm = ({ onConnect }) => {
  // Set user data.
  const [passwords, setPasswords] = useState({
    password: '',
    confirmedPassword: '',
  });
  let errors = [];

  // Destructuring.
  const { password, confirmedPassword } = passwords;

  const correctUserInput = () => {
    if (
      password === '' ||
      password.length < 6 ||
      password.length < 6 ||
      !/\d/.test(password)
    ) {
      errors.push('Password are required!');
    }

    if (password !== confirmedPassword) {
      errors.push('Passwords are not matched!');
    }

    return errors.length === 0;
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (!correctUserInput()) {
      errors.forEach((err) => notifyErrors(err, 5));
      errors = [];
      return;
    }

    onConnect(password);
    setPasswords({ password: '', confirmedPassword: '' });
  };

  const onChange = (e) => {
    setPasswords({ ...passwords, [e.target.name]: e.target.value });
  };

  return (
    <Form onSubmit={onSubmit}>
      <p className='lead'>Enable email/password login</p>
      <Row form className='align-items-end'>
        <Col md='5'>
          <FormGroup className='mb-lg-0'>
            <Label className='text-muted' for='passwordFields'>
              New password
            </Label>
            <Input
              type='password'
              name='password'
              id='passwordFields'
              value={password}
              onChange={onChange}
              required
            />
          </FormGroup>
        </Col>
        <Col md='5'>
          <FormGroup className='mb-lg-0'>
            <Label className='text-muted' for='confirmedPasswordFields'>
              Confirm password
            </Label>
            <Input
              type='password'
              name='confirmedPassword'
              id='confirmedPasswordFields'
              value={confirmedPassword}
              onChange={onChange}
              required
            />
          </FormGroup>
        </Col>
        <Col md='2'>
          <Input
            type='submit'
            value='Enable'
            className='btn btn-outline-warning btn-block submitFormButton'
          />
        </Col>
      </Row>
    </Form>
  );
};

export default AddPasswordForm;
