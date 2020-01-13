import React,{Component} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
//import {Bootstrap, Grid, Row, Col} from 'react-bootstrap';
//import { Navbar, Nav, NavItem, NavDropdown, Glyphicon } from "react-bootstrap";
//import 'bootstrap/dist/css/bootstrap-theme.css';
import './css/style.css';

const footerStyle = {
    color: "white",
    backgroundColor: "black"
  };

class Footer extends Component{
    render(){
        return(
            <div id="footer" className="fixed-bottom" style={footerStyle}>
                <div className="container">
                <p className="muted credit ">Copyrights Reserved
                </p>
                </div>
            </div>
        )
    }
}

export default Footer;