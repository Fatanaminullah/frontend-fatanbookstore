import React, { Component } from 'react'
import axios from 'axios';
import {addToCart} from '../../actions'
import cookies from "universal-cookie";
import {connect} from 'react-redux'

const cookie = new cookies();


class DetailProduct extends Component {
    state = {
        products : [],
        genre : []
    }

    componentDidMount() {
        const idproduct = parseInt(this.props.match.params.idproduct)
        
        axios.get(`http://localhost:2000/product/genre/${idproduct}`)
        .then(res => {
            this.setState({products: res.data.product, genre: res.data.result2})
        })
    }

    render() {
        const {products} = this.state
        
        return (
          <div className="container">
            <div className="card">
              <div className="card-header bg-warning">
                <p className="lead text-center">Book's Detail</p>
              </div>
              <div className="card-body">
                <div className="row">
                  <div className="col-md-8 col-sm-12">
                    <ul className="list-group mt-3">
                      <li className="list-group-item pl-3">{`Title: ${
                        products.product_name
                      }`}</li>
                      <li className="list-group-item pl-3">{`Author: ${
                        products.author_name
                      }`}</li>
                      <li className="list-group-item pl-3">{`Publisher: ${
                        products.publisher_name
                      }`}</li>
                      <li className="list-group-item pl-3">{`Page: ${
                        products.page
                      }`}</li>
                      <li className="list-group-item pl-3">{`Price: Rp ${
                        products.price
                      }`}</li>
                      <li className="list-group-item pl-3">{`Genre: ${this.state.genre.map(item => {return item.name})}`}
                      </li>
                      <li className="list-group-item pl-3">{`Synopsis: ${
                        products.synopsis
                      }`}</li>
                    </ul>
                  </div>
                  <div className="col-md-4 col-sm-12">
                    <img
                      src={products.image}
                      alt={products.product_name}
                      key={new Date()}
                      className="card-img-top img-thumbnail"
                    />
                   <button
                      className="btn btn-outline-secondary btn-block"
                      onClick={() => {
                        this.props.addToCart(
                          products.id,
                          cookie.get("idLogin")
                        );
                      }}
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
    }
}



export default connect(null,{addToCart})(DetailProduct);