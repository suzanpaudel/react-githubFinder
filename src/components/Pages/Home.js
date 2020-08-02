import React from 'react';
import Users from '../Users/Users';
import Search from '../Users/Search';

const Home = () => {
  return (
    <React.Fragment>
      <Search />
      <Users />
    </React.Fragment>
  );
};

export default Home;
