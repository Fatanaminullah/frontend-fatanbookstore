import React, { Component } from 'react'
import {Link} from 'react-router-dom'

class ProductItems extends Component {

    render () {
        const {item} = this.props
        return (
            <div className="card col-sm-5 col-lg-3 m-3" style={{ width: "18rem" }} key={item.id}>
                <img src={item.pict} className="card-img-top mx-auto mt-3" alt={item.name} />
                <div className="card-body mx-auto">
                    <h5 className="card-title">{item.name}</h5>
                    <p className="card-text">{item.desc}</p>
                    <p className="card-text">Rp.{item.price}</p>
                    <input className="form-control" type="number" />
                    <Link to={"/detailproduct/" + item.id}><button className="btn btn-secondary btn-block btn-sm my-2">Detail</button></Link>
                    <button  className="btn btn-primary btn-block btn-sm my-2">Add to Cart</button>
                </div>
            </div>
        )
    }
}

export default ProductItems