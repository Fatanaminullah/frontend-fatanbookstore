import React, { Component } from "react";

import Sidebar from "./Sidebar";
import "./style.css";


class DashboardAdmin extends Component {
  render() {
    return (
      <div id="App">
        <Sidebar pageWrapId={"page-wrap"} outerContainerId={"App"} />
        <div id="page-wrap">
          <h1>DashboardAdmin</h1>
        </div>
      </div>
    );
  }
}

export default DashboardAdmin;
