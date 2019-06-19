import React, { Component } from "react";
import {Link} from 'react-router-dom';
import axios from "../../config/axios";


import ProductItems from "./ProductItems";

class ProductsByGenre extends Component {
    state = {
        products: [],
        productSearch: [],
        genre:[]
        
    };

    componentDidMount() {
        const genre = this.props.match.params.genre
        
        axios.get(`/products/${genre}`)
        .then(res => {
            this.setState({products: res.data, productSearch: res.data})
        })
        this.getGenre()
    }

    componentDidUpdate(prevProps) {
        console.log(this.props.match.params.genre);
        if (this.props.match.params.genre !== prevProps.match.params.genre) {
            axios.get(`/products/${this.props.match.params.genre}`)
            .then(res => {
                this.setState({products: res.data, productSearch: res.data})
            })
            this.getGenre()
        }
      }

    getGenre = async () => {
        
        await axios
          .get(`/genre`)
          .then(res => {
            this.setState({ genre: res.data });
            
          });
      }

    searchProduct = () => {
        const search = this.inputSearch.value;
        const min = parseInt(this.minPrice.value);
        const max = parseInt(this.maxPrice.value); 

        var arrSearch = this.state.products.filter(item => {
            if (isNaN(min) && isNaN(max)) {
                // search hanya dengan name , min dan max kosong
                return item.product_name.toLowerCase().includes(search);
            } else if (isNaN(min)) {
                return (
                    item.product_name.toLowerCase().includes(search.toLowerCase()) &&
                    item.price <= max
                );
            } else if (isNaN(max)) {
                return (
                    item.product_name.toLowerCase().includes(search.toLowerCase()) &&
                    item.price >= min
                );
            } else {
                return (
                    item.product_name.toLowerCase().includes(search.toLowerCase()) &&
                    item.price <= max &&
                    item.price >= min
                );
            }
        });

        this.setState({ productSearch: arrSearch });
    };
    sortProduct = () => {
        const sort = this.sorting.value
        const namaAsc = this.namaAsc.value;
        const namaDesc = this.namaDesc.value;
        const priceAsc = this.priceAsc.value;
        const priceDesc = this.priceDesc.value;
        var arrSearch = this.state.products.sort((a, b) => {
            switch (sort) {
                case namaAsc:
                    return a.product_name.toLowerCase() > b.product_name.toLowerCase()
                case namaDesc:
                    return a.product_name.toLowerCase() < b.product_name.toLowerCase()
                case priceAsc:
                    return a.price - b.price
                case priceDesc:
                    return b.price - a.price


                default:
                    break;
            }
        })
        this.setState({ productSearch: arrSearch })
        this.searchProduct()

    }
    

    renderList = () => {
        return this.state.productSearch.map(items =>{
            return <ProductItems item={items} />;
        });
    };
    renderGenre = () => {
        return this.state.genre.map(item => {
            return(
                <tr style={{fontSize:'18px',height:'40px'}} ><Link style={{color:'black'}} to={`/product/${item.name}`}> {item.name} </Link></tr>
            )
        })
    }
    render() {
        
        return (
            <div className="container">
                <div className="row mt-3">
                    <div className="col-9"></div>
                    <div className="col-3">
                        <p>
                            <select ref={input => this.sorting = input} className="form-control">
                                <option ref={input => this.namaAsc = input} value="namaAsc" className="text-center" onClick={this.sortProduct}>Name &uarr;</option>
                                <option ref={input => this.namaDesc = input} value="namaDesc" className="text-center" onClick={this.sortProduct}>Name &darr;</option>
                                <option ref={input => this.priceAsc = input} value="priceAsc" className="text-center" onClick={this.sortProduct}>Price &uarr;</option>
                                <option ref={input => this.priceDesc = input} value="priceDesc" className="text-center" onClick={this.sortProduct}>Price &darr;</option>
                                <option ref={input => this.bestSeller = input} value="sale" className="text-center" onClick={this.sortProduct}>Best Seller</option>
                            </select>
                        </p>
                    </div>

                </div>
                <div className="row">
                    <div className="col-sm-4 col-lg-3">
                        <h4 className="display-4 text-center">Filter</h4>
                        <div className="card p-1">
                            <div className="card-header text-center">Search by Product</div>
                            <div className="card-body">
                                <input
                                    ref={input => (this.inputSearch = input)}
                                    className="form-control my-2"
                                    placeholder="type here . ."
                                    onKeyUp={this.searchProduct}
                                />
                            </div>
                        </div>
                        <div className="card p-1">
                            <div className="card-header">Filter by Price</div>
                            <div className="card-body">
                                <input
                                    ref={input => (this.minPrice = input)}
                                    type="number"
                                    className="form-control"
                                    placeholder="Min"
                                    onKeyUp={this.searchProduct}
                                />
                                <h5 className="text-center">~</h5>
                                <input
                                    ref={input => (this.maxPrice = input)}
                                    type="number"
                                    className="form-control"
                                    placeholder="Max"
                                    onKeyUp={this.searchProduct}
                                />
                            </div>
                        </div>
                        <div className="card p-1">
                            <div className="card-header">Genre</div>
                            <div className="card-body">
                                <table className="table table-hover text-center" style={{width:'100%'}}>
                                    <tbody>
                                    <tr style={{fontSize:'18px',height:'40px'}} ><Link style={{color:'black'}} to={`/products`}> All </Link></tr>
                                        {this.renderGenre()}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div className="row col-sm-8 col-lg-9">{this.renderList()}</div>
                </div>
            </div>
        );
    }
}

export default ProductsByGenre;
