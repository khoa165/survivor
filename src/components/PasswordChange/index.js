import AddPasswordForm from './AddPasswordForm';
import UpdatePasswordForm from './UpdatePasswordForm';
import PasswordChangeForm from './PasswordChangeForm';
import { withFirebase } from '../Firebase';

const PasswordChange = withFirebase(PasswordChangeForm);

const AddPassword = withFirebase(AddPasswordForm);
const UpdatePassword = withFirebase(UpdatePasswordForm);

export { AddPassword, UpdatePassword, PasswordChange };
