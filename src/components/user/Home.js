import React, { Component } from "react";
import {Link} from 'react-router-dom'
import axios from "../../config/axios";
import cookies from "universal-cookie";
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Swal from 'sweetalert2'

import "../slick.css";
import ProductItems from "./ProductItems";

const cookie = new cookies();

class Home extends Component {
  state = {
    products: [],
    comics:[],
    promo: [],
    images: [],
    new: [],
    thriller: []
  };

  componentDidMount() {
    this.getProductRecommended();
    this.getComicsRecommended();
    this.getThrillerRecommended();
    this.getProductNew();
    this.getPromo();
    
  }
  getProductRecommended = async () => {
    await axios
      .get(`/product/recommended/${cookie.get("idLogin")}`)
      .then(res => {
        this.setState({ products: res.data });
        
      });
    };
  getProductNew = async () => {
    await axios
      .get(`/products/new`)
      .then(res => {
        this.setState({ new: res.data });
        
      });
    };
  getComicsRecommended = async () => {
      await axios
        .get(`/products/Comics`)
        .then(res => {
          this.setState({ comics: res.data });
        });

  }
  getThrillerRecommended = async () => {
      await axios
        .get(`/products/Fantasy`)
        .then(res => {
          this.setState({ thriller: res.data });
        });

  }
  getPromo = async () => {
    await axios.get("/promo").then(res => {
      this.setState({
        promo: res.data.result,
        images: res.data.photo
      });
    });
  };
  
  imageCarousel = () => {
    return this.state.images.map(item => {
      return (
        <div className="carousel-item">
          <img className="d-block w-100" src={item} alt="Second slide" />
        </div>
      );
    });
  };
  indicatorCarousel = () => {
    return this.state.images.map((item, index) => {
      return (
        <div>
          <li
            data-target="#demo"
            data-slide-to={index + 1}
            className="active"
          />
        </div>
      );
    });
  };

  addToCart = async (productId,userId) => {

    try{
      const res = await axios.post(`/cart/add`,{
        user_id:userId,
        product_id:productId
      });
      Swal.fire('Success','This is item is succesfully added to your cart','success')
    } catch (e) {
      console.log("upload gagal" + e);
    }
    }


