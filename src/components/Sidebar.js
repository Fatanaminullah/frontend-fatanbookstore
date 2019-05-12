import React from "react";
import { Link, Redirect } from 'react-router-dom'
import { slide as Menu } from "react-burger-menu";

export default props => {
  return (
    // Pass on our props
    <Menu {...props}>
      <Link className="menu-item" to="/ManageUser">
        Manage User
      </Link>
      <a className="menu-item" href="/ManageProduct">
        Manage Product
      </a>
      <a className="menu-item" href="/">
        Manage Payment History
      </a>
    </Menu>
  );
};