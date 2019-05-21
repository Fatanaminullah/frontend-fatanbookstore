import React, { Component } from "react";
import axios from "axios";

import ProductItems from "./ProductItems";

class Home extends Component {
    state = {
        products: [],
        productSearch: [],
        
    };

    componentDidMount() {
        this.getProduct();
    }

    getProduct = () => {
        axios.get("http://localhost:2000/products").then(res => {
            this.setState({ products: res.data, productSearch: res.data });
        });
    };


    renderList = () => {
        return this.state.productSearch.map(items => {
            return <ProductItems item={items} />;
        });
    };
    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-sm-4 col-lg-2">
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
                            <div className="card-header">Category</div>
                            <div className="card-body">
                                <p className="lead"><input type="checkbox" value="baju"></input> Fantasy</p>
                                <p className="lead"><input type="checkbox" value="celana"></input> Drama</p>
                                <p className="lead"><input type="checkbox" value="jaket"></input> Biography</p>
                                <p className="lead"><input type="checkbox" value="sepatu"></input> Comic</p>
                                <p className="lead"><input type="checkbox" value="tas"></input> Novel</p>
                                <p className="lead"><input type="checkbox" value="topi"></input> Kids</p>
                                <p className="lead"><input type="checkbox" value="topi"></input> Romance</p>
                            </div>


                        </div>
                    </div>
                    <div className="row col-sm-8 col-lg-10">{this.renderList()}</div>
                </div>
            </div>
        );
    }
}

export default Home;
