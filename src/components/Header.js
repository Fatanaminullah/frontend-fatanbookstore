import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

import {onLogoutUsers} from '../actions'

class Header extends Component {
    render() {
        const {username} = this.props.user

        if (username === '') {
            return (
                <div>
                    <nav className="navbar navbar-expand-md navbar-light bg-light mb-3">
                        <div className="container">
                            <Link className="navbar-brand" to="/">BUKATOKO</Link>
                            <button className="navbar-toggler" data-toggle="collapse" data-target="#navbarNav2">
                                <span className="navbar-toggler-icon"></span>
                            </button>

                            <div className="collapse navbar-collapse row p-2" id="navbarNav2">
                                <form className="input-group col-12 col-md-7 ml-auto">
                                    <input type="text" className="form-control mr-2" placeholder="Search" />
                                    <button className="btn btn-outline-success">Search</button>
                                </form>
                                <ul className="navbar-nav col-12 col-md-5">
                                    <li className="nav-item m-2 ml-auto">

                                    </li>
                                    <li className="nav-item mx-auto mx-lg-0 m-lg-2">
                                        <Link className="nav-a" to="/">All Product</Link>
                                    </li>

                                    <li className="nav-item m-1 mx-auto mx-lg-0 m-lg-2">
                                        <Link className="nav-a" to="/register"><button className="btn btn-primary">Register</button></Link>
                                    </li>
                                    <li className="nav-item m-1 mx-auto mx-lg-0 m-lg-2">
                                        <Link className="nav-a" to="/login"><button className="btn btn-success">Login</button></Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </nav>
                </div>
            )

        } else {
            return (
                <div>
                    <Redirect to="/" />
                    <nav className="navbar fixed-top sticky-top navbar-expand-md navbar-light bg-light mb-3">
                        <div className="container">
                            <Link className="navbar-brand" to="/">BUKATOKO</Link>
                            <button className="navbar-toggler" data-toggle="collapse" data-target="#navbarNav2">
                                <span className="navbar-toggler-icon"></span>
                            </button>

                            <div className="collapse navbar-collapse row p-2" id="navbarNav2">
                                <form className="input-group col-12 col-md-7 ml-auto">
                                    <input type="text" className="form-control mr-2" placeholder="Search" />
                                    <button className="btn btn-outline-success">Search</button>
                                </form>
                                <ul className="navbar-nav ml-auto col-12 col-md-5">
                                <li className="nav-item m-2 ml-auto">
                                </li>

                                    <li className="nav-item mt-2 mx-auto mx-lg-0 m-lg-2">
                                        <Link className="nav-link" to="/">All Product</Link>
                                    </li>
                                    <li className="nav-item dropdown mt-2 mx-auto mx-lg-0 m-lg-2">
                                        <Link to="/asd" className="nav-link dropdown-toggle" data-toggle="dropdown">Hallo {username}</Link>
                                        <div className="dropdown-menu">
                                            <Link to="/manageproduct" className="dropdown-item">Manage Product</Link>
                                            <Link to="/" className="dropdown-item">Link 2</Link>
                                            <button onClick={this.props.onLogoutUsers} className="dropdown-item">Logout</button>
                                        </div>
                                    </li>
                                    {/* <li className="nav-item m-1">
                                    <Link className="nav-link" to="/register"><button className="btn btn-primary">Register</button></Link>
                                </li>
                                <li className="nav-item m-1">
                                    <Link className="nav-link" to="/login"><button className="btn btn-success">Login</button></Link>
                                </li> */}
                                </ul>
                            </div>
                        </div>
                    </nav>
                </div>
            )
        }

    }
}

const mapStateToProps = state => {
    return { user: state.auth }
}

export default connect(mapStateToProps, {onLogoutUsers})(Header)