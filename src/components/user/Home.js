import React, { Component } from "react";
import {Link,Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import axios from "../../config/axios";
import cookies from "universal-cookie";
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import newArrival from '../../img/newarrival.jpg'
import recommended from '../../img/recommend.jpg'
import fantasy from '../../img/fantasybook.jpg'
import comicbook from '../../img/comicbook.jpg'
import swal from 'sweetalert'

import {addToCart} from '../../actions'
import "../slick.css";

const cookie = new cookies();

class Home extends Component {
  state = {
    products: undefined,
    comics:[],
    promo: [],
    images: [],
    new: [],
    thriller: [],
    genre:[],
    list:false
  };

  componentDidMount() {
    this.getProductRecommended();
    this.getComicsRecommended();
    this.getThrillerRecommended();
    this.getProductNew();
    this.getPromo();
    this.getGenre();
  }
  getGenre = async () => {
    await axios
      .get(`/genre`)
      .then(res => {
        this.setState({ genre: res.data });
      });
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

  listCategory = () => {
    return this.state.genre.map(item => {
      return(
<Link className="p-2 list-category" to={`/product/${item.name}`}>
  <span className="align-content-center text-dark lead">{item.name}</span>
</Link>
      )
    })
  }

  renderListCategory = () => {
    if(this.state.list){
        return (
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container">
              <div className="navbar-nav d-flex flex-wrap">
                {this.listCategory()}
              </div>
            </div>
          </nav>
        );
    }else{
      return null
    }
  }

  showCategory = () => {
    this.setState({list:!this.state.list})
  }

  render() {
    const settings = {
      autoplay: true,
      infinite: true,
      slidesToShow: 4,
      slidesToScroll: 1,
      responsive:[
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 1,
            infinite: true,
            dots: true
          }
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
            infinite: true
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            infinite: true
          }
        }
      ]
};
    const settingPromo = {
      autoplay:true,
      dots: true,
      infinite:true,
      slidesToShow:1,
      slidesToScroll:1
    }
if(cookie.get('idLogin')){
  if(this.state.products !== undefined){

    if(this.state.products.length !== 0){
      return (
        <div>
    <nav className="navbar navbar-expand-lg" style={{backgroundColor:'#f5f5f5'}}>
      <div className="container">
              <div className="navbar-nav row w-100">
                  <div className="col">
                    <li className="nav-item">
                <Link className="ml-5" to="/products">
                  <span>
                  <i class="far fa-list-alt" />
                  </span>
                  <span className="ml-1 align-content-center text-dark">
                    All Product
                  </span>
                </Link>
                    </li>
                  </div>
                  <div className="col-auto">
                    <li className="nav-item">
                <button className="mr-5 btn btn-transparent" onClick={this.showCategory}>
                  <span className="mr-1 align-content-center text-dark ">
                    Show Category
                  </span>
                  <span className="align-content-center">
                  <i class="fas fa-caret-down" />
                  </span>
                </button>
                    </li>
                  </div>
                </div>
              </div>
            </nav>
            {this.renderListCategory()}
        <div className="container">
          <div className="row promo py-5">
            <p className="text-center text-white lead font-weight-bold mx-auto" style={{background:'grey',fontSize:'35px',width:'80%'}}> Free delivery to where ever you are!</p>

            <Slider {...settingPromo}>
              {this.state.images.map((item,index) => {
          return (
              <img className="d-block w-100" src={item} alt={`image` + index} />
          );
        })}
            </Slider>
            
          </div>
          <div className="row text-center py-5">
            <div className="text-center mx-auto pb-2" style={{ width: "80%" }}>
              <h3
                style={{
                  fontFamily: "Verdana, Geneva, sans-serif",
                  textAlign: "center"
                }}
              >
                Just For You, {cookie.get('stillLogin')} !
              </h3>
            </div>
            <div className="d-flex w-100 left">
              <img
                src={recommended}
                alt="buku"
                className="home-category-image img-thumbnail"
              />
              <Slider {...settings}>
                {this.state.products.map((item, index) => {
                  return (
                    <div className="card a">
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
                  );
                })}
              </Slider>
            </div>
          </div>
          <div className="row text-center py-5">
            <div className="text-center mx-auto pb-2" style={{ width: "80%" }}>
              <h3
                style={{
                  fontFamily: "Verdana, Geneva, sans-serif",
                  textAlign: "center"
                }}
              >
                Feels bored to read novel? here our best comics!
              </h3>
            </div>
            <div className="d-flex w-100 right">
    
            <Slider {...settings}>
              {this.state.comics.map((item, index) => {
                return (
                  <div className="card">
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
                      <button
                        className="btn btn-outline-secondary btn-block"
                        onClick={() => {
                          this.props.addToCart(item.id, cookie.get("idLogin"));
                        }}
                      >
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
            <img
              src={comicbook}
              alt="buku"
              className="home-category-image img-thumbnail"
            />
            </div>
    
          </div>
          <div className="row text-center py-5">
            <div className="text-center mx-auto pb-2" style={{ width: "80%" }}>
              <h3
                style={{
                  fontFamily: "Verdana, Geneva, sans-serif",
                  textAlign: "center"
                }}
              >
                Need Something Fresh?
              </h3>
            </div>
            <div className="d-flex w-100 left">
              <img
                src={newArrival}
                alt="buku"
                className="home-category-image img-thumbnail"
              />
              <Slider {...settings}>
                {this.state.new.map((item, index) => {
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
                        <button
                          className="btn btn-outline-secondary btn-block"
                          onClick={() => {
                            this.props.addToCart(item.id, cookie.get("idLogin"));
                          }}
                        >
                          Add to Cart
                        </button>
                        <button className="btn btn-outline-dark btn-block">
                          Detail Product
                        </button>
                      </div>
                    </div>
                  );
                })}
              </Slider>
            </div>
          </div>
          <div className="row text-center py-5">
            <div className="text-center mx-auto pb-2" style={{ width: "80%" }}>
              <h3
                style={{
                  fontFamily: "Verdana, Geneva, sans-serif",
                  textAlign: "center"
                }}
              >
                You May Like It
              </h3>
            </div>
            <div className="d-flex w-100 right">
              <Slider {...settings}>
                {this.state.thriller.map((item, index) => {
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
                        <button
                          className="btn btn-outline-secondary btn-block"
                          onClick={() => {
                            this.props.addToCart(item.id, cookie.get("idLogin"));
                          }}
                        >
                          Add to Cart
                        </button>
                        <button className="btn btn-outline-dark btn-block">
                          Detail Product
                        </button>
                      </div>
                    </div>
                  );
                })}
              </Slider>
              <img
                src={fantasy}
                alt="buku"
                className="home-category-image img-thumbnail"
              />
            </div>
          </div>
        </div>
        </div>
      );
    }else{
      swal({
        title:'Choose your genre first!',
        text:'You havent choose your genre, please choose it first to get recommended products!',
        icon:'warning'
      })
      return <Redirect to="/profile" />
    }
  }else{
    return <h1>Loading</h1>
  }
  
}
    return (
      <div>
      <nav className="navbar navbar-expand-lg" style={{backgroundColor:'#f5f5f5'}}>
  <div className="container">
          <div className="navbar-nav row w-100 m-1">
              <div className="col-md-6 col-sm-12 text-center text-md-left">
                <li className="nav-item">
            <Link className="mr-md-5" to="/products">
              <span>
              <i class="far fa-list-alt" />
              </span>
              <span className="ml-1 align-content-center text-dark">
                All Product
              </span>
            </Link>
                </li>
              </div>
              <div className="col-md-6 col-sm-12 text-center text-md-right">
                <li className="nav-item">
            <button className="mr-5 btn btn-transparent" onClick={this.showCategory}>
              <span className="mr-1 align-content-center text-dark ">
                Show Category
              </span>
              <span className="align-content-center">
              <i class="fas fa-caret-down" />
              </span>
            </button>
                </li>
              </div>
            </div>
          </div>
        </nav>
        {this.renderListCategory()}
      <div className="container">
       <div className="row promo py-5">
       <p className="text-center text-white lead font-weight-bold mx-auto promo-tagline"> Free delivery to where ever you are!</p>
        <Slider {...settingPromo}>
          {this.state.images.map((item,index) => {
      return (
          <img className="d-block w-100" src={item} alt={`image` + index} />
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
        <div className="d-flex w-100 left">
          <img
            src={newArrival}
            alt="buku"
            className="home-category-image img-thumbnail"
          />
          <Slider {...settings}>
            {this.state.new.map((item, index) => {
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
                    <button
                      className="btn btn-outline-secondary btn-block"
                      onClick={() => {
                        this.props.addToCart(item.id, cookie.get("idLogin"));
                      }}
                    >
                      Add to Cart
                    </button>
                    <button className="btn btn-outline-dark btn-block">
                    <Link to={`/detailproduct/${item.id}`}>
                      Detail Product
                      </Link>
                      </button>
                  </div>
                </div>
              );
            })}
          </Slider>
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
            Feels bored to read novel? here our best comics!
          </h3>
        </div>
        <div className="d-flex w-100 right">
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
                    <Link to={`/detailproduct/${item.id}`}>
                      Detail Product
                      </Link>
                    </button>
                  </Link>
                </div>
              </div>
            );
  })}
          </Slider>
          <img
            src={comicbook}
            alt="buku"
            className="home-category-image img-thumbnail"
          />
          
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
            You May Like It
          </h3>
        </div>
        <div className="d-flex w-100 left">
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
          <img
            src={fantasy}
            alt="buku"
            className="home-category-image img-thumbnail"
          />
        </div>
  
        </div>
      </div>
      </div>
    );
  }
}



export default connect(null,{addToCart})(Home);
