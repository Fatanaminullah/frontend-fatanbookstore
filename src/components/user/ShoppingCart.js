import React, { Component } from "react";
import axios from "../../config/axios";
import { connect } from "react-redux";
import { Redirect, Link } from "react-router-dom";
import cookies from "universal-cookie";
import {deleteCart} from '../../actions'
import Swal from '@sweetalert/with-react';

var RajaOngkir = require('rajaongkir-nodejs').Starter('3ff51db00cb996364b49206f71d895a3');
 

const cookie = new cookies();

class ShoppingCart extends Component {
  state = {
    cartItem: [],
    checkOut : [],
    address:[],
    kodepos : [],
    provinsi:[],
    kabupaten: [],
    kecamatan: [],
    kelurahan: [],
    filterKodepos: [],
    destination : 'Choose Your Destination'
  };
  componentDidMount() {
    this.getCart();
    this.getAddress(cookie.get('idLogin'))
    this.getKodepos()
  }
  
  getKodepos = async () => {
    try {
      const res = await axios.get(`/kodepos`);
      this.setState({
        kodepos: res.data
      });
      
    } catch (e) {
      console.log(e);
    }
    try{
      const res = await axios.get(`/province`);
      this.setState({
          provinsi: res.data
        });
        
      } catch (e) {
        console.log(e);
      }
    }
  selectKodepos = () => {
    return this.state.filterKodepos.map(item => {
      if(item.kodepos === this.state.address[0].kodepos){
        return(
          <option key={item.id} value={item.id} selected>
          {item.kodepos}
        </option>
        )
      }
      return (
        <option key={item.id} value={item.id}>
          {item.kodepos}
        </option>
      );
    });
  };
  selectProvinsi = () => {
    return this.state.provinsi.map(item => {
      return (
        <option key={item.provinsi} value={item.provinsi}>
          {item.provinsi}
        </option>
      );
    });
  };
  selectKabupaten = () => {
    console.log(this.state.kabupaten);
    
    return this.state.kabupaten.map(item => {
      return (
        <option key={item.kabupaten} value={item.kabupaten}>
          {item.kabupaten}
        </option>
      );
    });
  };
  selectKecamatan = () => {
    return this.state.kecamatan.map(item => {
      return (
        <option key={item.kecamatan} value={item.kecamatan}>
          {item.kecamatan}
        </option>
      );
    });
  };
  selectKelurahan = () => {
    return this.state.kelurahan.map(item => {
      return (
        <option key={item.kelurahan} value={item.kelurahan}>
          {item.kelurahan}
        </option>
      );
    });
  };
  filterKodepos = async () => {
    const kelurahan = this.kelurahan.value;
    
    try {
      const res = await axios.get(`/kodepos/${kelurahan}`);
      this.setState({
        filterKodepos: res.data
      });
      
    } catch (e) {
      console.log(e);
    }
  };
  filterKabupaten = async () => {
    const provinsi = this.provinsi.value;

    try {
      const res = await axios.get(`/kabupaten/${provinsi}`);
      this.setState({
        kabupaten: res.data
      });
      
    } catch (e) {
      console.log(e);
    }
  };
  filterKecamatan = async () => {
    const kabupaten = this.kabupaten.value;

    try {
      const res = await axios.get(`/kecamatan/${kabupaten}`);
      this.setState({
        kecamatan: res.data
      });
      
    } catch (e) {
      console.log(e);
    }
  };
  filterKelurahan = async () => {
    const kecamatan = this.kecamatan.value;
    
    
    try {
      const res = await axios.get(`/kelurahan/${kecamatan}`);
      console.log(res.data);
      this.setState({
        kelurahan: res.data
      });
      
    } catch (e) {
      console.log(e);
    }
  };

