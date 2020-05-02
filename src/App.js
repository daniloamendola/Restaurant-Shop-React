import React from 'react';
import Menu from './components/MenuComponent';
import {Navbar, NavbarBrand} from 'reactstrap';

import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <Navbar />  
      <Menu />
    </div>
  );
}

export default App;
