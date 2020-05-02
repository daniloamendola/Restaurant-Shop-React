import React from 'react';
import Menu from './components/MenuComponent';
import { DISHES } from './shared/dishes';

import logo from './logo.svg';
import './App.css';

class App extends React.Component {
  constructor(props){
    super();
    this.state = {
      dishes : DISHES
    }
  }

  render(){
    return (
        <Menu dishes={this.state.dishes} />
    );  
  }
}

export default App;
