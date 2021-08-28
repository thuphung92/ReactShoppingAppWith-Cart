import './App.css';
import { Switch, Route } from 'react-router-dom';
import Home from './views/Home';
import Login from './views/Login';
import Logout from './views/Logout';
import Cart from './views/Cart';
import SingleProduct from './views/SingleProduct';
import AddProduct from './views/AddProduct';
import UpdateProduct from './views/UpdateProduct';
import NavBar from './components/NavBar';

import ProtectedRoute from './components/ProtectedRoute'
import React, { Component } from 'react'

export default class App extends Component {
  constructor() {
    super();
    this.state={
      username:'',
      token:'',
      cart:{}
    }
  }

  static getDerivedStateFromProps=(props,state)=>{
    return {
      token: localStorage.getItem("token"),
      username: localStorage.getItem("username"),
      cart: localStorage.getItem("cart")
      ? JSON.parse(localStorage.getItem("cart"))
      : {},}
  }
  
  setUser = (username)  =>{
    this.setState({username});
  }
  
  setToken=(token)=>{
    this.setState({token})
  }
  
  doLogout=()=>{
    localStorage.clear()
    this.setToken('')
    this.setUser('')
  }

  //shopping cart
  addToCart=(product)=>{
    let cart = this.state.cart;
    if (cart[product.title]) {
      cart[product.title].quantity++;
    } else {
      cart[product.title] = { ...product, quantity: 1 };
    }
    this.setState({ cart });
    //addline later
    localStorage.setItem("cart", JSON.stringify(cart));
    alert(`${product.title} was sucessfully added to your cart`);
  }
  
  removeFromCart=(product)=>{
    let cart = this.state.cart;
    if (cart[product.title].quantity > 1) {
      cart[product.title].quantity--;
    } else if (cart[product.title].quantity === 1) {
      delete cart[product.title];
    }
    this.setState({ cart });
    //addline later
    localStorage.setItem("cart", JSON.stringify(cart));
    alert(`${product.title} has been removed from your cart`);
  }

  removeAllFromCart=(product)=>{
    let cart = this.state.cart;
    if (cart[product.title]) {
      delete cart[product.title];
    }
    this.setState({ cart });
    //addlinelate
    localStorage.setItem("cart", JSON.stringify(cart));
    alert(`There is no ${product.title} in your cart`)
  }

  getCartProductTotal=()=>{
    let total = 0;
    for (const product in JSON.parse(localStorage.getItem("cart"))) {
      total += JSON.parse(localStorage.getItem("cart"))[product].quantity;
    }
    return total;
  }

  getCartTotalPrice=()=>{
    let total = 0;
    for (const product in JSON.parse(localStorage.getItem("cart"))) {
      total +=
        JSON.parse(localStorage.getItem("cart"))[product].price *
        JSON.parse(localStorage.getItem("cart"))[product].quantity;
    }
    return total;
  }

  clearCart=()=>{
    localStorage.removeItem("cart");
    this.setState({cart:{}})
  }

  render() {
    return (
      <div>
         <NavBar getCartProductTotal={this.getCartProductTotal} getCartTotalPrice={this.getCartTotalPrice} token={this.state.token} username={this.state.username}/>

          <Switch>
            <ProtectedRoute token={this.state.token} exact path = "/" render={()=><Home addToCart={this.addToCart} />}/>
            <ProtectedRoute token={this.state.token} exact path = "/product:id" render={(props)=><SingleProduct addToCart={this.addToCart} {...props} />}/>
            <ProtectedRoute token={this.state.token} exact path = "/addproduct" render={()=><AddProduct/>}/>
            <ProtectedRoute token={this.state.token} exact path = "/updateproduct" render={()=><UpdateProduct/>}/>
            <ProtectedRoute token={this.state.token} exact path = "/logout" render={()=><Logout doLogout={this.doLogout}/>}/>
            <ProtectedRoute token={this.state.token} exact path = "/cart" render={()=>
                            <Cart 
                            cart={this.state.cart}
                            removeFromCart={this.removeFromCart}
                            removeAllFromCart={this.removeAllFromCart}
                            getCartProductTotal={this.getCartProductTotal}
                            getCartTotalPrice={this.getCartTotalPrice}/>}/>

            <Route exact path = "/login" render={()=><Login setToken={this.setToken} setUser={this.setUser}/>}/>
          </Switch>
      </div>
    )
  }
}
