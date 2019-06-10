import React, { Component } from "react";
import axios from "../../config/axios";
import { connect } from "react-redux";
import { Redirect, Link } from "react-router-dom";
import cookies from "universal-cookie";
import Swal from 'sweetalert2'



const cookie = new cookies();

class ShoppingCart extends Component {
  state = {
    cartItem: [],
    checkOut : []
  };
  componentDidMount() {
    this.getCart();
  }

  getCart = async () => {
    await axios.get(`/cart/${cookie.get('idLogin')}`).then(res => {
      this.setState({ cartItem: res.data });
    });
  };
  deleteCart = (productId,userId) => {
    Swal.fire({
      text: 'Are you sure want to delete this item?',
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.value) {
        axios.delete(`http://localhost:2000/cart/delete/${productId}/${userId}`)
        .then(res => {
              this.getCart();
            },
            err => {
              console.log(err);
            }
          );
          Swal.fire(
            'Deleted!',
            'Your imaginary file has been deleted.',
            'success'
          )
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelled',
          'Your imaginary file is safe :)',
          'error'
        )
      }
    })
    
  };

  addQty = (qty,index) => {
    qty += 1

    this.state.cartItem[index].quantity = qty

    this.renderList()

    // console.log(this.state.cartItem[index].quantity);
  }
  addQty = (index) => {
    const data = [...this.state.cartItem];
    data[index].quantity += 1;
    
    this.setState({ data });
};
  reduceQty = (index) => {
    const data = [...this.state.cartItem];
    data[index].quantity -= 1;
    
    this.setState({ data });
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
                  <p className="card-text font-weight-bold">
                    {product.product_name}
                  </p>
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
                        onClick={() => {this.reduceQty(index)}}
                      >
                        <i className="fas fa-minus"></i>
                      </button>
                    </span>
                    <input
                      type="text"
                      className="form-control input-number"
                      value={this.state.cartItem[index].quantity}
                      min="1"
                      max="100"
                    />
                    <span className="input-group-btn">
                      <button
                        className="btn btn-success btn-number"
                        onClick={() => {this.addQty(index)}}
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
                    this.deleteCart(product.id, cookie.get("idLogin"));
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
  render() {
    if (cookie.get('idLogin')) {
      if(this.state.cartItem.length !== 0){

        var total = 0
        this.state.cartItem.forEach(items => { total += (items.quantity * items.price)} )
      return (
        <div className="container">
          <div className="row">
            <h1 className="mx-auto display-4">Your Shopping Cart</h1>
          </div>
          <div className="row">
            <div className="col-8">{this.renderList()}</div>
            <div className="col-4">
              <div className="card m-2 fixed">
                <div className="card-header">Tagihan</div>
                <div className="card-body">
                {this.renderListCheckout()}
                  <p className="card-text">Total</p>
                  <p className="card-text text-right">Rp. {total.toLocaleString()}</p>
                </div>
                <div className="card-footer">
                <button className="btn btn-outline-secondary btn-block">Continue to Payment</button>
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
      Swal.fire(
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

export default connect(mapStateToProps)(ShoppingCart);
