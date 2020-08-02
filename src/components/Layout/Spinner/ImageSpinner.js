import React, { Fragment } from 'react';
import spinner from './spinner.gif';

const ImageSpinner = () => {
  return (
    <Fragment>
      <img
        src={spinner}
        alt='Loading...'
        style={{ width: '200px', margin: 'auto', display: 'block' }}
      />
    </Fragment>
  );
};

export default ImageSpinner;
