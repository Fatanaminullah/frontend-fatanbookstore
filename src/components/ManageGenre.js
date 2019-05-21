import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import Sidebar from "./Sidebar";
import "./style.css";

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
    this.getProduct()
    this.getGenre()
    this.getGenreproduct();
    this.getGenreusers();
  }
  getProduct = () => {
    axios.get("http://localhost:2000/products").then(res => {
      this.setState({ products: res.data});
    });
  };
  getGenre = () => {
    axios.get("http://localhost:2000/genre").then(res => {
      this.setState({ genre: res.data, genreSearch:res.data, selectedGenre: 0 });
    });
  };
  getGenreproduct = () => {
    axios.get("http://localhost:2000/genre/products").then(res => {
      this.setState({ genreProduct: res.data, genreProductSearch:res.data, selectedProduct: 0 });
    });
  };
  getGenreusers = () => {
    axios.get("http://localhost:2000/genre/users").then(res => {
      this.setState({ genreUser: res.data, genreUserSearch:res.data, selectedUser: 0 });
    });
  };
  saveGenre = id => {
    const name = this.editGenreName.value;
    
    axios
      .patch(`http://localhost:2000/genre/edit/${id}`, {
        name
      })
      .then(() => {
        this.getGenre();
        this.getGenreproduct();
        this.getGenreusers();
      });
  };
  saveGenPro = id => {
    const productId = parseInt(this.selectProductId.value);
    const genreId = parseInt(this.selectGenreId.value);
    console.log(productId);
    console.log(genreId);
    axios
      .patch(`http://localhost:2000/genreproducts/edit/${id}`, {
        product_id:productId,
        genre_id:genreId
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

  selectGenre = () => {
    return this.state.genre.map(item => {
      return (
        <option key={item.id} value={item.id}>{item.name}</option>
      )
    })
  }
  selectProduct = () => {
    return this.state.products.map(item => {
      return (
        <option key ={item.id} value={item.id}>{item.product_name}</option>
      )
    })
  }

  filterGenre = () => {
    const search = this.searchGenre.value

    console.log(search);
    

    var arrSearch = this.state.genre.filter(item => {
      
      return item.name.toLowerCase().includes(search.toLowerCase());

    })
    this.setState({genreSearch:arrSearch})
  }
  filterGenreProduct = () => {
    const search = this.searchGenreProduct.value

    var arrSearch = this.state.genreProduct.filter(item => {
      
      return item.name.toLowerCase().includes(search) 
      
    })
    this.setState({genreProductSearch:arrSearch})
  }
  filterGenreUser = () => {
    const search = this.searchGenreUser.value
    
    var arrSearch = this.state.genreUser.filter(item => {
      
      return item.name.toLowerCase().includes(search.toLowerCase()) || item.username.toLowerCase().includes(search.toLowerCase());

    })
    this.setState({genreUserSearch:arrSearch})
  }

  renderGenre = () => {
    return this.state.genreSearch.map(item => {
      if (item.id !== this.state.selectedGenre) {
        return (
          <tr key={item.id}>
            <td>{item.id}</td>
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
    const { role } = this.props.user;

    if (role !== "") {
      return (
        <div id="App">
          <Sidebar pageWrapId={"page-wrap"} outerContainerId={"App"} />
          <div id="page-wrap">
            <div className="container">
              <div className="row">
                <div className="col-4">
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
                  <h3 className="display-4 text-center">
                    Input Product Genre
                  </h3>
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
