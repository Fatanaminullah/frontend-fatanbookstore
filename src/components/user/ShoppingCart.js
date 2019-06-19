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
    checkOut : []
  };
  componentDidMount() {
    this.getCart();
    RajaOngkir.getProvinces().then(function (result){
      // Aksi ketika data Provinsi berhasil ditampilkan
      console.log(result);
      
  }).catch(function (error){
      // Aksi ketika error terjadi
      console.log(error);
      
  });
  }

  getCart = async () => {
    await axios.get(`/cart/${cookie.get('idLogin')}`).then(res => {
      this.setState({ cartItem: res.data });
    });
  };
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
            <p className="card-text">Total</p>
            <p className="card-text text-right">
              Rp. {total.toLocaleString()}
            </p>
          </div>
        </div>
      ),
      icon: "warning",
      buttons: ["Cancel","Order"],
      dangerMode:true
    }).then(result => {
      if (result) {
        axios.post(`/orders/${userid}`).then(
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
        Swal("Success!", "Your item has been ordered!", "success");
      } else {
        Swal("Cancelled", "", "info");
      }
    });}
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
                    <p className="card-text">
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
  chooseShipment = () => {

  }
  render() {

    if (cookie.get('idLogin')) {
      if(this.state.cartItem.length !== 0){
        if(parseInt(cookie.get('cartqty')) !== this.state.cartItem.length) this.getCart()
        var total = 0
        this.state.cartItem.forEach(items => { total += (items.quantity * items.price)} )
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
                  <p className="lead text-dark">Estimated shipping cost : </p>
                </div>
                <div className="card-body">
            {this.renderList()}
                </div>
              </div>
            </div>
            <div className="col-md-4 col-sm-12 order-sm-1">
              <div className="card m-2 fixed" id="cekout">
                <div className="card-header">Tagihan</div>
                <div className="card-body">
                {this.renderListCheckout()}
                  <p className="card-text">Total</p>
                  <p className="card-text text-right">Rp. {total.toLocaleString()}</p>
                </div>
                <div className="card-footer">
                <button className="btn btn-outline-secondary btn-block" onClick={() => {this.placeOrder(cookie.get('idLogin'))}}>Continue to Payment</button>
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
