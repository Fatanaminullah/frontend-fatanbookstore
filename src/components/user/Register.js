import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import axios from "axios";

import { onRegister } from "../../actions";
import { afterTwoSeconds } from "../../actions";

class Register extends Component {
    state = {
        kodepos : [],
        filterKodepos : [],
        address:[]
    }
    componentDidMount() {
      this.getKodepos();
    }
  onRegisterClick = () => {
    const firstname = this.firstname.value;
    const lastname = this.lastname.value;
    const username = this.username.value;
    const email = this.email.value;
    const password = this.password.value;
    const birthday = this.birthday.value;
    const address = this.address.value;
    const kodepos = this.kodepos.value;
    this.props.onRegister(
      firstname,
      lastname,
      username,
      email,
      password,
      birthday,
      address,
      kodepos
    );
  };
  onErrorRegister = () => {
    if (this.props.error !== "") {
      return (
        <div className="alert alert-danger mt-4 text-center">
          {this.props.error}
        </div>
      );
    } else if (this.props.empty !== "") {
      return (
        <div className="alert alert-danger mt-4 text-center">
          {this.props.empty}
        </div>
      );
    } else {
      return null;
    }
  };
  onRegSuccess = () => {
    if (this.props.success !== "") {
      return (
        <div className="alert alert-success mt-4 text-center">
          {this.props.success}
        </div>
      );
    } else {
      return null;
    }
  };
  getKodepos = async () => {
    try {
      const res = await axios.get(`http://localhost:2000/kodepos`);
      this.setState({
        kodepos: res.data
      });
      
    } catch (e) {
      console.log(e);
    }
  };
  selectKodepos = () => {
    return this.state.filterKodepos.map(item => {
      return (
        <option key={item.id} value={item.id}>
          {item.kodepos}
        </option>
      );
    });
  };
  filterKodepos = () => {
    const search = this.searchKodepos.value;
    

    if (search.length > 2){
        var arrSearch = this.state.kodepos.filter(item => {
          return item.kodepos.toLowerCase().includes(search);
        });
        this.setState({ filterKodepos: arrSearch });
    }
    if(search.length === 0){
        this.setState({ filterKodepos: [] });
    }
  };
  filterAddress = () => {
      const id = this.kodepos.value

      if(id === ""){
        this.setState({
          address:[]
        })
      }
      axios
        .get(`http://localhost:2000/address/${id}` 
        )
        .then(res => {
          console.log(res.data);
            
            this.setState({
                address: res.data
            });
            
          });
        
  }
  detailAddress = () => {
    if (this.state.address[0] !== undefined) {
      const {
        provinsi,
        kabupaten,
        kecamatan,
        kelurahan
      } = this.state.address[0];
      var address = `${kelurahan}, ${kecamatan}, ${kabupaten}, ${provinsi}`;
      return (
        <form className="input-group">
          <input
            className="form-control"
            type="text"
            placeholder={address}
            disabled
          />
        </form>
      );
    } else {
      return (
        <form className="input-group">
          <input
            className="form-control"
            type="text"
            placeholder="select your postal code"
            disabled
          />
        </form>
      );
    }
  }

  render() {
    return (
      <div className="container">
        <div className="mt-5 row">
          <div className="col-12 card">
            <div className="border-bottom border-secondary card-title">
              <h3 className="p-3 text-center">
                Create Your Account to Start Shopping!
              </h3>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-12 col-md-6 mx-auto card">
            <div className="card-body">
              <div className="card-title mt-1">
                <h4>FirstName</h4>
              </div>
              <form className="input-group">
                <input
                  ref={input => {
                    this.firstname = input;
                  }}
                  className="form-control"
                  type="text"
                /><p className="text-danger" style={{fontSize:25}}>*</p>
              </form>
              <div className="card-title mt-1">
                <h4>Lastname</h4>
              </div>
              <form className="input-group">
                <input
                  ref={input => {
                    this.lastname = input;
                  }}
                  className="form-control"
                  type="text"
                /><p className="text-danger" style={{fontSize:25}}>*</p>
              </form>
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
                /><p className="text-danger" style={{fontSize:25}}>*</p>
              </form>
              <div className="card-title mt-1">
                <h4>Email</h4>
              </div>
              <form className="input-group">
                <input
                  ref={input => {
                    this.email = input;
                  }}
                  className="form-control"
                  type="email"
                /><p className="text-danger" style={{fontSize:25}}>*</p>
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
                /><p className="text-danger" style={{fontSize:25}}>*</p>
              </form>
            </div>
          </div>
          <div className="col-sm-12 col-md-6 mx-auto card">
            <div className="card-title mt-1">
              <h4>Birthday</h4>
            </div>
            <form className="input-group">
              <input
                ref={input => {
                  this.birthday = input;
                }}
                className="form-control"
                type="date"
              />
            </form>
            <div className="card-title mt-1">
              <h4>Address</h4>
            </div>
            <form className="input-group">
              <input
                ref={input => {
                  this.address = input;
                }}
                className="form-control"
                type="text"
              />
            </form>
            <div className="card-title mt-1">
              <h4>Postal Code</h4>
            </div>
            <form className="input-group">
              <div className="input-group search-box">
                <input
                  type="text"
                  ref={input => (this.searchKodepos = input)}
                  className="form-control"
                  placeholder="Search Postal Code Here..."
                  onKeyUp={this.filterKodepos}
                />
                <span className="input-group-addon">
                  <i className="fas fa-search" />
                </span>
              </div>
              <select
                className="custom-select"
                ref={input => {
                  this.kodepos = input;
                }}
                onClick={this.filterAddress}
              >
                {this.selectKodepos()}
              </select>
            </form>
            <button className="btn btn-primary" onClick={this.filterAddress}>OK</button>
            <div className="card-title mt-1">
              <h4>Detail Address</h4>
            </div>
            {this.detailAddress()}
            <button
              className="btn btn-success btn-block mt-5"
              onClick={this.onRegisterClick}
            >
              Sign Up
            </button>
            {/* {this.onErrorRegister()}
            {this.onRegSuccess()}
            {this.props.afterTwoSeconds()} */}
            <p className="lead">
              Do you have an account ? <Link to="/login">Login</Link>
            </p>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    error: state.auth.error,
    success: state.auth.success,
    empty: state.auth.empty
  };
};

export default connect(
  mapStateToProps,
  { onRegister, afterTwoSeconds }
)(Register);
