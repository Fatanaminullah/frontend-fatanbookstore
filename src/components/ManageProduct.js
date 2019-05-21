import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import Sidebar from "./Sidebar";
import "./style.css";

class ManageProduct extends Component {
  state = {
    product: [],
    selectedID: 0
  };

  componentDidMount() {
    this.getProduct();
  }

  getProduct = () => {
    axios.get("http://localhost:2000/products").then(res => {
      this.setState({ product: res.data, selectedID: 0 });
    });
  };
  saveEdit = (id) => {
      const name = this.editName.value
      const stock = this.editStock.value
      const price = parseInt(this.editPrice.value)
      const page = this.editPage.value
      const author = this.editAuthor.value
      const publisher = this.editPublisher.value
      const image = this.editImage.value
      axios.patch(`http://localhost:2000/products/edit/${id}`, {
          product_name:name,stock,price,page,author,publisher,image
      }).then(() => {
          this.getProduct()
      })
  }
  editProduct = (id) => {
      this.setState({ selectedID: id })
  }
  onAddProduct = () => {
    const name = this.name.value
    const stock = parseInt(this.stock.value)
    const price = parseInt(this.price.value)
    const page = parseInt(this.page.value)
    const author = parseInt(this.author.value)
    const publisher = parseInt(this.publisher.value)
    const image = this.image.value
      this.addProduct(name, stock, price, page,author,publisher,image)
      console.log(this.props.success);

  }
  addProduct = (name, stock, price, page,author,publisher,image) => {
    axios.post("http://localhost:2000/products/add", {
      product_name:name, stock, price, page,author,publisher,image
    }).then(res => {
      console.log(res);
          this.getProduct()
      })
  }

  renderList = () => {
    return this.state.product.map(item => {
      if (item.id !== this.state.selectedID) {
        return (
          <tr key={item.id}>
            <td>{item.id}</td>
            <td>{item.product_name}</td>
            <td>{item.stock}</td>
            <td>{item.price}</td>
            <td>{item.page}</td>
            <td>{item.author}</td>
            <td>{item.publisher}</td>
            <td>
              <img className="list" src={item.image} alt={item.desc} />
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
                ref={input => {this.editName = input}}
                type="text"
                defaultValue={item.product_name}
              />
            </td>
            <td>
              <input
                className="form-control"
                ref={input => {
                  this.editStock = input;
                }}
                type="text"
                defaultValue={item.stock}
              />
            </td>
            <td>
              <input
                className="form-control"
                ref={input => {
                  this.editPrice = input;
                }}
                type="text"
                defaultValue={item.price}
              />
            </td>
            <td>
              <input
                className="form-control"
                ref={input => {
                  this.editPage = input;
                }}
                type="text"
                defaultValue={item.page}
              />
            </td>
            <td>
              <input
                className="form-control"
                ref={input => {
                  this.editAuthor = input;
                }}
                type="text"
                defaultValue={item.author}
              />
            </td>
            <td>
              <input
                className="form-control"
                ref={input => {
                  this.editPublisher = input;
                }}
                type="text"
                defaultValue={item.publisher}
              />
            </td>
            <td>
              <input
                className="form-control"
                ref={input => {
                  this.editImage = input;
                }}
                type="text"
                defaultValue={item.pict}
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
              <h1 className="display-4 text-center">Product Table</h1>
              <table className="table table-hover mb-5">
                <thead>
                  <tr>
                    <th scope="col">ID</th>
                    <th scope="col">NAME</th>
                    <th scope="col">STOCK</th>
                    <th scope="col">PRICE</th>
                    <th scope="col">PAGE</th>
                    <th scope="col">AUTHOR</th>
                    <th scope="col">PUBLISHER</th>
                    <th scope="col">IMAGE</th>
                    <th scope="col">ACTION</th>
                  </tr>
                </thead>
                <tbody>{this.renderList()}</tbody>
              </table>
              <h1 className="display-4 text-center">Input Product</h1>
              <table className="table text-center">
                <thead>
                  <tr>
                  <th scope="col">ID</th>
                    <th scope="col">NAME</th>
                    <th scope="col">STOCK</th>
                    <th scope="col">PRICE</th>
                    <th scope="col">PAGE</th>
                    <th scope="col">AUTHOR</th>
                    <th scope="col">PUBLISHER</th>
                    <th scope="col">IMAGE</th>
                    <th scope="col">ACTION</th>
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
                      <input
                        ref={input => (this.stock = input)}
                        className="form-control"
                        type="text"
                      />
                    </th>
                    <th scope="col">
                      <input
                        ref={input => (this.price = input)}
                        className="form-control"
                        type="text"
                      />
                    </th>
                    <th scope="col">
                      <input
                        ref={input => (this.page = input)}
                        className="form-control"
                        type="text"
                      />
                    </th>
                    <th scope="col">
                      <input
                        ref={input => (this.author = input)}
                        className="form-control"
                        type="text"
                      />
                    </th>
                    <th scope="col">
                      <input
                        ref={input => (this.publisher = input)}
                        className="form-control"
                        type="text"
                      />
                    </th>
                    <th scope="col">
                      <input
                        ref={input => (this.image = input)}
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
      );
    } else {
      console.log(role);
      
      return <Redirect to="/admin/login" />;
    }
  }
}

const mapStateToProps = state => {
  return { user: state.auth };
};

export default connect(mapStateToProps)(ManageProduct);
