import React, { Component } from "react";
import {Redirect} from 'react-router-dom'
import {connect} from 'react-redux'

import Sidebar from "./Sidebar";
import "./style.css";


class DashboardAdmin extends Component {
  render() {
    const { role } = this.props.user;
    
    
    if(role === 1){
      return (
        <div id="App">
          <Sidebar pageWrapId={"page-wrap"} outerContainerId={"App"} />
          <div id="page-wrap">
            <h1>DashboardAdmin</h1>
          </div>
        </div>
      );

    }else{

      return(
        <Redirect to="/admin/login" />
      )
    }
  }
}

const mapStateToProps = state => {
  return { user: state.auth };
};

export default connect(
  mapStateToProps
)(DashboardAdmin);
