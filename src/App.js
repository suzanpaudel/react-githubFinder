import React, { useState } from 'react';
import axios from 'axios';
import { BrowserRouter, Route } from 'react-router-dom';

import './App.css';
import Navbar from './components/Layout/Navbar';
import Users from './components/Users/Users';
import User from './components/Users/User';
import Search from './components/Users/Search';
import Alert from './components/Layout/Alert';
import About from './components/Pages/About';

const App = () => {
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState({});
  const [repos, setRepos] = useState([]);
  const [alert, setAlert] = useState(null);
  const [loading, setLoading] = useState(false);

  const searchUsersHandler = (text) => {
    setLoading(true);
    axios
      .get(
        `https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
      )
      .then((res) => {
        setUsers(res.data.items);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  };

  const getSingleUser = (username) => {
    setLoading(true);
    axios
      .get(
        `https://api.github.com/users/${username}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
      )
      .then((res) => {
        setUser(res.data);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  };

  const getUserRepos = (username) => {
    setLoading(true);
    axios
      .get(
        `https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
      )
      .then((res) => {
        setRepos(res.data);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  };

  const clearUserHandler = () => {
    setUsers([]);
    setLoading(false);
  };

  const setAlertHandler = (msg, type) => {
    setAlert({ msg: msg, type: type });
    setTimeout(() => {
      setAlert(null);
    }, 3000);
  };

  return (
    <BrowserRouter>
      <div className='App'>
        <Navbar title='GithubFinder' icon='fab fa-github' />
        <div className='container'>
          <Alert alert={alert} />
          <Route
            exact
            path='/'
            render={(props) => (
              <React.Fragment>
                <Search
                  searchUsers={searchUsersHandler}
                  clearUsers={clearUserHandler}
                  users={users}
                  setAlert={setAlertHandler}
                />
                <Users loading={loading} users={users} />
              </React.Fragment>
            )}
          />
          <Route exact path='/about' component={About} />
          <Route
            exact
            path='/user/:login'
            render={(props) => (
              <User
                {...props}
                getUser={getSingleUser}
                user={user}
                loading={loading}
                getUserRepos={getUserRepos}
                repos={repos}
              />
            )}
          />
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;
