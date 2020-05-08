import React, { Component } from 'react';
import { Navbar, NavbarBrand } from 'reactstrap';
import Menu from './MenuComponent';
import DishDetail from './DishdetailComponent';
import { DISHES } from '../shared/dishes';
import {COMMENTS} from '../shared/comments'
import {LEADERS} from '../shared/leaders'
import {PROMOTIONS} from '../shared/promotions'

import HeaderComponent from './HeaderComponent';
import FooterCompoenent from './FooterComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Home from './HomeComponent';
import {Switch, Route, Redirect} from 'react-router-dom';
import Contact from './ContactComponent'
import About from './AboutComponent'

class Main extends Component {

  constructor(props) {
    super(props);
    this.state = {
        dishes: DISHES,
        comments: COMMENTS,
        leaders: LEADERS,
        promotions: PROMOTIONS,
        selectedDish: 2
    };
  }

//   onDishSelect(dishId) {
//     this.setState({ selectedDish: dishId});
//   }

  render() {

    const HomePage = () => {
        return (
            <Home dish={this.state.dishes.filter((dish)=>dish.featured)[0]}
              promotion={this.state.promotions.filter((promo)=>promo.featured)[0]}
              leader={this.state.leaders.filter((leader)=>leader.featured)[0]} />
        )
    }

    //router passa qui tre props, match ... etc
    const DishWithId = ({match}) => {
        return(
          <DishDetail 
            dish={this.state.dishes.filter(
                (dish)=>dish.id === parseInt(match.params.dishId, 10)
              )[0]}
            comments={this.state.comments.filter(
                (comment)=>comment.dishId===parseInt(match.params.dishId, 10)
              )} />
        )
    }

    return (
      <div>
        <Header />
        <Switch>
            <Route path="/home" component={HomePage} />
            <Route exact path="/menu" component={()=><Menu dishes={this.state.dishes} />} />
            <Route path='/menu/:dishId' component={DishWithId} />
            <Route exact path="/contactus" component={Contact} />
            <Route exact path="/aboutus" component={()=><About leaders={this.state.leaders} />} />
            <Redirect to="/home" />
        </Switch>
        <Footer />
        {/* <Menu dishes={this.state.dishes} onClick={(dishId) => this.onDishSelect(dishId)} />
        <DishDetail dish={this.state.dishes.filter((dish) => dish.id === this.state.selectedDish )[0]} />
         */}
      </div>
    );
  }
}

export default Main;