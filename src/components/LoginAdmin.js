import React, { Component } from 'react'
import {Link} from 'react-router-dom'

class LoginAdmin extends Component {
    render(){
        return(
            <div>
            <div className="mt-5 row">
                <div className="col-sm-6 col-md-3 mx-auto card">
                    <div className="card-body">
                        <div className="border-bottom border-secondary card-title">
                            <h1>Login as Admin</h1>
                        </div>
                        <div className="card-title mt-1">
                            <h4>Username</h4>
                        </div>
                        <form className="input-group">
                            <input ref={input => {this.username = input}} className="form-control" type="text"/></form>
                        <div className="card-title mt-1">
                            <h4>Password</h4>
                        </div>
                        <form className="input-group">
                            <input ref={input => {this.password = input}}className="form-control" type="password"/>
                        </form>
                        <button className="btn btn-dark btn-block mt-5" 
                            onClick={this.onSubmitClick}>Login</button>
                    </div>
                </div>
            </div>
            </div>
        )
    }
}

export default LoginAdmin