import React, { Component } from "react";
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import axios from "../../config/axios";
import cookies from "universal-cookie";
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import newArrival from '../../img/newarrival.jpg'
import recommended from '../../img/recommend.jpg'
import fantasy from '../../img/fantasybook.jpg'
import Swal from 'sweetalert2'

import {addToCart} from '../../actions'
import "../slick.css";

const cookie = new cookies();

class Home extends Component {
  state = {
    products: [],
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
    this.getProvince();
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

  getProvince = () => {
    axios.get(`${'https://cors-anywhere.herokuapp.com/'}https://starter.rajaongkir.com/api/province`,{
      headers:{
        'key':'3ff51db00cb996364b49206f71d895a3',
        
      },
      crossDomain: true
    }).then(res => {
      console.log(res);
      
    })
  }
  listCategory = () => {
    return this.state.genre.map(item => {
      return(
<Link className="p-2 list-category" to="/">
  <span className="align-content-center text-dark">{item.name}</span>
</Link>
      )
    })
  }

  renderListCategory = () => {
    if(this.state.list){
        return(
  <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="navbar-nav d-flex flex-wrap">
              {this.listCategory()}
            </div>
          </nav>
        )
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
      slidesToScroll: 1
};
    const settingPromo = {
      autoplay:true,
      dots: true,
      infinite:true,
      slidesToShow:1,
      slidesToScroll:1
    }
if(cookie.get('idLogin')){
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
          src={recommended}
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
  
}
    return (
      <div className="container">
       <div className="row promo py-5">
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
                      Detail Product
                    </button>
                  </Link>
                </div>
              </div>
            );
  })}
          </Slider>
          <img
            src={newArrival}
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
            src={newArrival}
            alt="buku"
            className="home-category-image img-thumbnail"
          />
        </div>
  
        </div>
      </div>
    );
  }
}



export default connect(null,{addToCart})(Home);
