import React, { Component } from 'react'
import {BrowserRouter, Route} from 'react-router-dom'
import cookies from 'universal-cookie'
import {connect} from 'react-redux'

import {keepLogin} from '../actions'

import Home from './user/Home'
import Header from './user/Header'
import Products from './user/Products'
import Login from './user/Login'
import Register from './user/Register'
import ManageProduct from './admin/ManageProduct'
import ManageUser from './admin/ManageUser'
import ManageGenre from './admin/ManageGenre'
import ManageAuthorPublisher from './admin/ManageAuthorPublisher'
import DetailProduct from './user/DetailProduct'
import ShoppingCart from './user/ShoppingCart'
import LoginAdmin from './admin/LoginAdmin';
import DashboardAdmin from './admin/DashboardAdmin';
import Profile from './user/Profile';
import AddressContact from './user/AddressContact';

const cookie = new cookies()


class App extends Component {

    componentDidMount(){
        var userCookie = cookie.get("stillLogin");
        var idCookie = parseInt(cookie.get("idLogin"));
        var roleCookie = parseInt(cookie.get("role"));


        if (userCookie !== undefined || idCookie !== NaN || roleCookie !== NaN) {
            
            this.props.keepLogin(userCookie, idCookie,roleCookie);
        
        }
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
                <Route path="/profile" component={Profile}/>
                <Route path="/addresscontact" component={AddressContact}/>
                <Route path="/manageproduct" component={ManageProduct}/>
                <Route path="/manageuser" component={ManageUser}/>
                <Route path="/managegenre" component={ManageGenre}/>
                <Route path="/manageauthorpublisher" component={ManageAuthorPublisher}/>
                <Route path="/detailproduct/:idproduct" component={DetailProduct}/>
                <Route path="/shoppingcart" component={ShoppingCart}/>
                <Route path="/admin/login" component={LoginAdmin}/>
                <Route path="/admin/dashboard" component={DashboardAdmin}/>
            </div>
        </BrowserRouter>
            
        )
    }
}




export default connect (null, {keepLogin})(App);