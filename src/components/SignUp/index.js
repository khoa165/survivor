import SignUpForm from './SignUpForm';
import { compose } from 'recompose';
import { withRouter } from 'react-router-dom';
import { withFirebase } from '../Firebase';

const SignUp = compose(withRouter, withFirebase)(SignUpForm);

export default SignUp;
