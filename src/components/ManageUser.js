import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import Sidebar from "./Sidebar";
import "./style.css";

class ManageUser extends Component {
  state = {
    user: [],
    selectedID: 0
  };

  componentDidMount() {
    this.getUser();
  }

  getUser = () => {
    axios.get("http://localhost:2000/users").then(res => {
      this.setState({ user: res.data, selectedID: 0 });
    });
  };
 
  

  renderList = () => {
      console.log(this.state.user);
      
    return this.state.user.map(item => {
      if (item.id !== this.state.selectedID) {
        return (
          <tr key={item.id}>
            <td>{item.id}</td>
            <td>{item.firstname}</td>
            <td>{item.lastname}</td>
            <td>{item.email}</td>
            <td>{item.username}</td>
            <td>{item.status}</td>
            <td>{item.role_name}</td>
            <td>{item.birthday}</td>
            <td>{item.address}</td>
            <td>{item.kodepos}</td>
            <td>
              <img className="list" src={item.pict} alt={item.desc} />
            </td>
            <td>
              <button
                className="btn btn-primary mr-2"
                onClick={() => {
                  this.editProduct(item.id);
                }}
              >
                Edit
              </button>
              <button
                className="btn btn-danger"
                onClick={() => {
                  this.deleteProduct(item.id);
                }}
              >
                Delete
              </button>
            </td>
          </tr>
        );
      } else {
        return (
          <tr key={item.id}>
            <td>{item.id}</td>
            <td>{item.id}</td>
            <td>{item.firstname}</td>
            <td>{item.lastname}</td>
            <td>{item.email}</td>
            <td>{item.username}</td>
            <td>
            <input
                className="form-control"
                ref={input => {
                  this.editStatus = input;
                }}
                type="text"
                defaultValue={item.status}
              />
            </td>
            <td>{item.role_name}</td>
            <td>{item.birthday}</td>
            <td>{item.address}</td>
            <td>{item.kodepos}</td>
            <td>
              <img className="list" src={item.pict} alt={item.desc} />
            </td>
            <td>
              <button
                onClick={() => {
                  this.saveEdit(item.id);
                }}
                className="btn btn-success mb-2"
              >
                Save
              </button>
              <button
                onClick={() => {
                  this.setState({ selectedID: 0 });
                }}
                className="btn btn-danger"
              >
                Cancel
              </button>
            </td>
          </tr>
        );
      }
    });
  };

  render() {
    const { role } = this.props.user;
    console.log(role);

    if (role !== "") {
      return (
        <div id="App">
          <Sidebar pageWrapId={"page-wrap"} outerContainerId={"App"} />
          <div id="page-wrap">
            <div className="container">
              <h1 className="display-4 text-center">User Table</h1>
              <table className="table table-hover mb-5">
                <thead>
                  <tr>
                    <th scope="col">ID</th>
                    <th scope="col">FIRSTNAME</th>
                    <th scope="col">LASTNAME</th>
                    <th scope="col">EMAIL</th>
                    <th scope="col">USERNAME</th>
                    <th scope="col">STATUS</th>
                    <th scope="col">ROLE</th>
                    <th scope="col">BIRTHDAY</th>
                    <th scope="col">ADDRESS</th>
                    <th scope="col">KODEPOS</th>
                    <th scope="col">AVATAR</th>
                    <th scope="col">ACTION</th>
                  </tr>
                </thead>
                <tbody>{this.renderList()}</tbody>
              </table>
            </div>
          </div>
        </div>
      );
    } else {
      return <Redirect to="/admin/login" />;
    }
  }
}

const mapStateToProps = state => {
  return { user: state.auth };
};

export default connect(mapStateToProps)(ManageUser);
