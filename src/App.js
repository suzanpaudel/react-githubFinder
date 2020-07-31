import React, { Component } from 'react';
import axios from 'axios';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import './App.css';
import Navbar from './components/Layout/Navbar';
import Users from './components/Users/Users';
import User from './components/Users/User';
import Search from './components/Users/Search';
import Alert from './components/Layout/Alert';
import About from './components/Pages/About';

class App extends Component {
  state = {
    users: [],
    user: {},
    repos: [],
    loading: false,
    alert: null,
  };

  // componentDidMount() {
  //   this.setState({ loading: true });
  //   axios
  //     .get(
  //       `https://api.github.com/users?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
  //     )
  //     .then((res) => this.setState({ users: res.data, loading: false }))
  //     .catch((err) => console.log(err));
  // }

  searchUsersHandler = (text) => {
    this.setState({ loading: true });
    axios
      .get(
        `https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
      )
      .then((res) => this.setState({ users: res.data.items, loading: false }))
      .catch((err) => console.log(err));
  };

  getSingleUser = (username) => {
    this.setState({ loading: true });
    axios
      .get(
        `https://api.github.com/users/${username}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
      )
      .then((res) => this.setState({ user: res.data, loading: false }))
      .catch((err) => console.log(err));
  };

  getUserRepos = (username) => {
    this.setState({ loading: true });
    axios
      .get(
        `https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
      )
      .then((res) => this.setState({ repos: res.data, loading: false }))
      .catch((err) => console.log(err));
  };

  clearUserHandler = () => {
    this.setState({ users: [], loading: false });
  };

  setAlertHandler = (msg, type) => {
    this.setState({ alert: { msg: msg, type: type } });
    setTimeout(() => {
      this.setState({ alert: null });
    }, 3000);
  };

  render() {
    return (
      <BrowserRouter>
        <div className='App'>
          <Navbar title='GithubFinder' icon='fab fa-github' />
          <div className='container'>
            <Alert alert={this.state.alert} />
            <Route
              exact
              path='/'
              render={(props) => (
                <React.Fragment>
                  <Search
                    searchUsers={this.searchUsersHandler}
                    clearUsers={this.clearUserHandler}
                    users={this.state.users}
                    setAlert={this.setAlertHandler}
                  />
                  <Users
                    loading={this.state.loading}
                    users={this.state.users}
                  />
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
                  getUser={this.getSingleUser}
                  user={this.state.user}
                  loading={this.state.loading}
                  getUserRepos={this.getUserRepos}
                  repos={this.state.repos}
                />
              )}
            />
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
