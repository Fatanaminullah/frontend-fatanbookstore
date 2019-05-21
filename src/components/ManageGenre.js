import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import Sidebar from "./Sidebar";
import "./style.css";

class ManageGenre extends Component {
  state = {
    genre: [],
    genreProduct: [],
    genreUser: [],
    selectedID: 0
  };

  componentDidMount() {
    this.getGenre()
    this.getGenreproduct();
    this.getGenreusers();
  }

  getGenre = () => {
    axios.get("http://localhost:2000/genre").then(res => {
      this.setState({ genre: res.data, selectedID: 0 });
    });
  };
  getGenreproduct = () => {
    axios.get("http://localhost:2000/genre/products").then(res => {
      this.setState({ genreProduct: res.data, selectedID: 0 });
    });
  };
  getGenreusers = () => {
    axios.get("http://localhost:2000/genre/users").then(res => {
      this.setState({ genreUser: res.data, selectedID: 0 });
    });
    console.log(this.state.genreUser);
    
  };
  saveEdit = id => {
    const name = this.editName.value;
    axios
      .patch(`http://localhost:2000/products/edit/${id}`, {
        name
      })
      .then(() => {
        this.getGenre();
      });
  };
  editProduct = id => {
    this.setState({ selectedID: id });
  };
  onAddProduct = () => {
    const name = this.name.value;
    this.addProduct(name);
  };
  addProduct = (name, stock, price, page, author, publisher, image) => {
    axios
      .post("http://localhost:2000/products/add", {
        product_name: name,
        stock,
        price,
        page,
        author,
        publisher,
        image
      })
      .then(res => {
        console.log(res);
        this.getGenre();
      });
  };

