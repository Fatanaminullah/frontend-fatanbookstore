import React, { Component } from "react";
import {Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import axios from "axios";
import cookies from "universal-cookie";
import { onEdit } from '../../actions'
import {Link} from 'react-router-dom'
import image from '../../img/avatar2.jpg'


const cookie = new cookies();

var moment = require('moment');

class Profile extends Component {
  cardheader = {
    backgroundColor: "#d3d3d3"
  }
  state = {
    edit: true,
    data: undefined,
    kodepos:[],
    genreUser : [],
    genre : [],
    editGenre:true
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
  uploadAvatar = async userid => {
    const formData = new FormData();
    var imagefile = this.gambar;

    formData.append("avatar", imagefile.files[0]);
    try {
      await axios.post(
        `http://localhost:2000/avatar/uploads/${userid}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        }
      );
      this.getProfile(userid);
    } catch (e) {
      console.log("upload gagal" + e);
    }
  };

  componentDidMount() {
    const userid = cookie.get("idLogin");
    this.getProfile(userid);
    this.getUserGenre(userid);
    this.getGenre(userid)
  }
  getProfile = async userid => {
    try {
      const res = await axios.get(
        `http://localhost:2000/users/profile/${userid}`
      );

      this.setState({
        data: res.data
      });
    } catch (e) {
      console.log(e);
    }
  };
  getUserGenre = async userid => {
    try {
      const res = await axios.get(
        `http://localhost:2000/users/genre/${userid}`
      );

      this.setState({
        genreUser: res.data
      });
      
      
      
    } catch (e) {
      console.log(e);
    }
  }
  getGenre = (userid) => {
    axios.get(`http://localhost:2000/genre/${userid}`).then(res => {
      this.setState({
        genre: res.data
      });
    });
  };
  
  profile = () => {
    const {username,firstname,lastname,age,id,email,address,birthday} = this.state.data.user;
    var birth = moment(birthday);
    var date = birth.utc().format("YYYY-MM-DD");

    if (this.state.edit) {
      return (
        <div>
          <div className="card-body">
            <li className="list-group-item pl-0">{`Firstname: ${firstname}`}</li>
            <li className="list-group-item pl-0">{`Lastname: ${lastname}`}</li>
            <li className="list-group-item pl-0">{`Username: ${username}`}</li>
            <li className="list-group-item pl-0">{`Age: ${age}`}</li>
            <li className="list-group-item pl-0">{`Address: ${address}`}</li>
            <li className="list-group-item pl-0">{`Email: ${email}`}</li>
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
            defaultValue={firstname}
          />
        </li>
        <li className="list-group-item pl-0">
          <input
            type="text"
            className="form-control"
            ref={input => {
              this.lastname = input;
            }}
            defaultValue={lastname}
          />
        </li>
        <li className="list-group-item pl-0">
          <input
            type="text"
            className="form-control"
            ref={input => {
              this.username = input;
            }}
            defaultValue={username}
          />
        </li>
        <li className="list-group-item pl-0">
          <input
            type="date"
            className="form-control"
            ref={input => {
              this.birthday = input;
            }}
            defaultValue={date}
          />
        </li>
        <li className="list-group-item pl-0">
          <input
            type="text"
            className="form-control"
            ref={input => {
              this.address = input;
            }}
            defaultValue={address}
          />
        </li>
        <li className="list-group-item pl-0">
          <input
            type="text"
            className="form-control"
            ref={input => {
              this.email = input;
            }}
            defaultValue={email}
          />
        </li>
        <li className="list-group-item px-0">
          <div className="d-flex justify-content-center">
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
  profilePicture = () => {
    if (this.state.data.user.avatar !== null) {
      return (
        <img
          src={this.state.data.photo}
          alt={this.state.data.user.username}
          key={new Date()}
          className="card-img-top"
        />
      );
    }
    return (
      <img
        src={image}
        alt="avatar"
        key={new Date()}
        className="card-img-top"
      />
    );
  };
  addGenreUser = async (userid,genreid) =>{
    try {
      await axios.post(
        `http://localhost:2000/users/addgenre/${userid}/${genreid}`,{
        }
      );
      console.log(`success`);
      
      this.getUserGenre(userid);
      this.getGenre(userid)
      
    } catch (e) {
      console.log(e);
    }
  }
  removeGenreUser = async (userid,genreid) => {
    try {
      await axios.delete(
        `http://localhost:2000/users/deletegenre/${userid}/${genreid}`,{
        }
      );
      this.getUserGenre(userid);
      this.getGenre(userid)
      
    } catch (e) {
      console.log(e);
    }
  }
  buttonGenre = () => {
    if(this.state.editGenre){
      return (
            <button
              className="btn btn-outline-warning"
              onClick={() => {
                this.setState({ editGenre: !this.state.editGenre });
              }}
            >
              Add More Genre Here!
            </button>
      );
  }else{
    return(
            <button
              className="btn btn-outline-primary"
              onClick={() => {
                this.setState({
                  editGenre: !this.state.editGenre
                });
              }}
            >
              Done
            </button>
    )

  }
  }
  genre = () => {
    const userid = cookie.get("idLogin");
    if(this.state.genreUser.length === 0){
      return(
          <div className="card w-100">
            <div className="card-body">
              <div className="d-flex justify-content-center">
              <h3 className="text-center">You havent choose your genre yet, please choose below!</h3>
              <i className="fas fa-hand-point-down fa-2x"></i>
              </div>
            </div>
          </div>
      )
    }
      return this.state.genreUser.map(item => {
        return (
          <div className="card">
            <div className="card-body">
              <img
                className="card-img-top genre"
                src={item.genre_image}
                alt={item.name}
              />
            </div>
            <div className="card-footer d-flex flex-column">
              <p className="text-center font-weight-bold">
                {item.name}
              </p>
              <button className="btn btn-outline-success" onClick={() => {this.removeGenreUser(userid,item.id)}}>
                Remove Genre
              </button>
            </div>
          </div>
        );
      })
  }
  addGenre = () => {
    const userid = cookie.get("idLogin");
    if(this.state.editGenre){
        return null
    }else{
      return this.state.genre.map(item => {
            return (
              <div className="card">
               
                <div className="card-body">
                  <img
                    className="card-img-top genre"
                    src={item.genre_image}
                    alt={item.name}
                  />
                </div>
                <div className="card-footer d-flex flex-column">
                  <p className="font-weight-bold text-center">
                    {item.name}
                  </p>
                  <button className="btn btn-outline-success" onClick={() => {this.addGenreUser(userid,item.id)}}>
                    Add Genre
                  </button>
                </div>
              </div>
            );
        })
    }
  }

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
                  <div className="card-header" style={this.cardheader}>
                    <Link to="/profile" className="text-dark">
                      <p className="lead text-center">Profile</p>
                    </Link>
                  </div>
                  <div className="card-header">
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
                <div className="card py-1">
                  <div className="row">
                    <div className="col-8">
                      <ul className="list-group list-group-flush">
                        <div className="card-header">
                          <p className="lead text-center">
                            User's Information
                          </p>
                        </div>
                        {this.profile()}
                      </ul>
                    </div>
                    <div className="col-4">
                      <div className="card-header">
                        <p className="lead text-center">
                          Profile Picture
                        </p>
                      </div>
                      <div className="card-body">
                        {this.profilePicture()}
                        <div className="custom-file">
                          <input
                            type="file"
                            id="myfile"
                            ref={input => (this.gambar = input)}
                            className="custom-file-input"
                          />
                          <label
                            className="custom-file-label"
                            for="myfile"
                          >
                            choose image
                          </label>
                        </div>
                        <div className="d-flex justify-content-between py-2">
                          <p />
                          <button
                            className="btn btn-primary"
                            onClick={() =>
                              this.uploadAvatar(this.props.user.id)
                            }
                          >
                            Upload
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="card my-2">
                  <div className="row">
                    <div className="col-12">
                      <ul className="list-group list-group-flush">
                        <div className="card-header d-flex justify-content-between">
                          <p className="lead text-center font-weight-bold">
                            Your Genre
                          </p>
                        </div>
                        <div className="card-body d-flex flex-wrap justify-content-between">
                          {this.genre()}
                          {this.buttonGenre()}
                        </div>
                        <div className="card-body d-flex flex-wrap justify-content-between">
                          {this.addGenre()}
                        </div>
                      </ul>
                    </div>
                  </div>
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
)(Profile);
