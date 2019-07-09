import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import cookies from "universal-cookie";
import Swal from 'sweetalert'

import Sidebar from "./Sidebar";
import "../style.css";

const cookie = new cookies();

class ManageGenre extends Component {
  state = {
    genre: [],
    genreSearch: [],
    genreProduct: [],
    genreProductSearch: [],
    genreUser: [],
    genreUserSearch: [],
    products: [],
    selectedGenre: 0,
    selectedProduct: 0
  };

  componentDidMount() {
    this.getProduct();
    this.getGenre();
    this.getGenreproduct();
    this.getGenreusers();
  }
  getProduct = async () => {
    await axios.get("http://localhost:2000/products").then(res => {
      this.setState({ products: res.data });
    });
  };
  getGenre = async () => {
    await axios.get("http://localhost:2000/genre").then(res => {
      this.setState({
        genre: res.data,
        genreSearch: res.data,
        selectedGenre: 0
      });
      console.log(this.state.genre);
    });
  };
  getGenreproduct = async () => {
    await axios.get("http://localhost:2000/genreproducts").then(res => {
      this.setState({
        genreProduct: res.data,
        genreProductSearch: res.data,
        selectedProduct: 0
      });
    });
  };
  getGenreusers = async () => {
    await axios.get("http://localhost:2000/genreusers").then(res => {
      this.setState({
        genreUser: res.data,
        genreUserSearch: res.data,
        selectedUser: 0
      });
    });
  };
  saveGenre = async id => {
    const name = this.editGenreName.value;
    const formData = new FormData();
    const genre_image = this.editImage.files[0];

    formData.append("genre_image", genre_image);
    formData.append("name", name);

    try {
      await axios
        .patch(`http://localhost:2000/genre/edit/${id}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        })
        .then(() => {
          this.getGenre();
          this.getGenreproduct();
          this.getGenreusers();
        });
    } catch (err) {
      console.log(err);
    }
  };
  saveGenPro = id => {
    const productId = parseInt(this.selectProductId.value);
    const genreId = parseInt(this.selectGenreId.value);
    console.log(productId);
    console.log(genreId);
    axios
      .patch(`http://localhost:2000/genreproducts/edit/${id}`, {
        product_id: productId,
        genre_id: genreId
      })
      .then(() => {
        this.getGenreproduct();
      });
  };
  editGenre = id => {
    this.setState({ selectedGenre: id });
  };
  editGenreProduct = id => {
    this.setState({ selectedProduct: id });
  };
  addGenre = name => {
    const formData = new FormData();
    const genre_image = this.image.files[0];

    formData.append("genre_image", genre_image);
    formData.append("name", name);


    axios
      .post("http://localhost:2000/genre/add", formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }}
        )
      .then(res => {
        Swal('Success','Genre Addes','success')
        
        console.log(res);
        this.getGenre();
      });
  };
  addGenreProduct = (product_id, genre_id) => {
    axios
      .post(`http://localhost:2000/product/addgenre`, {
        product_id,
        genre_id
      })
      .then(res => {
        console.log(res);
        this.getGenreproduct();
      });
  };
  onAddGenre = () => {
    const name = this.genre.value;

    this.addGenre(name);
  };
  onAddGenreProduct = () => {
    const genre_id = parseInt(this.GenreId.value);
    const product_id = parseInt(this.ProductId.value);
    console.log(genre_id,product_id);
    

    this.addGenreProduct(product_id, genre_id);
  };

  selectGenre = () => {
    return this.state.genre.map(item => {
      return (
        <option key={item.id} value={item.id}>
          {item.name}
        </option>
      );
    });
  };
  selectProduct = () => {
    return this.state.products.map(item => {
      return (
        <option key={item.id} value={item.id}>
          {item.product_name}
        </option>
      );
    });
  };

  filterGenre = () => {
    const search = this.searchGenre.value;

    console.log(search);

    var arrSearch = this.state.genre.filter(item => {
      return item.name.toLowerCase().includes(search.toLowerCase());
    });
    this.setState({ genreSearch: arrSearch });
  };
  filterGenreProduct = () => {
    const search = this.searchGenreProduct.value;

    var arrSearch = this.state.genreProduct.filter(item => {
      return (
        item.name.toLowerCase().includes(search.toLowerCase()) ||
        item.product_name.toLowerCase().includes(search.toLowerCase())
      );
    });
    this.setState({ genreProductSearch: arrSearch });
  };
  filterGenreUser = () => {
    const search = this.searchGenreUser.value;

    var arrSearch = this.state.genreUser.filter(item => {
      return (
        item.name.toLowerCase().includes(search.toLowerCase()) ||
        item.username.toLowerCase().includes(search.toLowerCase())
      );
    });
    this.setState({ genreUserSearch: arrSearch });
  };

  renderGenre = () => {
    return this.state.genreSearch.map(item => {
      if (item.id !== this.state.selectedGenre) {
        return (
          <tr key={item.id}>
            <td>{item.id}</td>
            <td>
              <img className="list" src={item.genre_image} alt={item.name} />
            </td>
            <td>{item.name}</td>
            <td>
              <button
                className="btn btn-primary mr-2"
                onClick={() => {
                  this.editGenre(item.id);
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
              <div className="custom-file">
                <input
                  className="w-100"
                  ref={input => {
                    this.editImage = input;
                  }}
                  type="file"
                  id="customFile"
                />
                <label class="custom-file-label" for="customFile" />
              </div>
            </td>
            <td>
              <input
                className="form-control"
                ref={input => {
                  this.editGenreName = input;
                }}
                type="text"
                defaultValue={item.name}
              />
            </td>
            <td>
              <button
                onClick={() => {
                  this.saveGenre(item.id);
                }}
                className="btn btn-success mb-2"
              >
                Save
              </button>
              <button
                onClick={() => {
                  this.setState({ selectedGenre: 0 });
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
    return this.state.genreProductSearch.map(item => {
      if (item.id !== this.state.selectedProduct) {
        return (
          <tr key={item.id}>
            <td>{item.id}</td>
            <td>{item.product_name}</td>
            <td>{item.name}</td>
            <td>
              <button
                className="btn btn-primary mr-2"
                onClick={() => {
                  this.editGenreProduct(item.id);
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
              <select
                className="form-control"
                ref={input => {
                  this.selectProductId = input;
                }}
              >
                {this.selectProduct()}
              </select>
            </td>
            <td>
              <select
                className="form-control"
                ref={input => {
                  this.selectGenreId = input;
                }}
              >
                {this.selectGenre()}
              </select>
            </td>
            <td>
              <button
                onClick={() => {
                  this.saveGenPro(item.id);
                }}
                className="btn btn-success mb-2"
              >
                Save
              </button>
              <button
                onClick={() => {
                  this.setState({ selectedProduct: 0 });
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
    return this.state.genreUserSearch.map(item => {
      return (
        <tr key={item.id}>
          <td>{item.id}</td>
          <td>{item.username}</td>
          <td>{item.name}</td>
        </tr>
      );
    });
  };

  render() {
    var userCookie = cookie.get("stillLogin");

    if (userCookie === undefined) {
      return <Redirect to="/admin/login" />;
    } else {
      return (
        <div id="App">
          <Redirect to="/managegenre" />
          <Sidebar pageWrapId={"page-wrap"} outerContainerId={"App"} />
          <div id="page-wrap">
            <div
              className="container"
              style={{
                overflowY: "scroll",
                overflowX: "scroll",
                height: "700px"
              }}
            >
              <ul className="nav nav-tabs" id="myTab" role="tablist">
                <li className="nav-item">
                  <a
                    className="nav-link lead active"
                    id="home-tab"
                    data-toggle="tab"
                    href="#genre"
                    role="tab"
                    aria-controls="home"
                    aria-selected="true"
                  >
                    Genre Table
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link lead"
                    id="profile-tab"
                    data-toggle="tab"
                    href="#genreproduct"
                    role="tab"
                    aria-controls="profile"
                    aria-selected="false"
                  >
                    Product Genre Table
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link lead"
                    id="profile-tab"
                    data-toggle="tab"
                    href="#genreuser"
                    role="tab"
                    aria-controls="profile"
                    aria-selected="false"
                  >
                    Genre User Table
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link lead"
                    id="profile-tab"
                    data-toggle="tab"
                    href="#inputgenre"
                    role="tab"
                    aria-controls="profile"
                    aria-selected="false"
                  >
                    Input Genre
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link lead"
                    id="profile-tab"
                    data-toggle="tab"
                    href="#inputgenreproduct"
                    role="tab"
                    aria-controls="profile"
                    aria-selected="false"
                  >
                    Input Genre Product
                  </a>
                </li>
              </ul>
              <div className="tab-content profile-tab" id="myTabContent">
                <div
                  className="tab-pane fade show active"
                  id="genre"
                  role="tabpanel"
                  aria-labelledby="home-tab"
                >
                  <h4 className="text-center">Genre</h4>
                  <div className="input-group search-box">
                    <input
                      type="text"
                      ref={input => (this.searchGenre = input)}
                      className="form-control"
                      placeholder="Search Genre here..."
                      onKeyUp={this.filterGenre}
                    />
                    <span className="input-group-addon">
                      <i className="fas fa-search" />
                    </span>
                  </div>
                  <table className="table table-hover mb-5">
                    <thead>
                      <tr>
                        <th scope="col">ID</th>
                        <th scope="col">IMAGE</th>
                        <th scope="col">NAME</th>
                        <th scope="col">ACTION</th>
                      </tr>
                    </thead>
                    <tbody>{this.renderGenre()}</tbody>
                  </table>
                </div>
                <div
                  className="tab-pane fade"
                  id="genreproduct"
                  role="tabpanel"
                  aria-labelledby="home-tab"
                >
                  <h4 className="text-center">Product Genre</h4>
                  <div className="input-group search-box">
                    <input
                      type="text"
                      ref={input => (this.searchGenreProduct = input)}
                      className="form-control"
                      placeholder="Search Product Genre here..."
                      onKeyUp={this.filterGenreProduct}
                    />
                    <span className="input-group-addon">
                      <i className="fas fa-search" />
                    </span>
                  </div>
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
                </div>
                <div
                  className="tab-pane fade"
                  id="genreuser"
                  role="tabpanel"
                  aria-labelledby="home-tab"
                >
                  <h4 className="text-center">User Genre</h4>
                  <div className="input-group search-box">
                    <input
                      type="text"
                      ref={input => (this.searchGenreUser = input)}
                      className="form-control"
                      placeholder="Search User Genre here..."
                      onKeyUp={this.filterGenreUser}
                    />
                    <span className="input-group-addon">
                      <i className="fas fa-search" />
                    </span>
                  </div>
                  <table className="table table-hover mb-5">
                    <thead>
                      <tr>
                        <th scope="col">ID</th>
                        <th scope="col">USER</th>
                        <th scope="col">GENRE</th>
                      </tr>
                    </thead>
                    <tbody>{this.renderGenreUser()}</tbody>
                  </table>
                </div>
                <div
                  className="tab-pane fade"
                  id="inputgenre"
                  role="tabpanel"
                  aria-labelledby="home-tab"
                >
                  <h3 className="text-center">Input Genre</h3>
                  <table className="table text-center">
                    <thead>
                      <tr>
                        <th scope="col">ID</th>
                        <th scope="col">IMAGE</th>
                        <th scope="col">NAME</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <th scope="col">ID</th>
                        <th scope="col">
                        <input
                  className="w-100"
                  ref={input => {
                    this.image = input;
                  }}
                  type="file"
                  id="customFile"
                />
                        </th>
                        <th scope="col">
                          <input
                            ref={input => (this.genre = input)}
                            className="form-control"
                            type="text"
                          />
                        </th>
                        <th scope="col">
                          <button
                            className="btn btn-outline-warning"
                            onClick={this.onAddGenre}
                          >
                            Add
                          </button>
                        </th>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div
                  className="tab-pane fade"
                  id="inputgenreproduct"
                  role="tabpanel"
                  aria-labelledby="home-tab"
                >
                  <h3 className="text-center">Input Product Genre</h3>
                  <table className="table text-center">
                    <thead>
                      <tr>
                        <th scope="col" />
                        <th scope="col" />
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <th scope="col">Product</th>
                        <th>
                          <select
                            className="form-control"
                            ref={input => {
                              this.ProductId = input;
                            }}
                          >
                            {this.selectProduct()}
                          </select>
                        </th>
                      </tr>
                      <tr>
                        <th scope="col">Genre</th>

                        <th>
                          <select
                            className="form-control"
                            ref={input => {
                              this.GenreId = input;
                            }}
                          >
                            {this.selectGenre()}
                          </select>
                        </th>
                      </tr>
                      <tr>
                        <th />
                        <th scope="col">
                          <button
                            className="btn btn-outline-success btn-block"
                            onClick={this.onAddGenreProduct}
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
    }
  }
}

const mapStateToProps = state => {
  return { user: state.auth };
};

export default connect(mapStateToProps)(ManageGenre);