  renderGenre = () => {
    return this.state.genre.map(item => {
      if (item.id !== this.state.selectedID) {
        return (
          <tr key={item.id}>
            <td>{item.id}</td>
            <td>{item.name}</td>
            <td>
              <button
                className="btn btn-primary mr-2"
                onClick={() => {
                  this.editProduct(item.id);
                }}
              >
                Edit
              </button>
            </td>
          </tr>
        );
      } else {
        return (
          <tr key={item.id}>
            <td>{item.id}</td>
            <td>
              <input
                className="form-control"
                ref={input => {
                  this.editName = input;
                }}
                type="text"
                defaultValue={item.name}
              />
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
  renderGenreProduct = () => {
    return this.state.genreProduct.map(item => {
      if (item.id !== this.state.selectedID) {
        return (
          <tr key={item.id}>
            <td>{item.id}</td>
            <td>{item.product_name}</td>
            <td>{item.name}</td>
            <td>
              <button
                className="btn btn-primary mr-2"
                onClick={() => {
                  this.editProduct(item.id);
                }}
              >
                Edit
              </button>
            </td>
          </tr>
        );
      } else {
        return (
          <tr key={item.id}>
            <td>{item.id}</td>
            <td>
              <input
                className="form-control"
                ref={input => {
                  this.editProductName = input;
                }}
                type="text"
                defaultValue={item.product_name}
              />
            </td>
            <td>
              <input
                className="form-control"
                ref={input => {
                  this.editName = input;
                }}
                type="text"
                defaultValue={item.name}
              />
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
  renderGenreUser = () => {
    return this.state.genreUser.map(item => {
      if (item.id !== this.state.selectedID) {
        return (
          <tr key={item.id}>
            <td>{item.id}</td>
            <td>{item.username}</td>
            <td>{item.name}</td>
            <td>
              <button
                className="btn btn-primary mr-2"
                onClick={() => {
                  this.editProduct(item.id);
                }}
              >
                Edit
              </button>
            </td>
          </tr>
        );
      } else {
        return (
          <tr key={item.id}>
            <td>{item.id}</td>
            <td>
              <input
                className="form-control"
                ref={input => {
                  this.editProductName = input;
                }}
                type="text"
                defaultValue={item.product_name}
              />
            </td>
            <td>
              <input
                className="form-control"
                ref={input => {
                  this.editName = input;
                }}
                type="text"
                defaultValue={item.name}
              />
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

    if (role !== "") {
      return (
        <div id="App">
          <Sidebar pageWrapId={"page-wrap"} outerContainerId={"App"} />
          <div id="page-wrap">
            <div className="container">
              <div className="row">
                <div className="col-4">
                  <h1 className="display-4 text-center">Genre</h1>
                  <table className="table table-hover mb-5">
                    <thead>
                      <tr>
                        <th scope="col">ID</th>
                        <th scope="col">NAME</th>
                        <th scope="col">ACTION</th>
                      </tr>
                    </thead>
                    <tbody>{this.renderGenre()}</tbody>
                  </table>
                  <h1 className="display-4 text-center">Input Genre</h1>
                  <table className="table text-center">
                    <thead>
                      <tr>
                        <th scope="col">ID</th>
                        <th scope="col">NAME</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <th scope="col">ID</th>
                        <th scope="col">
                          <input
                            ref={input => (this.name = input)}
                            className="form-control"
                            type="text"
                          />
                        </th>
                        <th scope="col">
                          <button
                            className="btn btn-outline-warning"
                            onClick={this.onAddProduct}
                          >
                            Add
                          </button>
                        </th>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="col-4">
                  <h3 className="display-4 text-center">Product Genre</h3>
                  <table className="table table-hover mb-5">
                    <thead>
                      <tr>
                        <th scope="col">ID</th>
                        <th scope="col">PRODUCT</th>
                        <th scope="col">GENRE</th>
                        <th scope="col">ACTION</th>
                      </tr>
                    </thead>
                    <tbody>{this.renderGenreProduct()}</tbody>
                  </table>
                  <h3 className="display-4 text-center">Input Product Genre</h3>
                  <table className="table text-center">
                    <thead>
                      <tr>
                        <th scope="col">ID</th>
                        <th scope="col">PRODUCT</th>
                        <th scope="col">GENRE</th>
                        <th scope="col">ACTION</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <th scope="col">ID</th>
                        <th scope="col">
                          <input
                            ref={input => (this.productName = input)}
                            className="form-control"
                            type="text"
                          />
                        </th>
                        <th scope="col">
                          <input
                            ref={input => (this.name = input)}
                            className="form-control"
                            type="text"
                          />
                        </th>
                        <th scope="col">
                          <button
                            className="btn btn-outline-warning"
                            onClick={this.onAddProduct}
                          >
                            Add
                          </button>
                        </th>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="col-4">
                  <h3 className="display-4 text-center">User Genre</h3>
                  <table className="table table-hover mb-5">
                    <thead>
                      <tr>
                        <th scope="col">ID</th>
                        <th scope="col">USER</th>
                        <th scope="col">GENRE</th>
                        <th scope="col">ACTION</th>
                      </tr>
                    </thead>
                    <tbody>{this.renderGenreUser()}</tbody>
                  </table>
                  <h1 className="display-4 text-center">Input Product Genre</h1>
                  <table className="table text-center">
                    <thead>
                      <tr>
                        <th scope="col">ID</th>
                        <th scope="col">USER</th>
                        <th scope="col">GENRE</th>
                        <th scope="col">ACTION</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <th scope="col">ID</th>
                        <th scope="col">
                          <input
                            ref={input => (this.productName = input)}
                            className="form-control"
                            type="text"
                          />
                        </th>
                        <th scope="col">
                          <input
                            ref={input => (this.name = input)}
                            className="form-control"
                            type="text"
                          />
                        </th>
                        <th scope="col">
                          <button
                            className="btn btn-outline-warning"
                            onClick={this.onAddProduct}
                          >
                            Add
                          </button>
                        </th>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
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

export default connect(mapStateToProps)(ManageGenre);
