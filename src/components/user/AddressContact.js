import React, { Component } from "react";
import {Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import axios from "axios";
import cookies from "universal-cookie";
import {Link} from 'react-router-dom'
import image from '../../img/avatar2.jpg'


const cookie = new cookies();




class AddressContact extends Component {
  cardheader = {
    backgroundColor: "#d3d3d3"
  }
  state = {
    edit: true,
    data: undefined ,
    kodepos:[],
    provinsi: [],
    kabupaten: [],
    kecamatan: [],
    kelurahan: [],
    filterKodepos: [],

  };
  getKodepos = async () => {
    try {
      const res = await axios.get(`http://localhost:2000/kodepos`);
      this.setState({
        kodepos: res.data
      });
      
    } catch (e) {
      console.log(e);
    }
  };
  getProvinsi = async () => {
    try {
      const res = await axios.get(`http://localhost:2000/province`);
      this.setState({
        provinsi: res.data
      });
      
    } catch (e) {
      console.log(e);
    }
  };
  selectKodepos = () => {
    return this.state.filterKodepos.map(item => {
      if(item.kodepos === this.state.data[0].kodepos){
        
        return(
          <option key={item.id} value={item.id} selected>
          {item.kodepos}
        </option>
        )
      }
      return (
        <option key={item.id} value={item.id}>
          {item.kodepos}
        </option>
      );
    });
  };
  selectProvinsi = () => {
    return this.state.provinsi.map(item => {
      return (
        <option key={item.provinsi} value={item.provinsi}>
          {item.provinsi}
        </option>
      );
    });
  };
  selectKabupaten = () => {
    return this.state.kabupaten.map(item => {
      return (
        <option key={item.kabupaten} value={item.kabupaten}>
          {item.kabupaten}
        </option>
      );
    });
  };
  selectKecamatan = () => {
    return this.state.kecamatan.map(item => {
      return (
        <option key={item.kecamatan} value={item.kecamatan}>
          {item.kecamatan}
        </option>
      );
    });
  };
  selectKelurahan = () => {
    return this.state.kelurahan.map(item => {
      return (
        <option key={item.kelurahan} value={item.kelurahan}>
          {item.kelurahan}
        </option>
      );
    });
  };
  filterKodepos = async () => {
    const kelurahan = this.kelurahan.value;
    
    try {
      const res = await axios.get(`http://localhost:2000/kodepos/${kelurahan}`);
      this.setState({
        filterKodepos: res.data
      });
      
    } catch (e) {
      console.log(e);
    }
  };
  filterKabupaten = async () => {
    const provinsi = this.provinsi.value;

    try {
      const res = await axios.get(`http://localhost:2000/kabupaten/${provinsi}`);
      this.setState({
        kabupaten: res.data
      });
      
    } catch (e) {
      console.log(e);
    }
  };
  filterKecamatan = async () => {
    const kabupaten = this.kabupaten.value;

    try {
      const res = await axios.get(`http://localhost:2000/kecamatan/${kabupaten}`);
      this.setState({
        kecamatan: res.data
      });
      
    } catch (e) {
      console.log(e);
    }
  };
  filterKelurahan = async () => {
    const kecamatan = this.kecamatan.value;
    
    
    try {
      const res = await axios.get(`http://localhost:2000/kelurahan/${kecamatan}`);
      console.log(res.data);
      this.setState({
        kelurahan: res.data
      });
      
    } catch (e) {
      console.log(e);
    }
  };
  saveEdit = async id => {
    const kodepos = this.kodepos.value;
    const address = this.addressInput.value;
    const phone_number = this.notelp.value;
    await this.onEdit(
      id,kodepos,address,phone_number
    );
    await this.getAddress(id);
    this.setState({ edit: !this.state.edit });
  };

  onEdit = async (id,kodepos,address,phone_number) => {
      try{
        const res = await axios.patch(`http://localhost:2000/users/${id}`, {
          kodepos,address,phone_number
        });
        console.log(res.data);
        
      } catch (e) {
        console.log(e);
      }
  };

  
  componentDidMount() {
    const userid = cookie.get("idLogin");
    this.getAddress(userid);
    this.getKodepos();
    this.getProvinsi()
    
  }
  getAddress = async userid => {
    try {
      const res = await axios.get(
        `http://localhost:2000/user/info/${userid}`
      );

      this.setState({
        data: res.data
      });
      
    } catch (e) {
      console.log(e);
    }
  };
  
  address = () => {
    const {address,kecamatan,kelurahan,kabupaten,provinsi,kodepos,phone_number} = this.state.data[0];
    const userid = cookie.get("idLogin");

    if (this.state.edit) {
      return (
          <div className="card-body">
            <li className="list-group-item pl-1"><p className="font-weight-bold">Address : </p><p className="lead ">{address}</p></li>
            <li className="list-group-item pl-1"><p className="font-weight-bold">Kodepos : </p><p className="lead ">{kodepos}</p></li>
            <li className="list-group-item pl-1"><p className="font-weight-bold">Provinsi : </p><p className="lead ">{provinsi}</p></li>
            <li className="list-group-item pl-1"><p className="font-weight-bold">Kabupaten/Kota : </p><p className="lead ">{kabupaten}</p></li>
            <li className="list-group-item pl-1"><p className="font-weight-bold">Kecamatan : </p><p className="lead ">{kecamatan}</p></li>
            <li className="list-group-item pl-1"><p className="font-weight-bold">Kelurahan : </p><p className="lead ">{kelurahan}</p></li>
            <li className="list-group-item pl-1"><p className="font-weight-bold">Phone Number : </p><p className="lead ">{phone_number}</p></li>
          </div>
      );
    }
    return (
      <div>
        <li className="list-group-item pl-0">
          <textarea
            type="text"
            className="form-control"
            ref={input => {
              this.addressInput = input;
            }}
            defaultValue={address}
          />
        </li>
        <li className="list-group-item pl-0">
          <div className="input-group search-box">
            <input
              type="text"
              ref={input => (this.searchKodepos = input)}
              className="form-control"
              placeholder="Search Postal Code Here..."
              onKeyUp={this.filterKodepos}
            />
            <span className="input-group-addon">
              <i className="fas fa-search" />
            </span>
          </div>
          <select
            type="text"
            className="form-control"
            ref={input => {
              this.kodepos = input;
            }}
            defaultChecked={kodepos}
          >
            {this.selectKodepos()}
          </select>
        </li>
        <li className="list-group-item pl-0">
          <select
            type="text"
            className="form-control"
            ref={input => {
              this.provinsi = input;
            }}
            defaultValue={provinsi}
            onClick={this.filterKabupaten}
          >
            {this.selectProvinsi()}
          </select>
        </li>
        <li className="list-group-item pl-0">
          <select
            type="text"
            className="form-control"
            ref={input => {
              this.kabupaten = input;
            }}
            defaultValue={kabupaten}
            onClick={this.filterKecamatan}
          >
            {this.selectKabupaten()}
          </select>
        </li>
        <li className="list-group-item pl-0">
          <select
            type="text"
            className="form-control"
            ref={input => {
              this.kecamatan = input;
            }}
            defaultValue={kecamatan}
            onClick={this.filterKelurahan}
          >
            {this.selectKecamatan()}
          </select>
        </li>
        <li className="list-group-item pl-0">
          <select
            type="text"
            className="form-control"
            ref={input => {
              this.kelurahan = input;
            }}
            defaultValue={kelurahan}
            onClick={this.filterKodepos}
          >
            {this.selectKelurahan()}
          </select>
        </li>
        <li className="list-group-item pl-0">
          <input
            type="text"
            className="form-control"
            ref={input => {
              this.notelp = input;
            }}
            defaultValue={phone_number}
          />
        </li>
        <li className="list-group-item px-0">
          <div className="d-flex justify-content-center">
            <button
              onClick={() => {
                this.saveEdit(userid);
              }}
              className="btn btn-outline-primary"
            >
              save
            </button>
          </div>
        </li>
        <li className="list-group-item px-0">
          <div className="d-flex justify-content-center">
            <button
              onClick={() => {
                this.setState({ edit: !this.state.edit });
              }}
              className="btn btn-outline-danger"
            >
              cancel
            </button>
          </div>
        </li>
      </div>
    );
  };

  render() {
    if (cookie.get("stillLogin")) {
        if (this.state.data !== undefined) {
        return (
          <div className="container">
            <div className="row">
              <div className="col-3">
                <div className="card p-0">
                  <h3 className="text-center card-title p-3">
                    Your Account
                  </h3>
                  <div className="card-header">
                    <Link to="/profile" className="text-dark">
                      <p className="lead text-center">Profile</p>
                    </Link>
                  </div>
                  <div className="card-header" style={this.cardheader}>
                    <Link to="/addresscontact" className="text-dark">
                      <p className="lead text-center">
                        Address & Contact Info
                      </p>
                    </Link>
                  </div>
                  <div className="card-header">
                  <Link to="/order" className="text-dark">
                    <p className="lead text-center">My Orders</p>
                    </Link>
                  </div>
                  <div className="card-header">
                    <p className="lead text-center">Order History</p>
                  </div>
                  <Link to="/payment" className="text-dark">
                  <div className="card-header">
                    <p className="lead text-center">
                      Payment 
                    </p>
                  </div>
                  </Link>
                  <div className="card-body" />
                </div>
              </div>
              <div className="col-9">
                <div className="card">
                  <ul className="list-group list-group-flush">
                    <div className="card-header">
                      <div className="d-flex justify-content-between">
                      <h3>Address & Contact Info</h3>
                      <button
                        onClick={() => {
                          this.setState({ edit: !this.state.edit });
                        }}
                        className="btn btn-outline-warning"
                      >
                        Edit
                      </button>
                      </div>
                    </div>
                    {this.address()}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        );
    } else {
        return <h1>Loading</h1>;
      }
    } else {
      return <Redirect to="/login" />;
    }
  }
}

const mapStateToProps = state => {
  return { user: state.auth };
};

export default connect(
  mapStateToProps
)(AddressContact);
