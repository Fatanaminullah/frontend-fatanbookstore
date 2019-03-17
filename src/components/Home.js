import React, { Component } from 'react'
import axios from 'axios'

import ProductItems from './ProductItems';

class Home extends Component {
    state = {
        products: [],
        search:[]
    }

    componentDidMount() {
        this.getProduct()
    }

    getProduct = () => {
        axios.get('http://localhost:1996/product')
            .then(res => {
                this.setState({ products: res.data })
            })
    }

    searchProduct = () => {
        const search = this.inputSearch.value
        console.log(search);
        this.setState({
            products: this.state.products.filter(product =>{
                if(search !== ''){
                    return (
                        product.name.toLowerCase().includes(search) || product.desc.toLowerCase().includes(search)       
                        )
                }else{  
                    return this.getProduct()
                }
               
            })
        })
    }
    filterPrice = () => {
        const priceMin = this.minPrice.value
        const priceMax = this.maxPrice.value
        console.log(priceMin);
        this.setState({
            products: this.state.products.filter(product =>{
                if(priceMin !== '' && priceMax !== ''){
                    console.log(product.price);
                    return( product.price >= parseInt(priceMin) && product.price <= parseInt(priceMax))
                }else{
                    return this.getProduct()
                }
            })
        })

    }

    renderList = () => {
        return this.state.products.map(items => {
            return (
                <ProductItems item={items} />
            )
        })
    }

    render() {
        console.log(this.state.products);
        return (
            <div className="container">
                <div className="row">
                    <div className="col-sm-4 col-lg-2">
                        <h4 className="display-4 text-center">Filter</h4>
                        <div className="card p-1">
                            <div className="card-header text-center">
                                Search by Product
                    </div>
                            <div className="card-body">
                                <input ref={input => this.inputSearch = input} className="form-control my-2" placeholder="type here . ." onKeyUp={this.searchProduct}></input>
                                {/* <button className="btn btn-secondary btn-block my-2" onClick={this.searchProduct}>Search a Product!</button> */}
                            </div>
                        </div>
                        <div className="card p-1">
                            <div className="card-header">
                                Filter by Price
                    </div>
                            <div className="card-body">
                                <input ref={input => this.minPrice = input} className="form-control" placeholder="Minimum" onKeyUp={this.filterPrice}></input>
                                <h5 className="text-center">~</h5>
                                <input ref={input => this.maxPrice = input} className="form-control" placeholder="Maximum" onKeyUp={this.filterPrice}></input>
                                {/* <button className="btn btn-secondary btn-block my-3">Search a Product!</button> */}
                            </div>

                        </div>

                    </div>
                    <div className="row col-sm-8 col-lg-10">
                        {this.renderList()}
                    </div>
                </div>
            </div>
        )
    }
}

export default Home