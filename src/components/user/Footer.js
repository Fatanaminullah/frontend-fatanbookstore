import React, { Component } from "react";

import image from '../../img/logo_fobs.jpg'

import '../footer.css'

export default class Footer extends Component {
    render(){
        const d = new Date()
        return(
            <footer className="footer-bs mt-4">
        <div className="row">
        	<div className="col-md-3 footer-brand animated fadeInLeft">
            	<img className="img-thumbnail rounded rounded-circle logo" src={image} />
                <p>Suspendisse hendrerit tellus laoreet luctus pharetra. Aliquam porttitor vitae orci nec ultricies. Curabitur vehicula, libero eget faucibus faucibus, purus erat eleifend enim, porta pellentesque ex mi ut sem.</p>
                <p>© {d.getFullYear()} All rights reserved</p>
            </div>
        	<div className="col-md-4 footer-nav animated fadeInUp">
            	<h4>Menu —</h4>
                <div className="row">

            	<div className="col-md-6">
                    <ul className="pages">
                        <li><a href="#">Sci-fi</a></li>
                        <li><a href="#">Fantasy</a></li>
                        <li><a href="#">Horror</a></li>
                        <li><a href="#">Mystery</a></li>
                        <li><a href="#">Romance</a></li>
                        <li><a href="#">Adventure</a></li>
                    </ul>
                </div>
            	<div className="col-md-6">
                    <ul className="pages">
                    <li><a href="#">Biography</a></li>
                        <li><a href="#">Comedy</a></li>
                        <li><a href="#">Comics</a></li>
                        <li><a href="#">Religius</a></li>
                        <li><a href="#">Kids</a></li>
                        <li><a href="#">Fiction</a></li>
                    </ul>
                </div>
                </div>
            </div>
        	<div className="col-md-2 footer-social animated fadeInDown">
            	<h4>Follow Us</h4>
            	<ul>
                	<li><i class="fab fa-facebook"></i> <a href="https://www.facebook.com/yudhantidl/">Facebook</a></li>
                	<li><i class="fab fa-instagram"></i> <a href="https://www.instagram.com/fatanonlinebookstore/">Instagram</a></li>
                	<li><i class="fab fa-whatsapp"></i> <a href="https://api.whatsapp.com/send?phone=628158141434&text=Halo,%20saya%20mau%20pesan%20buku">Whatsapp</a></li>
                </ul>
            </div>
        	<div className="col-md-3 footer-ns animated fadeInRight">
            	<h4>Criticts and Suggestion</h4>
                <p>Please let us now if you have Critics and Suggestion for our services!</p>
                <p>
                    <div className="input-group">
                      <input type="textarea" className="form-control" placeholder="Write here..." />
                      <span className="input-group-btn">
                        <button className="btn btn-outline-light"> Send </button>
                      </span>
                    </div>
                 </p>
            </div>
        </div>
    </footer>
        )
    }

}