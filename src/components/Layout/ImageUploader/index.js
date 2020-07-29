import React, { useState, useEffect } from 'react';
import { withFirebase } from '../../Firebase';
import { Form, FormGroup, Input, Label, Button } from 'reactstrap';
import './ImageUploader.scss';
import { notifySuccess } from '../../../utils/Toast';

const ImageUploader = ({ firebase, currentPicture }) => {
  const [selectedFile, setSelectedFile] = useState();
  const [preview, setPreview] = useState();
  const [inputKey, setInputKey] = useState(Date.now());
  const [imageAsUrl, setImageAsUrl] = useState(
    currentPicture ? currentPicture : ''
  );

  // Create a preview as a side effect, whenever selected file is changed
  useEffect(() => {
    if (!selectedFile) {
      setPreview(undefined);
      return;
    }

    const objectUrl = URL.createObjectURL(selectedFile);
    setPreview(objectUrl);

    // Free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile]);

  const onSelectFile = (e) => {
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedFile(undefined);
      return;
    }

    setSelectedFile(e.target.files[0]);
  };

  const onRemoveFile = () => {
    setInputKey(Date.now());
    setSelectedFile(undefined);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const currentUser = firebase.auth.currentUser;
    const metadata = {
      contentType: 'image/jpeg',
    };
    const uploadTask = firebase
      .userAvatarRef(currentUser.uid)
      .put(selectedFile, metadata);

    uploadTask.on(
      'state_changed',
      (snap) => {
        // provide progress updates
        console.log(snap.bytesTransferred, snap.totalBytes);
      },
      (err) => {
        // provide errors
        console.log(err.message);
      },
      () => {
        firebase
          .userAvatarRef(currentUser.uid)
          .getDownloadURL()
          .then((fireBaseUrl) => {
            setImageAsUrl(fireBaseUrl);

            firebase
              .userPublicInfo(currentUser.uid)
              .child('picture')
              .set(fireBaseUrl);

            notifySuccess('Image uploaded successfully!');
          });
      }
    );
  };

  return (
    <div className='image-uploader'>
      <div className='image-area'>
        {selectedFile ? (
          <div className='preview-avatar-wrapper'>
            <div className='x-icon-wrapper'>
              <i
                className='fas fa-times uploader-x-icon'
                onClick={onRemoveFile}
              />
            </div>
            <img
              className='user-avatar-preview'
              alt='user avatar preview'
              src={preview}
            />
          </div>
        ) : imageAsUrl ? (
          <div className='user-avatar-wrapper'>
            <img className='user-avatar' alt='user avatar' src={imageAsUrl} />
          </div>
        ) : (
          <div className='avatar-placeholder-wrapper'>
            <div className='avatar-placeholder'>
              <i className='fas fa-user uploader-user-icon' />
              <div className='plus-icon-wrapper'>
                <i className='fas fa-plus uploader-plus-icon' />
              </div>
            </div>
          </div>
        )}
      </div>

      <Form onSubmit={onSubmit}>
        <FormGroup>
          <Label
            for='avatarUploadBtn'
            className='btn btn-outline-warning avatarUploadLabel'
          >
            Upload avatar
          </Label>
          <Input
            type='file'
            className='upload-file-btn'
            id='avatarUploadBtn'
            onChange={onSelectFile}
            key={inputKey}
          />
        </FormGroup>

        <FormGroup>
          <Button className='updateAvatarBtn' color='warning'>
            Update avatar
          </Button>
        </FormGroup>
      </Form>
    </div>
  );
};

export default withFirebase(ImageUploader);
