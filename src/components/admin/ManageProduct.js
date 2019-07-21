import React, { Component } from "react";
import axios from "../../config/axios";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import cookies from "universal-cookie";
import { MDBDataTable } from "mdbreact";
import BootstrapSwitchButton from "bootstrap-switch-button-react";

import Sidebar from "./Sidebar";
import "../style.css";
import "../styleSwitch.css";

const cookie = new cookies();

class ManageProduct extends Component {
  state = {
    product: [],
    promo: [],
    productSearch: [],
    publisher: [],
    author: [],
    images: [],
    selectedID: 0,
    selectedPromo: 0,
    switch: true,
    switchEdit: true
  };

  componentDidMount() {
    this.getProduct();
    this.getPromo();
    this.getAuthor();
    this.getPublisher();
  }

  getPromo = async () => {
    await axios.get("/promo").then(res => {
      this.setState({
        promo: res.data.result,
        images: res.data.photo,
        selectedPromo: 0
      });
    });
  };
  addPromo = async () => {
    const formData = new FormData();
    const image = this.imagePromo.files[0];

    var promo_status = Number;
    if (this.state.switch) {
      promo_status = 1;
    } else {
      promo_status = 0;
    }

    formData.append("image", image);
    formData.append("promo_status", promo_status);
    try {
      const res = await axios.post(
        `/promo/add`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        }
      );
      this.getPromo();
    } catch (e) {
      console.log("upload gagal" + e);
    }
  };
  editPromo = id => {
    this.setState({ selectedPromo: id });
  };
  getProduct = async () => {
    await axios.get("/products").then(res => {
      this.setState({
        product: res.data,
        productSearch: res.data,
        selectedID: 0
      });
    });
  };
  getAuthor = () => {
    axios.get("/author").then(res => {
      this.setState({ author: res.data });
    });
  };
  getPublisher = () => {
    axios.get("/publisher").then(res => {
      this.setState({ publisher: res.data });
    });
  };
  filterProduct = () => {
    const search = this.searchProduct.value;

    var arrSearch = this.state.product.filter(item => {
      return item.product_name.toLowerCase().includes(search);
    });
    this.setState({ productSearch: arrSearch });
  };
  saveEdit = async id => {
    const formData = new FormData();
    const image = this.editImage.files[0];
    const name = this.editName.value;
    const stock = this.editStock.value;
    const price = this.editPrice.value;
    const page = this.editPage.value;
    const author = this.selectedAuthorId.value;
    const publisher = this.selectedPublisherId.value;

    formData.append("image", image);
    formData.append("product_name", name);
    formData.append("stock", stock);
    formData.append("price", price);
    formData.append("page", page);
    formData.append("author", author);
    formData.append("publisher", publisher);

    try {
      await axios.patch(`/products/edit/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });
      this.getProduct();
    } catch (e) {
      console.log(e);
    }
  };
  savePromo = async (id, index) => {
    const formData = new FormData();
    var image = this.imageEdit.files[0];

    if (image === undefined) {
      var img = this.state.images[index];
      image = img.slice(35, 57);
    }

    var promo_status = Number;

    if (this.state.switchEdit === true) {
      promo_status = 1;
    } else {
      promo_status = 0;
    }

    console.log(promo_status);

    formData.append("image", image);
    formData.append("promo_status", promo_status);
    try {
      const res = await axios.patch(
        `/promo/edit/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        }
      );
      this.getPromo();
    } catch (e) {
      console.log("upload gagal" + e);
    }
  };
  editProduct = id => {
    this.setState({ selectedID: id });
  };
  onAddProduct = async () => {
    const formData = new FormData();
    const images = this.image.files[0];
    const name = this.name.value;
    const stock = parseInt(this.stock.value);
    const price = parseInt(this.price.value);
    const page = parseInt(this.page.value);
    const author = this.selectAuthorId.value;
    const publisher = this.selectPublisherId.value;
    const synopsis = this.synopsis.value;

    formData.append("images", images);
    formData.append("product_name", name);
    formData.append("stock", stock);
    formData.append("price", price);
    formData.append("page", page);
    formData.append("author", author);
    formData.append("publisher", publisher);
    formData.append("synopsis", synopsis);
    try {
      const res = await axios.post(
        `/products/add`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        }
      );

      this.getProduct();
    } catch (e) {
      console.log("upload gagal" + e);
    }
  };
  selectAuthor = () => {
    return this.state.author.map(item => {
      return (
        <option key={item.id} value={item.id}>
          {item.author_name}
        </option>
      );
    });
  };
  selectPublisher = () => {
    return this.state.publisher.map(item => {
      return (
        <option key={item.id} value={item.id}>
          {item.publisher_name}
        </option>
      );
    });
  };

  renderPromo = () => {
    return this.state.promo.map((item, index) => {
      if (item.id !== this.state.selectedPromo) {
        return (
          <tr key={item.id}>
            <td>{item.id}</td>
            <td>
              <img className="list" src={item.image} alt={"promo"} />
            </td>
            <td>{item.promo_status}</td>
            <td>
              <button
                className="btn btn-primary mr-2"
                onClick={() => {
                  this.editPromo(item.id);
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
            <td scope="col">{item.id}</td>
            <td scope="col">
              <div className="custom-file">
                <input
                  type="file"
                  id="myfile"
                  ref={input => (this.imageEdit = input)}
                  className="custom-file-input"
                />
                <label className="custom-file-label" />
              </div>
            </td>
            <td scope="col">
              <BootstrapSwitchButton
                checked={false}
                onlabel="NOT ACTIVE"
                onstyle="danger"
                offlabel="ACTIVE"
                offstyle="success"
                style="w-100 mx-3"
                onChange={() => {
                  this.setState({ switchEdit: !this.state.switchEdit });
                }}
              />
            </td>
            <td className="d-flex flex-column">
              <button
                onClick={() => {
                  this.savePromo(item.id, index);
                }}
                className="btn btn-success mb-2"
              >
                Save
              </button>
              <button
                onClick={() => {
                  this.setState({ selectedPromo: 0 });
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
                ref={input => {
                  this.editName = input;
                }}
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
                  this.selectedAuthorId = input;
                }}
              >
                <option selected hidden>
                  choose here
                </option>
                {this.selectAuthor()}
              </select>
            </td>
            <td>
              <select
                className="custom-select"
                ref={input => {
                  this.selectedPublisherId = input;
                }}
              >
                <option selected hidden>
                  choose here
                </option>
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
                <label class="custom-file-label" for="customFile" />
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
    if (userCookie === undefined) {
      return <Redirect to="/admin/login" />;
    } else {
      return (
        <div id="App">
          <Sidebar pageWrapId={"page-wrap"} outerContainerId={"App"} />
          <div
            id="page-wrap"
            
          >
            <div className="container" style={{
              overflowY: "scroll",
              overflowX: "auto",
              height: "700px"
            }}>
              <ul className="nav nav-tabs" id="myTab" role="tablist">
                <li className="nav-item">
                  <a
                    className="nav-link lead active"
                    id="home-tab"
                    data-toggle="tab"
                    href="#product"
                    role="tab"
                    aria-controls="home"
                    aria-selected="true"
                  >
                    Product Table
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link lead"
                    id="profile-tab"
                    data-toggle="tab"
                    href="#promo"
                    role="tab"
                    aria-controls="profile"
                    aria-selected="false"
                  >
                    Promo
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link lead"
                    id="profile-tab"
                    data-toggle="tab"
                    href="#inputpromo"
                    role="tab"
                    aria-controls="profile"
                    aria-selected="false"
                  >
                    Input Promo
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link lead"
                    id="profile-tab"
                    data-toggle="tab"
                    href="#inputproduct"
                    role="tab"
                    aria-controls="profile"
                    aria-selected="false"
                  >
                    Input Product
                  </a>
                </li>
              </ul>
              <div className="tab-content profile-tab" id="myTabContent">
                <div
                  className="tab-pane fade show active"
                  id="product"
                  role="tabpanel"
                  aria-labelledby="home-tab"
                >
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
                </div>
                <div
                  className="tab-pane fade"
                  id="promo"
                  role="tabpanel"
                  aria-labelledby="home-tab"
                >
                  <h1 className="display-4 text-center">Product Promo</h1>
                  <table className="table table-hover">
                    <thead>
                      <th scope="col">ID</th>
                      <th scope="col">IMAGE</th>
                      <th scope="col">STATUS PROMO</th>
                      <th scope="col">ACTION</th>
                    </thead>
                    <tbody>{this.renderPromo()}</tbody>
                  </table>
                </div>
                <div
                  className="tab-pane fade"
                  id="inputpromo"
                  role="tabpanel"
                  aria-labelledby="home-tab"
                >
                  <h1 className="display-4 text-center">Input Promo</h1>
                  <table className="table table-hover">
                    <thead>
                      <th scope="col">ID</th>
                      <th scope="col">IMAGE</th>
                      <th scope="col">STATUS PROMO</th>
                      <th scope="col">ACTION</th>
                    </thead>
                    <tbody>
                      <th scope="col">ID</th>
                      <th scope="col">
                        <div className="custom-file">
                          <input
                            type="file"
                            id="myfile"
                            ref={input => (this.imagePromo = input)}
                            className="custom-file-input"
                          />
                          <label className="custom-file-label" />
                        </div>
                      </th>
                      <th scope="col">
                        <BootstrapSwitchButton
                          checked={false}
                          onlabel="NOT ACTIVE"
                          onstyle="danger"
                          offlabel="ACTIVE"
                          offstyle="success"
                          style="w-100 mx-3"
                          onChange={() => {
                            this.setState({ switch: !this.state.switch });
                          }}
                        />
                      </th>
                      <th scope="col">
                        <button
                          className="btn btn-outline-success"
                          onClick={this.addPromo}
                        >
                          Add
                        </button>
                      </th>
                    </tbody>
                  </table>
                </div>
                <div
                  className="tab-pane fade"
                  id="inputproduct"
                  role="tabpanel"
                  aria-labelledby="home-tab"
                >
                  <h1 className="display-4 text-center">Input Product</h1>
                  <table className="table text-center">
                    <thead>
                      <tr>
                        <th scope="col" />
                        <th scope="col" />
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <th scope="col">NAME</th>
                        <th scope="col">
                          <input
                            ref={input => (this.name = input)}
                            className="form-control"
                            type="text"
                          />
                        </th>
                      </tr>
                      <tr>
                        <th scope="col">STOCK</th>
                        <th scope="col">
                          <input
                            ref={input => (this.stock = input)}
                            className="form-control"
                            type="text"
                          />
                        </th>
                      </tr>
                      <tr>
                        <th scope="col">PRICE</th>
                        <th scope="col">
                          <input
                            ref={input => (this.price = input)}
                            className="form-control"
                            type="text"
                          />
                        </th>
                      </tr>
                      <tr>
                        <th scope="col">PAGE</th>
                        <th scope="col">
                          <input
                            ref={input => (this.page = input)}
                            className="form-control"
                            type="text"
                          />
                        </th>
                      </tr>
                      <tr>
                        <th scope="col">AUTHOR</th>
                        <th>
                          <select
                            className="select-custom form-control"
                            ref={input => {
                              this.selectAuthorId = input;
                            }}
                          >
                            {this.selectAuthor()}
                          </select>
                        </th>
                      </tr>
                      <tr>
                        <th scope="col">PUBLISHER</th>
                        <th>
                          <select
                            className="select-custom form-control"
                            ref={input => {
                              this.selectPublisherId = input;
                            }}
                          >
                            {this.selectPublisher()}
                          </select>
                        </th>
                      </tr>
                      <tr>
                        <th scope="col">IMAGE</th>
                        <th scope="col">
                          <div className="custom-file">
                            <input
                              type="file"
                              id="myfile"
                              ref={input => (this.image = input)}
                              className="custom-file-input"
                            />
                            <label className="custom-file-label" />
                          </div>
                        </th>
                      </tr>
                      <tr>
                        <th scope="col">SYNOPSIS</th>
                        <textarea
                          type="text"
                          className="form-control"
                          ref={input => {
                            this.synopsis = input;
                          }}
                        />
                      </tr>
                      <tr>
                        <th scope="col" colSpan="2">
                          <button
                            className="btn btn-outline-success btn-block"
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
    }
  }
}

const mapStateToProps = state => {
  return { user: state.auth };
};

export default connect(mapStateToProps)(ManageProduct);