  getCart = async () => {
    await axios.get(`/cart/${cookie.get('idLogin')}`).then(res => {
      this.setState({ cartItem: res.data });
    });
  };
  getAddress = async userid => {
    try {
      const res = await axios.get(
        `/user/info/${userid}`
      );
      
      
      this.setState({
        address: res.data
      });
      
    } catch (e) {
      console.log(e);
    }
  }
  onDeleteCart = (productId,userId) => {
    
    this.props.deleteCart(productId,userId)
  };
  placeOrder = (userid) => {
    var total = 0
    this.state.cartItem.forEach(items => { total += (items.quantity * items.price)} )
    Swal({
      text:
        "Check again your order! if you have confirm your order,please choose confirm",
      content: (
        <div className="card m-2 fixed" id="cekout">
          <div className="card-header">Tagihan</div>
          <div className="card-body">
            {this.renderListCheckout()}
            <p className="card-text text-left">Total</p>
            <p className="card-text text-right">
              Rp. {total.toLocaleString()}
            </p>
            <p className="card-text text-left">Shipping to</p>
            <p className="card-text text-right"> {this.state.destination} </p>
          </div>
        </div>
      ),
      icon: "warning",
      buttons: ["Cancel","Order"],
      dangerMode:true
    }).then(result => {
      if (result) {
        axios.post(`/orders/${userid}`,{total}).then(
          res => {
            console.log(res);
            var orderItem = [];
            this.state.cartItem.map(item => {
              orderItem.push([
                item.id,
                item.price,
                item.quantity,
                res.data.orderid
              ]);
            });
            console.log(orderItem);
            axios.post("/orderitem", [orderItem]).then(
              res => {
                console.log(res);
              },
              err => {
                console.log(err + "orderitem");
              }
            );
          },
          err => {
            console.log(err + "order");
          }
        );
        Swal({
          title:"Succes",
          text:"Your item has been successfully ordered",
          icon:"success"
        })
      } else {
        Swal("Cancelled", "", "info");
      }
    })}

    selectDestination = () => {
      return(
        <div className="list-group">
        <li className="list-group-item pl-0">
          <p>Kodepos</p>
          <select
            type="text"
            className="form-control"
            ref={input => {
              this.kodepos = input;
            }}
          >
            {this.selectKodepos()}
          </select>
        </li>
        <li className="list-group-item pl-0">
          <p>Provinsi</p>
          <select
            type="text"
            className="form-control"
            ref={input => {
              this.provinsi = input;
            }}
            onChange={this.filterKabupaten}
          >
            {this.selectProvinsi()}
          </select>
        </li>
        <li className="list-group-item pl-0">
          <p>Kota/Kabupaten</p>
          <select
            type="text"
            className="form-control"
            ref={input => {
              this.kabupaten = input;
            }}
            onChange={this.filterKecamatan}
          >
            {this.selectKabupaten()}
          </select>
        </li>
        <li className="list-group-item pl-0">
          <p>Kecamatan</p>
          <select
            type="text"
            className="form-control"
            ref={input => {
              this.kecamatan = input;
            }}
            onChange={this.filterKelurahan}
          >
            {this.selectKecamatan()}
          </select>
        </li>
        <li className="list-group-item pl-0">
          <p>Kelurahan</p>
          <select
            type="text"
            className="form-control"
            ref={input => {
              this.kelurahan = input;
            }}
            onChange={this.filterKodepos}
          >
            {this.selectKelurahan()}
          </select>
        </li>
        
        </div>
      )
      
    }
  addQty = async(index,userid,productid) => {
    const data = [...this.state.cartItem];
    data[index].quantity += 1;
    var quantity = data[index].quantity
    
    this.setState({ data });

    try {
      const res = await axios.patch(`/cart/update/${userid}/${productid}`,{
        quantity
    })
      console.log(res);
      
    } catch (error) {
      console.log(error);
    }
};
  reduceQty = async(index,userid,productid) => {
    const data = [...this.state.cartItem];
    data[index].quantity -= 1;
    var quantity = data[index].quantity
    
    this.setState({ data });

    try {
      const res = await axios.patch(`/cart/update/${userid}/${productid}`,{
        quantity
      })
      console.log(res);
      
    } catch (error) {
      console.log(error);
      
      
    }
};

