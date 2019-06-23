import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import axios from "../../config/axios";
import cookies from "universal-cookie";
import { Link } from "react-router-dom";
import Swal from "@sweetalert/with-react";

import imgpayment from "../../img/payment_slip.png";

const cookie = new cookies();

class Payment extends Component {
  cardheader = {
    backgroundColor: "#d3d3d3"
  };

  state = {
    order: undefined,
    bank: [],
    image: imgpayment
  };

  componentDidMount() {
    const userid = cookie.get("idLogin");
    this.getOrder(userid);
    this.getBank();
  }

  getOrder = async userid => {
    try {
      const res = await axios.get(`/order/${userid}`);

      this.setState({
        order: res.data
      });
    } catch (e) {
      console.log(e);
    }
  };

  getBank = () => {
    axios.get("/bank").then(res => {
      this.setState({ bank: res.data });
    });
  };

  howToPay = () => {
    Swal(
      <div className="card w-100">
        <div className="card-header">
          <h3>Instruction</h3>
        </div>
        <div className="card-body w-80">
          <p className="text-secondary text-left">
            1. Transfer to Bank's Account that you choose with total amount of
            your order
          </p>
          <p className="text-secondary text-center">BCA : 0326548658</p>
          <p className="text-secondary text-center">Mandiri : 087696586422</p>
          <p className="text-secondary text-center">BNI : 0390513426</p>
          <p className="text-secondary text-center">BRI : 2736548972</p>
          <p className="text-secondary text-left">
            2. Back to payment page and then choose bank from the bank list that
            shown
          </p>
          <p className="text-secondary text-left">4. Input Your Order Code</p>
          <p className="text-secondary text-left">5. Upload Payment Slip</p>
          <p className="text-secondary text-center font-weight-bold">
            And Your order has been successfully paid
          </p>
        </div>
      </div>
    );
  };

  renderBank = () => {
    return this.state.bank.map(item => {
      return <option value={item.id}> {item.bank_name} </option>;
    });
  };

  handleChange = e => {
    this.setState({ image: URL.createObjectURL(e.target.files[0]) });
  };

  payOrder = async () => {
    const formData = new FormData();
    const id = this.idbank.value;
    const order_code = this.orderCode.value;
    const imagefile = this.gambar;

    formData.append("payment_confirmation", imagefile.files[0]);
    formData.append("id", id);

    await axios.post(`/payment/uploads/${order_code}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      }).then(res => {
          Swal({
              title: "Payment Success",
              icon: "success",
              text : "Your Order has been successfully paid!"
          })
          
      },err => {
          Swal({
            title: "Payment Failed",
            icon: "error",
            text: "halo"
          });
      });
        
    }

  render() {
    if (cookie.get("stillLogin")) {
      if (this.state.order !== undefined) {
        return (
          <div className="container">
            <div className="row mt-5">
              <div className="col-3">
                <div className="card p-0">
                  <h3 className="text-center card-title p-3">Your Account</h3>
                  <div className="card-header">
                    <Link to="/profile" className="text-dark">
                      <p className="lead text-center">Profile</p>
                    </Link>
                  </div>
                  <div className="card-header">
                    <Link to="/addresscontact" className="text-dark">
                      <p className="lead text-center">Address & Contact Info</p>
                    </Link>
                  </div>
                  <div className="card-header">
                    <Link to="/order" className="text-dark">
                      <p className="lead text-center">My Orders</p>
                    </Link>
                  </div>
                  <div className="card-header">
                  <Link to="/orderhistory" className="text-dark">
                    <p className="lead text-center">Order History</p>
                    </Link>
                  </div>
                  <div className="card-header" style={this.cardheader}>
                    <Link to="/payment" className="text-dark">
                      <p className="lead text-center">Payment</p>
                    </Link>
                  </div>
                  <div className="card-body" />
                </div>
              </div>
              <div className="col-9">
                <div className="card">
                  <div className="card-header d-flex justify-content-between">
                    <h3 className="text-secondary">Payment</h3>
                    <button
                      className="btn btn-transparent text-dark"
                      onClick={this.howToPay}
                    >
                      {" "}
                      <i class="far fa-question-circle" /> How to Pay
                    </button>
                  </div>
                  <div className="card-body">
                    <div className="d-flex justify-content-between">
                      <p className="lead">Choose Bank : </p>
                      <select
                        className="form-control"
                        ref={input => {
                          this.idbank = input;
                        }}
                      >
                        <option disabled selected>
                          List of Bank's Name
                        </option>
                        {this.renderBank()}
                      </select>
                    </div>
                    <div className="d-flex justify-content-between">
                      <p className="lead">Input Your Order Code : </p>
                      <input
                        className="form-control"
                        ref={input => {
                          this.orderCode = input;
                        }}
                        type="text"
                      />
                    </div>
                    <div className="d-flex">
                      <p className="lead mr-2">Upload Your Payment Slip</p>
                    </div>
                    <div className="d-flex flex-column">
                      <img
                        src={this.state.image}
                        style={{
                          width: "200px",
                          height: "250px"
                        }}
                        className="img-thumbnail"
                      />
                      <div className="custom-file" style={{ width: "200px" }}>
                        <input
                          type="file"
                          id="myfile"
                          ref={input => (this.gambar = input)}
                          className="custom-file-input"
                          onChange={this.handleChange}
                        />
                        <label className="custom-file-label" for="myfile">
                          choose image
                        </label>
                      </div>
                    </div>
                    <div className="text-right mt-3">
                      <button className="btn btn-outline-dark btn-block" onClick={this.payOrder}>
                        <i class="fas fa-money-check-alt" /> PAY
                      </button>
                    </div>
                  </div>
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

export default connect(mapStateToProps)(Payment);
