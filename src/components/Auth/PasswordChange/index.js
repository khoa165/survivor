import AddPasswordForm from './AddPasswordForm';
import UpdatePasswordForm from './UpdatePasswordForm';
import { withFirebase } from '../../Firebase';

const AddPassword = withFirebase(AddPasswordForm);
const UpdatePassword = withFirebase(UpdatePasswordForm);

export { AddPassword, UpdatePassword };
