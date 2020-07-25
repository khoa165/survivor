import { toast } from 'react-toastify';

const notifySuccess = (success, seconds = 3) => {
  toast(success, {
    position: toast.POSITION.TOP_LEFT,
    type: toast.TYPE.SUCCESS,
    autoClose: seconds * 1000,
  });
};

const notifyErrors = (error, seconds = 3) => {
  toast(error, {
    position: toast.POSITION.TOP_LEFT,
    type: toast.TYPE.ERROR,
    autoClose: seconds * 1000,
  });
};

export { notifySuccess, notifyErrors };
