import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import { Logout } from "../../actions";


import {onLoginClick} from '../../actions'
import {afterTwoSeconds} from '../../actions'

class Header extends Component {
    onSubmitClick = () => {
        const user = this.username.value
        const pass = this.password.value
        this.props.onLoginClick(user, pass)
    }
    onErrorLogin = () => {
        if (this.props.error !== '') {
            return (
                <div>
                    <div className="alert alert-danger mt-4 text-center">
                        {this.props.error}
                    </div>
                </div>
            )
             } else {
            return null
        }
        
    }
    logout = () => {
        console.log("logout");
        
        this.props.Logout()
    }
  render() {
    const { username,role } = this.props.user;
    
    if (role === 1) {
      return (
        <div>
          {/* <Redirect to="/admin/dashboard" /> */}
          <nav className="navbar navbar-expand-md navbar-dark bg-dark mb-3">
            <div className="container">
              <Link className="navbar-brand" to="/">
                FATANONLINEBOOKSTORE
              </Link>
              <button
                className="navbar-toggler"
                data-toggle="collapse"
                data-target="#navbarNav2"
              >
                <span className="navbar-toggler-icon" />
              </button>

              <div
                className="collapse navbar-collapse row"
                id="navbarNav2"
              >
                <ul className="navbar-nav col-12">
                  <li className="nav-item m-2 ml-auto">

                  </li>
                  <li className="nav-item m-1 mx-auto mx-lg-0 m-lg-2">
                    <Link
                      className="nav-link"
                      to="/admin/dashboard"
                    >
                      <i className="fas fa-home fa-2x text-secondary" />
                    </Link>
                    
                  </li>
                  <li className="nav-item dropdown m-1 mx-auto mx-lg-0 m-lg-2">
                    <Link
                      className="nav-link"
                      data-toggle="dropdown"
                      to="/"
                    >
                      <i className="fas fa-user fa-2x text-secondary" />
                    </Link>
                      <div className="dropdown-menu form-wrapper">
                      <div className="mx-auto card">
                        <div className="card-body">
                          <p className="lead text-center">Halo admin {username} !</p>
                          <button
                            className="btn btn-secondary btn-block mt-5"
                            onClick={this.logout}
                          >
                            Logout
                          </button>
                        </div>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
        </div>
      );
      
    } else if(role === 2){
      return (
        <div>
          <nav className="navbar navbar-expand-md navbar-dark bg-dark mb-3">
            <div className="container">
              <Link className="navbar-brand" to="/">
                FATANONLINEBOOKSTORE
              </Link>
              <button
                className="navbar-toggler"
                data-toggle="collapse"
                data-target="#navbarNav2"
              >
                <span className="navbar-toggler-icon" />
              </button>

              <div
                className="collapse navbar-collapse row"
                id="navbarNav2"
              >
                <ul className="navbar-nav col-12">
                  <li className="nav-item m-2 ml-auto">
                    <form className="navbar-form form-inline">
                      <div className="input-group search-box">
                        <input
                          type="text"
                          id="search"
                          className="form-control"
                          placeholder="Search here..."
                        />
                        <span className="input-group-addon">
                          <i className="fas fa-search" />
                        </span>
                      </div>
                    </form>
                  </li>
                  <li className="nav-item dropdown m-1 mx-auto mx-lg-0 m-lg-2">
                    <i className="fas fa-user fa-2x text-secondary" />
                    <div className="dropdown-menu form-wrapper">
                      <div className="card">
                        <p className="card-title text-center text-bold" style={{fontSize:25}}>Hai {username}!</p>
                        <div className="card-body">
                          <Link to="/profile">
                            <p className="text-center text-dark">Profile</p>
                          </Link>
                          <Link to="/">
                            <p className="text-center text-dark">Your Address</p>
                          </Link>
                          <Link to="/">
                            <p className="text-center text-dark">Orders</p>
                          </Link>
                          <Link to="/">
                            <p className="text-center text-dark">History Orders</p>
                          </Link>
                          <Link to="/">
                            <p className="text-center text-dark">Payment Confirmation</p>
                          </Link>
                          <button
                            className="btn btn-light btn-block mt-5"
                            onClick={this.logout}
                          >
                            Logout <i className="fas fa-sign-out-alt text-secondary"></i>
                          </button>
                        </div>
                      </div>
                    </div>
                  </li>
                  <li className="nav-item m-1 mx-auto mx-lg-0 m-lg-2">
                    <Link className="nav-a" to="/">
                      <i className="fas fa-heart fa-2x text-secondary" />
                    </Link>
                  </li>
                  <li className="nav-item m-1 mx-auto mx-lg-0 m-lg-2">
                    <Link className="nav-a" to="/ShoppingCart">
                      <i className="fas fa-shopping-cart fa-2x text-secondary" />
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
        </div>
      );
    }else{
      return (
        <div>
          <nav className="navbar navbar-expand-md navbar-dark bg-dark mb-3">
            <div className="container">
              <Link className="navbar-brand" to="/">
                FATANONLINEBOOKSTORE
              </Link>
              <button
                className="navbar-toggler"
                data-toggle="collapse"
                data-target="#navbarNav2"
              >
                <span className="navbar-toggler-icon" />
              </button>

              <div
                className="collapse navbar-collapse row"
                id="navbarNav2"
              >
                <ul className="navbar-nav col-12">
                  <li className="nav-item m-2 ml-auto">
                    <form className="navbar-form form-inline">
                      <div className="input-group search-box">
                        <input
                          type="text"
                          id="search"
                          className="form-control"
                          placeholder="Search here..."
                        />
                        <span className="input-group-addon">
                          <i className="fas fa-search" />
                        </span>
                      </div>
                    </form>
                  </li>
                  <li className="nav-item dropdown m-1 mx-auto mx-lg-0 m-lg-2">
                    <i className="fas fa-user fa-2x text-secondary" />

                    <div className="dropdown-menu form-wrapper">
                      <div className="mx-auto card">
                        <div className="card-body">
                          <div className="border-bottom border-secondary card-title">
                            <Link to="/login" className="text-dark">
                              <h1 className="text-center">Login</h1>
                            </Link>
                          </div>
                          <div className="card-title mt-1">
                            <h4>Username</h4>
                          </div>
                          <form className="input-group">
                            <input
                              ref={input => {
                                this.username = input;
                              }}
                              className="form-control"
                              type="text"
                            />
                          </form>
                          <div className="card-title mt-1">
                            <h4>Password</h4>
                          </div>
                          <form className="input-group">
                            <input
                              ref={input => {
                                this.password = input;
                              }}
                              className="form-control"
                              type="password"
                            />
                          </form>
                          <button
                            className="btn btn-secondary btn-block mt-5"
                            onClick={this.onSubmitClick}
                          >
                            Login
                          </button>
                          {/* {this.onErrorLogin()}
                          {this.props.afterTwoSeconds()} */}

                          <p className="lead text-center">
                            Don't have account ?
                          </p>
                            <Link to="/register"><p className="lead text-center">
                              Sign Up!
                              </p>
                              </Link>
                        </div>
                      </div>
                    </div>
                  </li>
                  <li className="nav-item m-1 mx-auto mx-lg-0 m-lg-2">
                    <Link className="nav-a" to="/">
                      <i className="fas fa-heart fa-2x text-secondary" />
                    </Link>
                  </li>
                  <li className="nav-item m-1 mx-auto mx-lg-0 m-lg-2">
                    <Link className="nav-a" to="/ShoppingCart">
                      <i className="fas fa-shopping-cart fa-2x text-secondary" />
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
        </div>
      );  
    }
  }
}

const mapStateToProps = state => {
  return { user: state.auth,error : state.auth.error, empty: state.auth.empty };
};

export default connect(
  mapStateToProps,
  { Logout, onLoginClick, afterTwoSeconds }
)(Header);
