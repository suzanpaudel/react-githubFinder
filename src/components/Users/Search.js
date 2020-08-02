import React, { useState, useContext } from 'react';
import GithubContext from '../../context/github/githubContext';
import AlertContext from '../../context/alert/alertContext';

const Search = (props) => {
  const githubContext = useContext(GithubContext);
  const alertContext = useContext(AlertContext);

  const [searchedText, setSearchedText] = useState('');

  const changeTextHandler = (event) => {
    setSearchedText(event.target.value);
  };

  const submitFormHandler = (event) => {
    event.preventDefault();
    if (searchedText === '') {
      alertContext.setAlert('Please enter something', 'light');
    } else {
      githubContext.searchUsers(searchedText);
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
      {githubContext.users.length > 0 ? (
        <button
          className='btn btn-light btn-block'
          onClick={githubContext.clearUsers}
        >
          Clear
        </button>
      ) : null}
    </div>
  );
};

export default Search;
