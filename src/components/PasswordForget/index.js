import PasswordForgetForm from './PasswordForgetForm';
import { withFirebase } from '../Firebase';

const PasswordForget = withFirebase(PasswordForgetForm);

export default PasswordForget;
