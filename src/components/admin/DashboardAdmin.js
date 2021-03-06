import React, { Component } from "react";
import {Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import axios from "../../config/axios";
import cookies from "universal-cookie";
import { onEdit } from '../../actions'
import swal from 'sweetalert'



import Sidebar from "./Sidebar";
import "../style.css";

const cookie = new cookies();

var moment = require('moment');



class DashboardAdmin extends Component {
  state = {
    edit: true,
    data:undefined,
    photo:undefined
  };
  saveProfile = async id => {
    const firstname = this.firstname.value;
    const lastname = this.lastname.value;
    const username = this.username.value;
    const address = this.address.value;
    const email = this.email.value;
    const birthday = this.birthday.value;
    await this.props.onEdit(id,firstname, lastname, username,birthday,address,email);
    await this.getProfile(id)
    this.setState({ edit: !this.state.edit });
  };
  uploadAvatar = async (userid) => {
    const formData = new FormData();
    var imagefile = this.gambar;

    formData.append("avatar", imagefile.files[0]);
    try {
      await axios.post(`/avatar/uploads/${userid}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });
      this.getProfile(userid)
      swal({
        title:'Upload Photo Success!',
        text:'Your profile picture successfully changed!',
        icon:'success'
      })
      
    } catch (e) {
      console.log("upload gagal"+e);
    }
  };

  componentDidMount() {
    const userid = cookie.get('idLogin')
    this.getProfile(userid);
}
handleChange = event => {
  this.setState({
    photo : URL.createObjectURL(event.target.files[0])
  })
}
  getProfile = async (userid) => {        
    
    try {
        const res = await axios.get(`/users/profile/${userid}`);
        console.log(res.data);
        
        this.setState({
          data: res.data,
          photo:res.data.photo
        });
        
    } catch (e) {
      console.log(e);
      
    }
};
  profile = () => {

    const { username, firstname, lastname, age, id , email,address,birthday} = this.state.data.user;
    var birth = moment(birthday)
    var date = birth.utc().format('YYYY-MM-DD')
    
    if (this.state.edit) {
      return (
        <div>
          <div class="card-header">
          <p class="lead text-center"> Admin's Information</p>
          </div>
          <div class="card-body">
          <li class="list-group-item pl-0">{`Firstname: ${firstname}`}</li>
          <li class="list-group-item pl-0">{`Lastname: ${lastname}`}</li>
          <li class="list-group-item pl-0">{`Username: ${username}`}</li>
          <li class="list-group-item pl-0">{`Age: ${age}`}</li>
          <li class="list-group-item pl-0">{`Address: ${address}`}</li>
          <li class="list-group-item pl-0">{`Email: ${email}`}</li>
          </div>
          <div class="card-footer">
            <div class="d-flex justify-content-between">
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
        <li class="list-group-item pl-0">
          <input
            type="text"
            class="form-control"
            ref={input => {
              this.firstname = input;
            }}
            defaultValue={firstname}
          />
        </li>
        <li class="list-group-item pl-0">
          <input
            type="text"
            class="form-control"
            ref={input => {
              this.lastname = input;
            }}
            defaultValue={lastname}
          />
        </li>
        <li class="list-group-item pl-0">
          <input
            type="text"
            class="form-control"
            ref={input => {
              this.username = input;
            }}
            defaultValue={username}
          />
        </li>
        <li class="list-group-item pl-0">
          <input
            type="date"
            class="form-control"
            ref={input => {
              this.birthday = input;
            }}
            defaultValue={date}
          />
        </li>
        <li class="list-group-item pl-0">
          <input
            type="text"
            class="form-control"
            ref={input => {
              this.address = input;
            }}
            defaultValue={address}
          />
        </li>
        <li class="list-group-item pl-0">
          <input
            type="text"
            class="form-control"
            ref={input => {
              this.email = input;
            }}
            defaultValue={email}
          />
        </li>
        <li class="list-group-item px-0">
          <div class="d-flex justify-content-center">
            <button
              onClick={() => {
                this.saveProfile(id);
              }}
              className="btn btn-outline-primary"
            >
              save
            </button>
          </div>
        </li>
        <li class="list-group-item px-0">
          <div class="d-flex justify-content-center">
            <button
              onClick={() => {
                this.setState({edit: !this.state.edit});
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
    if(this.props.user.role === 1){
      if(this.state.data !== undefined){
        return (
          <div id="App" style={{height:'1000px '}}>
            <Sidebar pageWrapId={"page-wrap"} outerContainerId={"App"} />
            <div id="page-wrap">
              <h1>Profile Admin</h1>
              <div className="container">
              <div className="row">
                <div className="col-md-3 col-sm-12">
                  <div className="card ml-5" style={{width:'235px'}}>
                    <div className="card-header">
                      <p className="lead text-center">Profile Picture</p>
                    </div>
                    <img
                      src={this.state.photo} alt={this.state.data.user.username} key={new Date()} className="card-img-top" style={{height:'250px'}}
                    />
                    <div class="card-body">
                      <div className="custom-file">
                        <input
                          type="file"
                          id="myfile"
                          ref={input => (this.gambar = input)}
                          className="custom-file-input"
                          onChange={this.handleChange}
                        />
                        <label className="custom-file-label" for="myfile">choose your file here</label>
                      </div>
                      <div class="d-flex justify-content-between py-2">
                        <p></p>
                        <button className="btn btn-primary" onClick={() => this.uploadAvatar(this.props.user.id)}>
                          Upload
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-md-9 col-sm-12">
                <div class="card">
                  <ul class="list-group list-group-flush mt-3">{this.profile()}</ul>
                </div>
                </div>
              </div>
            </div>
            </div>
          </div>
        );
  
      }else{
        return(
          <h1>Loading</h1>
          )
        }
        
      }else{
      return <Redirect to="/admin/login" />
      }
    
    
  }
}

const mapStateToProps = state => {
  return { user: state.auth };
};

export default connect(
  mapStateToProps,
  {onEdit}
)(DashboardAdmin);
