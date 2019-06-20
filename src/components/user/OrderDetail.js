import React, { Component } from "react";
import {Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import axios from "../../config/axios";
import cookies from "universal-cookie";
import {Link} from 'react-router-dom'

const cookie = new cookies();


class Order extends Component {
    cardheader = {
        backgroundColor: "#d3d3d3"
      }
    
    state = {
        orderitem : undefined
    }
    
    componentDidMount (){
        const ordercode = parseInt(this.props.match.params.orderid)

        this.getOrderItem(ordercode)
    }

    getOrderItem = async ordercode => {
        try {
            const res = await axios.get(
              `/orderitem/${ordercode}`
            );
      
            this.setState({
              orderitem: res.data
            });
            
          } catch (e) {
            console.log(e);
          }

    }


    renderOrder = () => {
        if(this.state.orderitem === undefined){
            return(
            <div className="card">
                <div className="card-body">
                    <h1>Your Order is Empty!</h1>
                </div>
            </div>
            )
        }
        return this.state.orderitem.map((product,index) => {
            return(
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
            )
        })

    }

    render() {
        const ordercode = parseInt(this.props.match.params.orderid)
        if (cookie.get("stillLogin")) {
            if (this.state.orderitem !== undefined) {
            return (
              <div className="container">
                <div className="row mt-5">
                  <div className="col-3">
                    <div className="card p-0">
                      <h3 className="text-center card-title p-3">
                        Your Account
                      </h3>
                      <div className="card-header">
                        <Link to="/profile" className="text-dark">
                          <p className="lead text-center">Profile</p>
                        </Link>
                      </div>
                      <div className="card-header">
                        <Link to="/addresscontact" className="text-dark">
                          <p className="lead text-center">
                            Address & Contact Info
                          </p>
                        </Link>
                      </div>
                      <div className="card-header"  style={this.cardheader}>
                      <Link to="/order" className="text-dark">
                    <p className="lead text-center">My Orders</p>
                    </Link>
                      </div>
                      <div className="card-header">
                        <p className="lead text-center">Order History</p>
                      </div>
                      <div className="card-header">
                        <p className="lead text-center">
                          Payment
                        </p>
                      </div>
                      <div className="card-body" />
                    </div>
                  </div>
                  <div className="col-9">
                    <div className="card">
                      <ul className="list-group list-group-flush">
                        <div className="card-header">
                          <div className="text-center">
                          <h3>Order {ordercode} </h3>
                          </div>
                        </div>
                        {this.renderOrder()}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            );
        } else {
            return <h1>Loading</h1>;
          }
        } else {
          return <Redirect to="/login" />;
        }
      }

}

const mapStateToProps = state => {
    return { user: state.auth };
  };
  
  export default connect(
    mapStateToProps
  )(Order);
  