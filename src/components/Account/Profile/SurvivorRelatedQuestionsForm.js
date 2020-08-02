import React, { Fragment, useState, useEffect } from 'react';
import { withFirebase } from '../../Firebase';
import { notifySuccess } from '../../../utils/Toast';
import { Row, Col, Form, FormGroup, Input, Label, Collapse } from 'reactstrap';

const SurvivorRelatedQuestionsForm = ({
  firebase,
  questions,
  answers,
  authUser,
}) => {
  const [updatedAnswers, setUpdatedAnswers] = useState({});

  const onSubmit = (e) => {
    e.preventDefault();

    const data = {};
    Object.keys(updatedAnswers).forEach((index) => {
      if (updatedAnswers[index].trim()) {
        data[index] = updatedAnswers[index];
      }
    });

    firebase.userProfileAnswers(authUser.uid).set(data);
    notifySuccess('Answers updated successfully!');
  };

  useEffect(() => {
    setUpdatedAnswers(answers);
  }, [answers]);

  // Event listener for change in input fields.
  const onChange = (e) =>
    setUpdatedAnswers({
      ...updatedAnswers,
      [e.target.name]: e.target.value,
    });

  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  return (
    questions !== undefined && (
      <Fragment>
        <p className='heading-title' onClick={toggle}>
          {isOpen ? (
            <i className='fas fa-chevron-down mr-2 mr-md-4'></i>
          ) : (
            <i className='fas fa-chevron-right mr-2 mr-md-4'></i>
          )}
          Update Survivor portfolio
        </p>
        <Collapse isOpen={isOpen}>
          <Form onSubmit={onSubmit}>
            <Row form className='align-items-end'>
              {questions &&
                questions.length > 0 &&
                questions.map((question, index) => (
                  <Col xs='12' key={index}>
                    <FormGroup>
                      <Label for={`question${index}`} className='text-brown'>
                        {question.text}
                      </Label>
                      <Input
                        type='textarea'
                        name={index}
                        id={`question${index}`}
                        onChange={onChange}
                        placeholder={question.placeholder}
                        rows={question.rows}
                        value={updatedAnswers[index]}
                      />
                    </FormGroup>
                  </Col>
                ))}
            </Row>
            <Input
              type='submit'
              value='Update Survivor portfolio'
              className='btn btn-warning btn-block mt-4 submitProfileButton'
            />
          </Form>
        </Collapse>
      </Fragment>
    )
  );
};

export default withFirebase(SurvivorRelatedQuestionsForm);
