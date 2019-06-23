import React from "react";
import { Link, Redirect } from 'react-router-dom'
import { slide as Menu } from "react-burger-menu";

export default props => {
  return (
    // Pass on our props
    <Menu {...props}>
      <Link className="menu-item" to="/manageuser">
        Manage User's Order
      </Link>
      <Link className="menu-item" to="/manageproduct">
        Manage Product
      </Link>
      <Link className="menu-item" to="/managegenre">
        Manage Genre
      </Link>
      <Link className="menu-item" to="/manageauthorpublisher">
        Manage Author & Publisher
      </Link>
      <Link className="menu-item" to="/managebank">
        Manage Bank
      </Link>
    </Menu>
  );
};