  render() {
    const settings = {
      dots: true,
      autoplay: true,
      infinite: true,
      slidesToShow: 5,
      slidesToScroll: 1
};
if(cookie.get('idLogin')){
  return (
    <div className="container">
      <div className="row py-5">
        <div
          className="card text-center mx-auto"
          style={{ width: "80%", backgroundColor: "#a9a9a9" }}
        >
          <div className="card-title">
            <p
              className="lead font-weight-bold text-light my-auto"
              style={{
                fontSize: "20px",
                fontFamily: "Verdana, Geneva, sans-serif"
              }}
            >
              GET THE BEST PROMO ONLY ON FATANBOOKSTORE!
            </p>
          </div>
        </div>
        <div
          id="demo"
          className="carousel slide mx-auto"
          data-ride="carousel"
          style={{ width: "80%" }}
        >
          <ul className="carousel-indicators">
            <li
              data-target="#demo"
              data-slide-to="0"
              className="active"
            />
            {this.indicatorCarousel()}
          </ul>
          <div className="carousel-inner">
            <div className="carousel-item active">
              <img
                className="d-block w-100"
                src="http://localhost:2000/promo/images/1559460577002image.jpg?v=1559482346965"
                alt="Los Angeles"
              />
            </div>
            {this.imageCarousel()}
          </div>
          <a
            className="carousel-control-prev"
            href="#demo"
            data-slide="prev"
          >
            <span className="carousel-control-prev-icon" />
          </a>
          <a
            className="carousel-control-next"
            href="#demo"
            data-slide="next"
          >
            <span className="carousel-control-next-icon" />
          </a>
        </div>
      </div>
      <div className="row text-center py-5">
        <div className="text-center mx-auto pb-2" style={{width:'80%'}}>
        <h3
          style={{
            fontFamily: "Verdana, Geneva, sans-serif",
            textAlign:"center"
          }}
        >
          Recommended For You
        </h3>
      </div>
        <Slider {...settings}>
        {this.state.products.map((item,index) => {
          return (
            <div className="card a" >
              <Link to={`/detailproduct/${item.product_id}`}>
              <img
                className="card-img-top"
                src={item.image}
                alt={`image` + index}
              />
              <div className="card-body">
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
                <button className="btn btn-outline-secondary btn-block" onClick={() => {this.addToCart(item.product_id,cookie.get('idLogin'))}}>
                  Add to Cart
                </button>
                  <button className="btn btn-outline-dark btn-block">
                    Add to Wishlist
                  </button>
              </div>
            </div>
          );
})}
        </Slider>
      </div>
      <div className="row text-center py-5">
        <div className="text-center mx-auto pb-2" style={{width:'80%'}}>
        <h3
          style={{
            fontFamily: "Verdana, Geneva, sans-serif",
            textAlign:"center"
          }}
        >
          Feels bored to read novel? here our best comics!
        </h3>
      </div>
        <Slider {...settings}>
        {this.state.comics.map((item,index) => {
          return (
            <div className="card a">
              <img
                className="card-img-top"
                src={item.image}
                alt={`image` + index}
              />
              <div className="card-body">
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
              <div className="card-footer">
                <button className="btn btn-outline-secondary btn-block" onClick={() => {this.addToCart(item.id,cookie.get('idLogin'))}}>
                  Add to Cart
                </button>
                  <button className="btn btn-outline-dark btn-block">
                    Add to Wishlist
                  </button>
              </div>
            </div>
          );
})}
        </Slider>

      </div>
      <div className="row text-center py-5">
        <div className="text-center mx-auto pb-2" style={{width:'80%'}}>
        <h3
          style={{
            fontFamily: "Verdana, Geneva, sans-serif",
            textAlign:"center"
          }}
        >
          New Arrival
        </h3>
      </div>
        <Slider {...settings}>
        {this.state.new.map((item,index) => {
          return(
            <div className="card a">
              <img className="card-img-top" src={item.image}  alt={`image`+index} />
              <div className="card-body">
                <p className="card-title font-weight-bold">{item.product_name}</p>
                <p className="card-text text-secondary">{item.author_name}</p>
                <p className="card-text font-weight-bold text-danger">{`Rp. `+item.price.toLocaleString()}</p>
              </div>
              <div className="card-footer">
                <button className="btn btn-outline-secondary btn-block" onClick={() => {this.addToCart(item.id,cookie.get('idLogin'))}}>Add to Cart</button>
                <button className="btn btn-outline-dark btn-block">Detail Product</button>
              </div>
            </div>
          )
})}
        </Slider>

      </div>
      <div className="row text-center py-5">
        <div className="text-center mx-auto pb-2" style={{width:'80%'}}>
        <h3
          style={{
            fontFamily: "Verdana, Geneva, sans-serif",
            textAlign:"center"
          }}
        >
          You May Like It
        </h3>
      </div>
        <Slider {...settings}>
        {this.state.thriller.map((item,index) => {
          return(
            <div className="card a">
              <img className="card-img-top" src={item.image}  alt={`image`+index} />
              <div className="card-body">
                <p className="card-title font-weight-bold">{item.product_name}</p>
                <p className="card-text text-secondary">{item.author_name}</p>
                <p className="card-text font-weight-bold text-danger">{`Rp. `+item.price.toLocaleString()}</p>
              </div>
              <div className="card-footer">
                <button className="btn btn-outline-secondary btn-block" onClick={() => {this.addToCart(item.id,cookie.get('idLogin'))}}>Add to Cart</button>
                <button className="btn btn-outline-dark btn-block">Detail Product</button>
              </div>
            </div>
          )
})}
        </Slider>

      </div>
    </div>
  );
  
}
    return (
      <div className="container">
        <div className="row py-5">
          <div
            className="card text-center mx-auto"
            style={{ width: "80%", backgroundColor: "#a9a9a9" }}
          >
            <div className="card-title">
              <p
                className="lead font-weight-bold text-light my-auto"
                style={{
                  fontSize: "20px",
                  fontFamily: "Verdana, Geneva, sans-serif"
                }}
              >
                GET THE BEST PROMO ONLY ON FATANBOOKSTORE!
              </p>
            </div>
          </div>
          <div
            id="demo"
            className="carousel slide mx-auto"
            data-ride="carousel"
            style={{ width: "80%" }}
          >
            <ul className="carousel-indicators">
              <li
                data-target="#demo"
                data-slide-to="0"
                className="active"
              />
              {this.indicatorCarousel()}
            </ul>
            <div className="carousel-inner">
              <div className="carousel-item active">
                <img
                  className="d-block w-100"
                  src="http://localhost:2000/promo/images/1559460577002image.jpg?v=1559482346965"
                  alt="Los Angeles"
                />
              </div>
              {this.imageCarousel()}
            </div>
            <a
              className="carousel-control-prev"
              href="#demo"
              data-slide="prev"
            >
              <span className="carousel-control-prev-icon" />
            </a>
            <a
              className="carousel-control-next"
              href="#demo"
              data-slide="next"
            >
              <span className="carousel-control-next-icon" />
            </a>
          </div>
        </div>
        <div className="row text-center py-5">
          <div className="text-center mx-auto pb-2" style={{width:'80%'}}>
          <h3
            style={{
              fontFamily: "Verdana, Geneva, sans-serif",
              textAlign:"center"
            }}
          >
            New Arrival
          </h3>
        </div>
          <Slider {...settings}>
          {this.state.new.map((item,index) => {
            return(
              <div className="card a">
                <img className="card-img-top" src={item.image}  alt={`image`+index} />
                <div className="card-body">
                  <p className="card-title font-weight-bold">{item.product_name}</p>
                  <p className="card-text text-secondary">{item.author_name}</p>
                  <p className="card-text font-weight-bold text-danger">{`Rp. `+item.price.toLocaleString()}</p>
                </div>
                <div className="card-footer">
                  <button className="btn btn-outline-secondary btn-block">Add to Cart</button>
                  <Link to={`/detailproduct/${item.id}`}><button className="btn btn-outline-dark btn-block">Detail Product</button></Link>
  
                </div>
              </div>
            )
  })}
          </Slider>
        </div>
        <div className="row text-center py-5">
          <div className="text-center mx-auto pb-2" style={{width:'80%'}}>
          <h3
            style={{
              fontFamily: "Verdana, Geneva, sans-serif",
              textAlign:"center"
            }}
          >
            Feels bored to read novel? here our best comics!
          </h3>
        </div>
          <Slider {...settings}>
          {this.state.comics.map((item,index) => {
            return (
              <div className="card a">
                <img
                  className="card-img-top"
                  src={item.image}
                  alt={`image` + index}
                />
                <div className="card-body">
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
                <div className="card-footer">
                  <button className="btn btn-outline-secondary btn-block">
                    Add to Cart
                  </button>
                  <Link to={`/detailproduct/${item.id}`}>
                    <button className="btn btn-outline-dark btn-block">
                      Detail Product
                    </button>
                  </Link>
                </div>
              </div>
            );
  })}
          </Slider>
  
        </div>
        
        <div className="row text-center py-5">
          <div className="text-center mx-auto pb-2" style={{width:'80%'}}>
          <h3
            style={{
              fontFamily: "Verdana, Geneva, sans-serif",
              textAlign:"center"
            }}
          >
            You May Like It
          </h3>
        </div>
          <Slider {...settings}>
          {this.state.thriller.map((item,index) => {
            
            return(
              <div className="card a">
                <img className="card-img-top" src={item.image}  alt={`image`+index} />
                <div className="card-body">
                  <p className="card-title font-weight-bold">{item.product_name}</p>
                  <p className="card-text text-secondary">{item.author_name}</p>
                  <p className="card-text font-weight-bold text-danger">{`Rp. `+item.price.toLocaleString()}</p>
                </div>
                <div className="card-footer">
                  <button className="btn btn-outline-secondary btn-block">Add to Cart</button>
                  <Link to={`/detailproduct/${item.id}`}><button className="btn btn-outline-dark btn-block">Detail Product</button></Link>
  
                </div>
              </div>
            )
  })}
          </Slider>
  
        </div>
      </div>
    );
  }
}

export default Home;
