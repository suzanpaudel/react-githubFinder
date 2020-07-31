import React, { Component } from 'react';

class Search extends Component {
  state = {
    searchedText: '',
  };

  changeTextHandler = (event) => {
    this.setState({ searchedText: event.target.value });
  };

  submitFormHandler = (event) => {
    event.preventDefault();
    if (this.state.searchedText === '') {
      this.props.setAlert('Please enter something', 'light');
    } else {
      this.props.searchUsers(this.state.searchedText);
      this.setState({ searchedText: '' });
    }
  };
  render() {
    return (
      <div>
        <form className='form' onSubmit={this.submitFormHandler}>
          <input
            type='text'
            name='text'
            placeholder='Search User...'
            value={this.state.searchedText}
            onChange={this.changeTextHandler}
          />
          <input
            type='submit'
            value='Search'
            className='btn btn-dark btn-block'
          />
        </form>
        {this.props.users.length > 0 ? (
          <button
            className='btn btn-light btn-block'
            onClick={this.props.clearUsers}
          >
            Clear
          </button>
        ) : null}
      </div>
    );
  }
}

export default Search;
