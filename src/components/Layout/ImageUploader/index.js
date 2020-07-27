import React, { useState, useEffect } from 'react';
import { FormGroup, Input, Label, Button } from 'reactstrap';
import './ImageUploader.scss';

const ImageUploader = () => {
  const [selectedFile, setSelectedFile] = useState();
  const [preview, setPreview] = useState();
  const [inputKey, setInputKey] = useState(Date.now());

  // cCeate a preview as a side effect, whenever selected file is changed
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

  return (
    <div className='image-uploader'>
      <div className='image-area'>
        {selectedFile ? (
          <div className='avatar-wrapper'>
            <div className='x-icon-wrapper'>
              <i
                className='fas fa-times uploader-x-icon'
                onClick={onRemoveFile}
              />
            </div>
            <img className='user-avatar' alt='user avatar' src={preview} />
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
    </div>
  );
};

export default ImageUploader;
