import React, { Component } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'

class ShoppingCart extends Component {
    state = {
        cartItem: []
    }
    componentDidMount() {
        this.getProduct()
    }

    getProduct = () => {
        axios.get('http://localhost:1996/shoppingcart')
            .then(res => {
                this.setState({ cartItem: res.data })
            })
    }
    deleteCart = (id) => {
        axios.delete(`http://localhost:1996/shoppingcart/${id}`)
            .then(res => {
                this.getProduct()
            })
    }
    renderList = () => {
        const { username } = this.props.user
        return this.state.cartItem.map(product => {
            console.log(product.username);
            if (username === product.username) {
                return (
                    <div className="card m-2 col-12" key={product.id}>
                        <div className="card-header">
                            <p className="my-auto">{product.name}</p>
                        </div>
                        <div className="card-body">
                        <div className="row">
                        <div className="col-6">
                            <img className="img-detail-cart" src={product.pict} alt={product.name}/>
                        </div>
                        <div className="col-6">
                            <p className="card-text">{product.desc}</p>
                            <p className="card-text">Price : Rp.{product.price}</p>
                            <p className="card-text">Quantity: {product.qty}</p>
                        </div>
                        </div>
                        <div className="row">
                        <button className="btn btn-outline-secondary btn-circle ml-auto" onClick={ () => {this.deleteCart(product.id)}}>&times;</button>

                        </div>
                        </div>
                    </div>
                )

            }
        })

    }
    render() {
        return (
            <div className="container">
            <div className="row">
            <h1 className="mx-auto display-4">Your Shopping Cart</h1>
            </div>
            <div className="row">
            <div className="col-10">
            {this.renderList()}    
            </div>
            <div className="col-2">
            <div className="card m-2 fixed">
            <div className="card-header">
            Tagihan
            </div>
            <div className="card-body">
            <p className="card-text">Total</p>
            <p className="card-text">Pengiriman</p>
            <p className="card-text">Jumlah Total</p>

            </div>

            </div>
            </div>
            </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return { user: state.auth }

}

export default connect(mapStateToProps)(ShoppingCart)