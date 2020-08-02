import React, { useState } from 'react';

const Search = (props) => {
  const [searchedText, setSearchedText] = useState('');

  const changeTextHandler = (event) => {
    setSearchedText(event.target.value);
  };

  const submitFormHandler = (event) => {
    event.preventDefault();
    if (searchedText === '') {
      props.setAlert('Please enter something', 'light');
    } else {
      props.searchUsers(searchedText);
      setSearchedText('');
    }
  };
  return (
    <div>
      <form className='form' onSubmit={submitFormHandler}>
        <input
          type='text'
          name='text'
          placeholder='Search User...'
          value={searchedText}
          onChange={changeTextHandler}
        />
        <input
          type='submit'
          value='Search'
          className='btn btn-dark btn-block'
        />
      </form>
      {props.users.length > 0 ? (
        <button className='btn btn-light btn-block' onClick={props.clearUsers}>
          Clear
        </button>
      ) : null}
    </div>
  );
};

export default Search;
