import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios';
import { connect } from 'react-redux';
import cookies from "universal-cookie";

const cookie = new cookies();


class ProductItems extends Component {
    addToCart = () =>{
        const {item} = this.props
        const {username} = this.props.user
        axios.get("http://localhost:1996/shoppingcart", {
            params : {
                idproduct:item.id
            }
        }).then(res => {
            console.log(res.data);  
            if(res.data.length === 0){
                axios.post("http://localhost:1996/shoppingcart", {
                    idproduct: item.id,
                    username: username,
                    name: item.name,
                    desc: item.desc,
                    price: item.price,
                    pict: item.pict,
                    qty: parseInt(this.qty.value)
                }).then(res => {
                    console.log("success");
                })     
            }else{
                axios.put("http://localhost:1996/shoppingcart/" +res.data[0].id,{
                    idproduct: item.id,
                    username: username,
                    name: item.name,
                    desc: item.desc,
                    price: item.price,
                    pict: item.pict,
                    qty : res.data[0].qty + parseInt(this.qty.value)
                }).then(res =>{
                    console.log("succes put");
                    
                })
                
            }
        })
    }

    render () {
        const {item} = this.props
        return (
            <div className="card col-sm-5 col-lg-3 m-1" style={{height:'580px'}}>
                  <Link to={`/detailproduct/${item.product_id}`}>
                    <img
                      className="card-img-top"
                      src={item.image}
                      alt={`image` + item.id}
                      style={{height:'280px'}}
                    />
                    <div className="card-body" style={{height:'180px'}}>
                      <p className="card-title font-weight-bold">
                        {item.product_name}
                      </p>
                      <p className="card-text text-secondary">
                        {item.author_name}
                      </p>
                      <p className="card-text font-weight-bold text-danger">
                        {`Rp. ` + item.price.toLocaleString()}
                      </p>
                    </div>
                  </Link>
                  <div className="card-footer">
                    <button
                      className="btn btn-outline-secondary btn-block"
                      onClick={() => {
                        this.props.addToCart(
                          item.product_id,
                          cookie.get("idLogin")
                        );
                      }}
                    >
                      Add to Cart
                    </button>
                    <button className="btn btn-outline-dark btn-block">
                      Add to Wishlist
                    </button>
                  </div>
                </div>
        )
    }
}
const mapStateToProps = state => {
    return { user: state.auth }
}

export default connect(mapStateToProps)(ProductItems)