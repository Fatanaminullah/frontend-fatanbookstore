import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import cookies from 'universal-cookie'

import Sidebar from "./Sidebar";
import "../style.css";

const cookie = new cookies()

class ManageProduct extends Component {
  state = {
    product: [],
    productSearch: [],
    publisher:[],
    author:[],
    selectedID: 0
  };

  componentDidMount() {
    this.getProduct();
    this.getAuthor();
    this.getPublisher();
  }

  getProduct = async () => {
    await axios.get("http://localhost:2000/products").then(res => {
      
      this.setState({ product: res.data, productSearch:res.data,selectedID: 0 });
    });
    
    
  };
  getAuthor = () => {
    axios.get("http://localhost:2000/author").then(res => {
      this.setState({ author: res.data});
    });
  };
  getPublisher = () => {
    axios.get("http://localhost:2000/publisher").then(res => {
      this.setState({ publisher: res.data});
    });
  };
  filterProduct = () => {
    const search = this.searchProduct.value

    var arrSearch = this.state.product.filter(item => {
      
      return item.product_name.toLowerCase().includes(search) 
      
    })
    this.setState({productSearch:arrSearch})
  }
  saveEdit = async (id) => {
      const formData = new FormData();
      const image = this.editImage.files[0];
      const name = this.editName.value
      const stock = this.editStock.value
      const price = this.editPrice.value
      const page = this.editPage.value
      const author = this.selectAuthorId.value
      const publisher = this.selectPublisherId.value

          
      formData.append("image", image);
      formData.append("product_name", name);
      formData.append("stock", stock);
      formData.append("price", price);
      formData.append("page", page);
      formData.append("author", author);
      formData.append("publisher", publisher);
      
      try{
        await axios.patch(`http://localhost:2000/products/edit/${id}`, formData,{
        headers:{
          "Content-Type": "multipart/form-data"
        }
      })
      this.getProduct()
      }catch (e){
        console.log(e);
      }
  }
  editProduct = (id) => {
      this.setState({ selectedID: id })
  }
  onAddProduct = async () => {
    const formData = new FormData();
    const images = this.image.files[0];
    const name = this.name.value
    const stock = parseInt(this.stock.value)
    const price = parseInt(this.price.value)
    const page = parseInt(this.page.value)
    const author = this.selectAuthorId.value
    const publisher = this.selectPublisherId.value
    
    formData.append("images", images);
    formData.append("product_name", name);
    formData.append("stock", stock);
    formData.append("price", price);
    formData.append("page", page);
    formData.append("author", author);
    formData.append("publisher", publisher);
    try {
      const res = await axios.post(`http://localhost:2000/products/add`,formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      })
      
      this.getProduct()
    } catch (e) {
      console.log("upload gagal"+e);
    }
  };
  selectAuthor = () => {
    
    return this.state.author.map(item => {
      return (
        <option key={item.id} value={item.id}>{item.author_name}</option>
      )
    })
  }
  selectPublisher = () => {
    return this.state.publisher.map(item => {
      return (
        <option key={item.id} value={item.id}>{item.publisher_name}</option>
      )
    })
  }

  renderList = () => {
    
    return this.state.productSearch.map(item => {
      
      if (item.id !== this.state.selectedID) {
        return (
          <tr key={item.id}>
            <td>{item.id}</td>
            <td>{item.product_name}</td>
            <td>{item.stock}</td>
            <td>{item.price}</td>
            <td>{item.page}</td>
            <td>{item.author_name}</td>
            <td>{item.publisher_name}</td>
            <td>
              <img className="list" src={item.image} alt={item.product_name} />
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
                type="number"
                defaultValue={item.stock || 0}
              />
            </td>
            <td>
              <input
                className="form-control"
                ref={input => {
                  this.editPrice = input;
                }}
                type="number"
                defaultValue={item.price || 0}
              />
            </td>
            <td>
              <input
                className="form-control"
                ref={input => {
                  this.editPage = input;
                }}
                type="number"
                defaultValue={item.page || 0}
              />
            </td>
            <td>
            <select
                className="custom-select"
                ref={input => {
                  this.selectAuthorId = input;
                }}
                defaultChecked={item.author}
              >
                <option selected hidden>choose here</option>
                {this.selectAuthor()}
              </select>
            </td>
            <td>
            <select
                className="custom-select"
                ref={input => {
                  this.selectPublisherId = input;
                }}
              >
                <option selected hidden>choose here</option>
                {this.selectPublisher()}
              </select>
            </td>
            <td>
              <div className="custom-file">
              <input
                className="custom-file-input"
                ref={input => {
                  this.editImage = input;
                }}
                type="file"
                id="customFile"
              />
              <label class="custom-file-label" for="customFile"></label>
              </div>
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
    var userCookie = cookie.get("stillLogin"); 

    if (userCookie === undefined ) {
      return (
        <Redirect to="/admin/login" />
      ) 
    }else{
      return (
        <div id="App">
          <Sidebar pageWrapId={"page-wrap"} outerContainerId={"App"} />
          <div id="page-wrap">
            <div className="container">
              <h1 className="display-4 text-center">Product Table</h1>
            <div className="input-group search-box">
                      <input
                        type="text"
                        ref={input => (this.searchProduct = input)}
                        className="form-control"
                        placeholder="Search Product here..."
                        onKeyUp={this.filterProduct}
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
                    <th>
            <select
                className="select-custom"
                ref={input => {
                  this.selectAuthorId = input;
                }}
              >
                {this.selectAuthor()}
              </select>
            </th>
            <th>
            <select
                className="select-custom"
                ref={input => {
                  this.selectPublisherId = input;
                }}
              >
                {this.selectPublisher()}
              </select>
            </th>
                    <th scope="col">
                      <div className="custom-file">
                      <input
                        type="file"
                        id="myfile"
                        ref={input => (this.image = input)}
                        className="custom-file-input"
                      />
                      <label className="custom-file-label"></label>
                      </div>
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
    }
  }
}

const mapStateToProps = state => {
  return { user: state.auth };
};

export default connect(mapStateToProps)(ManageProduct);
