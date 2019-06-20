import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import cookies from 'universal-cookie'

import Sidebar from "./Sidebar";
import "../style.css";

const cookie = new cookies()

class ManageBank extends Component {
  state = {
    bank: [],
    selectedBank: 0
  };

  componentDidMount() {
    this.getBank();
  }

  getBank = () => {
    axios.get("http://localhost:2000/bank").then(res => {
      this.setState({ bank: res.data, selectedAuthor: 0 });
    });
  };

  saveBank = (id) => {
      const kode_bank = this.editKodeBank.value
      const bank_name = this.editNamaBank.value
      const no_rek = this.editNoRek.value
      axios.patch(`http://localhost:2000/bank/edit/${id}`, {
          kode_bank,bank_name,no_rek
      }).then(() => {
          this.getBank()
      })
  }
  
  editBank = (id) => {
      this.setState({ selectedBank: id })
  }
 
  onAddBank = () => {
    const kode_bank = this.kode_bank.value
    const bank_name = this.nama_bank.value
    const no_rek = this.no_rek.value
    this.addBank(kode_bank,bank_name,no_rek)

  }
  
  addBank = (kode_bank,bank_name,no_rek) => {
    axios.post("http://localhost:2000/bank/add", {
      kode_bank,bank_name,no_rek
    }).then(res => {
      console.log(res);
          this.getBank()
      })
  }
 

  renderAuthor = () => {
    return this.state.bank.map(item => {
      if (item.id !== this.state.selectedBank) {
        return (
          <tr key={item.id}>
            <td>{item.kode_bank}</td>
            <td>{item.bank_name}</td>
            <td>{item.no_rek}</td>
            <td>
              <button
                className="btn btn-primary mr-2"
                onClick={() => {
                  this.editBank(item.id);
                }}
              >
                Edit
              </button>
            </td>
          </tr>
        );
      } else {
        return (
          <tr key={item.id}>
            <td>{item.id}</td>
            <td>
              <input 
                className="form-control"
                ref={input => {this.editKodeBank = input}}
                type="text"
                defaultValue={item.kode_bank}
              />
            </td>
            <td>
              <input 
                className="form-control"
                ref={input => {this.editNamaBank = input}}
                type="text"
                defaultValue={item.bank_name}
              />
            </td>
            <td>
              <input 
                className="form-control"
                ref={input => {this.editNoRek = input}}
                type="text"
                defaultValue={item.no_rek}
              />
            </td>
            <td className="d-flex flex-column">
              <button
                onClick={() => {
                  this.saveBank(item.id);
                }}
                className="btn btn-success mb-2"
              >
                Save
              </button>
              <button
                onClick={() => {
                  this.setState({ selectedBank: 0 });
                }}
                className="btn btn-danger"
              >
                Cancel
              </button>
            </td>
          </tr>
        );
      }
    });
  };
  

  render() {
    var userCookie = cookie.get("stillLogin");

    if (userCookie === undefined ) {
      return (
        <Redirect to="/admin/login" />
      ) 
    } else{
      return (
        <div id="App">
          <Sidebar pageWrapId={"page-wrap"} outerContainerId={"App"} />
          <div id="page-wrap">
            <div className="container">
                <div className="row">
                <div className="col-md-12">
              <h3 className="text-center">Bank Table</h3>
              <table className="table table-hover mb-5">
                <thead>
                  <tr>
                    <th scope="col">Kode Bank</th>
                    <th scope="col">Nama Bank</th>
                    <th scope="col">Nomor Rekening</th>
                    <th scope="col">ACTION</th>
                  </tr>
                </thead>
                <tbody>{this.renderAuthor()}</tbody>
              </table>
              <h3 className="text-center">Input Author</h3>
              <table className="table text-center">
                <thead>
                  <tr>
                  <th scope="col">ID</th>
                    <th scope="col">KODE BANK</th>
                    <th scope="col">NAMA BANK</th>
                    <th scope="col">NOMOR REKENING</th>
                    <th scope="col">ACTION</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                  <th scope="col">ID</th>
                    <th scope="col">
                      <input
                        ref={input => (this.kode_bank = input)}
                        className="form-control"
                        type="text"
                      />
                    </th>
                    <th scope="col">
                      <input
                        ref={input => (this.nama_bank = input)}
                        className="form-control"
                        type="text"
                      />
                    </th>
                    <th scope="col">
                      <input
                        ref={input => (this.no_rek = input)}
                        className="form-control"
                        type="text"
                      />
                    </th>
                    <th scope="col">
                      <button
                        className="btn btn-outline-warning"
                        onClick={this.onAddBank}
                      >
                        Add
                      </button>
                    </th>
                  </tr>
                </tbody>
              </table>
                </div>
                </div>
            </div>
          </div>
        </div>
      );
    } 
  }
}

const mapStateToProps = state => {
  return { user: state.auth };
};

export default connect(mapStateToProps)(ManageBank);
