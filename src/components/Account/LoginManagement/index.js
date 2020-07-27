import LoginManagementBase from './LoginManagementBase';
import { withFirebase } from '../../Firebase';

const LoginManagement = withFirebase(LoginManagementBase);
export default LoginManagement;
