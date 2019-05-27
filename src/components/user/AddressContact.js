import React, { Component } from "react";
import {Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import axios from "axios";
import cookies from "universal-cookie";
import { onEdit } from '../../actions'
import {Link} from 'react-router-dom'
import image from '../../img/avatar2.jpg'


const cookie = new cookies();




class AddressContact extends Component {
  cardheader = {
    backgroundColor: "#d3d3d3"
  }
  state = {
    edit: true,
    data: undefined 
  };
  saveProfile = async id => {
    const firstname = this.firstname.value;
    const lastname = this.lastname.value;
    const username = this.username.value;
    const address = this.address.value;
    const email = this.email.value;
    const birthday = this.birthday.value;
    await this.props.onEdit(
      id,
      firstname,
      lastname,
      username,
      birthday,
      address,
      email
    );
    await this.getProfile(id);
    this.setState({ edit: !this.state.edit });
  };
  
  componentDidMount() {
    const userid = cookie.get("idLogin");
    this.getAddress(userid);
  }
  getAddress = async userid => {
    try {
      const res = await axios.get(
        `http://localhost:2000/user/info/${userid}`
      );

      this.setState({
        data: res.data
      });
      
    } catch (e) {
      console.log(e);
    }
  };
  
  address = () => {
    const {address,kecamatan,kelurahan,kabupaten,provinsi,kodepos,notelp} = this.state.data[0];
    console.log(this.state.data);

    if (this.state.edit) {
      return (
        <div>
          <div className="card-body">
            <li className="list-group-item pl-1"><p className="font-weight-bold">Address : </p><p className="lead ">{address}</p></li>
            <li className="list-group-item pl-1"><p className="font-weight-bold">Kodepos : </p><p className="lead ">{kodepos}</p></li>
            <li className="list-group-item pl-1"><p className="font-weight-bold">Provinsi : </p><p className="lead ">{provinsi}</p></li>
            <li className="list-group-item pl-1"><p className="font-weight-bold">Kabupaten/Kota : </p><p className="lead ">{kabupaten}</p></li>
            <li className="list-group-item pl-1"><p className="font-weight-bold">Kecamatan : </p><p className="lead ">{kecamatan}</p></li>
            <li className="list-group-item pl-1"><p className="font-weight-bold">Kelurahan : </p><p className="lead ">{kelurahan}</p></li>
            <li className="list-group-item pl-1"><p className="font-weight-bold">Phone Number : </p><p className="lead ">{notelp}</p></li>
          </div>
          <div className="card-footer">
            <div className="d-flex justify-content-between">
              <button
                onClick={() => {
                  this.setState({ edit: !this.state.edit });
                }}
                className="btn btn-outline-warning"
              >
                Edit Profile
              </button>
            </div>
          </div>
        </div>
      );
    }
    return (
      <div>
        <li className="list-group-item pl-0">
          <input
            type="text"
            className="form-control"
            ref={input => {
              this.firstname = input;
            }}
            // defaultValue={firstname}
          />
        </li>
        <li className="list-group-item pl-0">
          <input
            type="text"
            className="form-control"
            ref={input => {
              this.lastname = input;
            }}
            // defaultValue={lastname}
          />
        </li>
        <li className="list-group-item pl-0">
          <input
            type="text"
            className="form-control"
            ref={input => {
              this.username = input;
            }}
            // defaultValue={username}
          />
        </li>
        <li className="list-group-item pl-0">
          <input
            type="date"
            className="form-control"
            ref={input => {
              this.birthday = input;
            }}
            // defaultValue={date}
          />
        </li>
        <li className="list-group-item pl-0">
          <input
            type="text"
            className="form-control"
            ref={input => {
              this.address = input;
            }}
            // defaultValue={address}
          />
        </li>
        <li className="list-group-item pl-0">
          <input
            type="text"
            className="form-control"
            ref={input => {
              this.email = input;
            }}
            // defaultValue={email}
          />
        </li>
        <li className="list-group-item px-0">
          <div className="d-flex justify-content-center">
            <button
              onClick={() => {
                // this.saveProfile(id);
              }}
              className="btn btn-outline-primary"
            >
              save
            </button>
          </div>
        </li>
        <li className="list-group-item px-0">
          <div className="d-flex justify-content-center">
            <button
              onClick={() => {
                this.setState({ edit: !this.state.edit });
              }}
              className="btn btn-outline-danger"
            >
              cancel
            </button>
          </div>
        </li>
      </div>
    );
  };

  render() {
    if (cookie.get("stillLogin")) {
        if (this.state.data !== undefined) {
        return (
          <div className="container">
            <div className="row">
              <div className="col-3">
                <div className="card p-0">
                  <h3 className="text-center card-title p-3">
                    Your Account
                  </h3>
                  <div className="card-header">
                    <Link to="/profile" className="text-dark">
                      <p className="lead text-center">Profile</p>
                    </Link>
                  </div>
                  <div className="card-header" style={this.cardheader}>
                    <Link to="/addresscontact" className="text-dark">
                      <p className="lead text-center">
                        Address & Contact Info
                      </p>
                    </Link>
                  </div>
                  <div className="card-header">
                    <p className="lead text-center">My Orders</p>
                  </div>
                  <div className="card-header">
                    <p className="lead text-center">Order History</p>
                  </div>
                  <div className="card-header">
                    <p className="lead text-center">
                      Payment Confirmation
                    </p>
                  </div>
                  <div className="card-body" />
                </div>
              </div>
              <div className="col-9">
                <div className="card">
                <ul className="list-group list-group-flush">
                  <div className="card-header">
                    <h3>Address & Contact Info</h3>
                  </div>
                  {this.address()}
                    </ul>
                </div>
              </div>
            </div>
          </div>
        );
    } else {
        return <h1>Loading</h1>;
      }
    } else {
      return <Redirect to="/login" />;
    }
  }
}

const mapStateToProps = state => {
  return { user: state.auth };
};

export default connect(
  mapStateToProps,
  {onEdit}
)(AddressContact);
