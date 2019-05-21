import React, { Component } from 'react'
import {BrowserRouter, Route} from 'react-router-dom'
import cookies from 'universal-cookie'
import {connect} from 'react-redux'

import {keepLogin} from '../actions'

import Home from './Home'
import Header from './Header'
import Products from './Products'
import Login from './Login'
import Register from './Register'
import ManageProduct from './ManageProduct'
import ManageUser from './ManageUser'
import ManageGenre from './ManageGenre'
import DetailProduct from './DetailProduct'
import ShoppingCart from './ShoppingCart'
import LoginAdmin from './LoginAdmin';
import DashboardAdmin from './DashboardAdmin';
// import ProductItems from './ProductItems'

const cookie = new cookies()


class App extends Component {

    componentDidMount(){
        this.props.keepLogin(
            cookie.get("stillLogin"),
            cookie.get("idLogin"),
            cookie.get("role")
          );
        }

    render () {
        return (
        <BrowserRouter>
            <div>
                <Header/>
                <Route path="/" exact component={Home}/>
                <Route path="/products" component={Products}/>
                <Route path="/login" component={Login}/>
                <Route path="/register" component={Register}/>
                <Route path="/manageproduct" component={ManageProduct}/>
                <Route path="/manageuser" component={ManageUser}/>
                <Route path="/managegenre" component={ManageGenre}/>
                <Route path="/detailproduct/:asdfg" component={DetailProduct}/>
                <Route path="/shoppingcart" component={ShoppingCart}/>
                <Route path="/admin/login" component={LoginAdmin}/>
                <Route path="/admin/dashboard" component={DashboardAdmin}/>
            </div>
        </BrowserRouter>
            
        )
    }
}




export default connect (null, {keepLogin})(App);