  renderList = () => { 
      return this.state.cartItem.map((product,index) => {        
        return (
          <div className="card m-2 col-12" key={product.id}>
            <div className="card-body">
              <div className="row">
                <div className="col-4">
                  <img
                    className="img-detail-cart"
                    src={product.image}
                    alt={product.product_name}
                  />
                </div>
                <div className="col-8">
                          <Link to={`/detailproduct/${product.id}`}>
                  <p className="card-text font-weight-bold">
                    {product.product_name}
                  </p>
                    </Link>
                  <p className="card-text text-secondary">
                    {product.author_name}
                  </p>
                  <p className="card-text text-danger">
                    Rp {product.price.toLocaleString()}
                  </p>
                  <div className="input-group">
                    <span className="input-group-btn">
                      <button
                        className="btn btn-danger btn-number"
                        onClick={() => {this.reduceQty(index,cookie.get('idLogin'),product.id)}}
                      >
                        <i className="fas fa-minus"></i>
                      </button>
                    </span>
                    <input
                      type="number"
                      className="form-control input-number"
                      value={product.quantity}
                      min="1"
                      max={product.stock}
                      />
                    <span className="input-group-btn">
                      <button
                        className="btn btn-success btn-number"
                        onClick={() => {this.addQty(index,cookie.get('idLogin'),product.id)}}
                        >
                        <i className="fas fa-plus"></i>
                      </button>
                    </span>
                  </div>
                </div>
              </div>
              <div className="row">
                <button
                  className="btn btn-outline-secondary btn-circle ml-auto"
                  onClick={() => {
                    this.onDeleteCart(product.id, cookie.get("idLogin"));
                  }}
                >
                  &times;
                </button>
              </div>
            </div>
          </div>
        );
    });
  };
  renderListCheckout = () =>{
    return this.state.cartItem.map(product =>{
        var productName = product.product_name
        var quantity = product.quantity
        var subtotal = product.quantity * product.price
       
        if (cookie.get('idLogin')) {
            return (
                <div>
                    <p className="card-text text-left">
                    {quantity} x {productName} 
                    </p>
                    <p className="card-text text-right">
                        Rp. {subtotal}
                    </p>
                </div>
            )
        }
    })
  }
  
  render() {

    if (cookie.get('idLogin')) {
      if(this.state.cartItem.length !== 0){
        if(parseInt(cookie.get('cartqty')) !== this.state.cartItem.length) this.getCart()
        var total = 0
        var delivfee = 0
        this.state.cartItem.forEach(items => { total += (items.quantity * items.price) + delivfee} )
      return (
        <div className="container">
          <div className="row">
            <h1 className="mx-auto display-4">Your Shopping Cart</h1>
          </div>
          <div className="row">
            <div className="col-md-8 col-sm-12 order-sm-2">
              <div className="card">
                <div className="card-header d-flex justify-content-between">
                  <p className="lead text-dark">SHOPPING CART :  {cookie.get('cartqty')} ITEMS</p>
                </div>
                <div className="card-body">
            {this.renderList()}
                </div>
              </div>
            </div>
            <div className="d-flex flex-column col-md-4 col-sm-12 order-sm-1 ">
              <div className="card m-2 fixed" id="cekout">
                <div className="card-header">Tagihan</div>
                <div className="card-body">
                {this.renderListCheckout()}
                  <p className="card-text">Delivery Fee</p>
                  <p className="card-text text-right"> FREE </p>
                  <p className="card-text">Total</p>
                  <p className="card-text text-right">Rp. {total.toLocaleString()}</p>
                </div>
                <div className="card-footer">
                <button className="btn btn-outline-secondary btn-block" onClick={() => {this.placeOrder(cookie.get('idLogin'))}}>Checkout</button>
                </div>
              </div>
              <div className="card m-2 fixed">
                <div className="card-header">Select Destination</div>
                <div className="card-body">
                {this.selectDestination()}
                </div>
                <div className="card-footer">
                  <div className="d-flex flex-fill">
          <button className="btn btn-success btn-block mx-1" >Set Address</button>
          <button className="btn btn-primary btn-block mx-1">Use your Address</button>
        </div>
                </div>
            </div>
              </div>
          </div>
        </div>
      );
      }else{
        return(
          <div className="container">
          <div className="card">
            <div className="card-title mx-auto">
              <h1 className="display-4">Your ShoppingCart is Empty</h1>
            </div>
            <div className="card-title mx-auto">
              <Link to="/"><button className="btn btn-outline-warning" style={{fontSize:'30px'}}>Let's Go Shopping!</button></Link>
            </div>
          </div>
          </div>
        )
      }
    } else {
      Swal(
        `Error`,
        'Please login to continue',
        'error'
      )
      return <Redirect to="/login" />;
    }
  }
}

const mapStateToProps = state => {
  return { user: state.auth };
};

export default connect(mapStateToProps,{deleteCart})(ShoppingCart);
