import React from 'react';
import { Input } from 'reactstrap';
import './ContestantList.scss';

const ContestantsSearch = ({ searchText, setSearchText }) => {
  const onChange = (e) => {
    e.preventDefault();
    setSearchText(e.target.value);
  };

  const onClick = () => setSearchText('');

  return (
    <div className='searchBar'>
      <Input
        type='text'
        placeholder='Filter contacts'
        onChange={(e) => onChange(e)}
        value={searchText}
        className='py-4'
      />
      <i className='fas fa-times-circle eraseIcon' onClick={onClick}></i>
    </div>
  );
};

export default ContestantsSearch;
