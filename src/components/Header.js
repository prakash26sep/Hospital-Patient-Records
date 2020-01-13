import React,{Component} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
//import {Bootstrap, Grid, Row, Col} from 'react-bootstrap';
import { Nav} from "react-bootstrap"; 
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';
//import 'bootstrap/dist/css/bootstrap-theme.css';
import './css/style.css'
import Home from './Home';
import AddUser from './AddUser';
import UpdateUser from './UpdateUser';
import DeleteUser from './DeleteUser';
import SearchUser from './SearchUser';
import AllUsers from './AllUsers';


class Header extends Component{

    constructor(){
        super();

        this.state = {
          activeTab : "tab1",
          search: "" 
        }

        this.changeSearch= this.changeSearch.bind(this);
        this.changeActive= this.changeActive.bind(this);
    }

    changeActive(e){
       this.setState({activeTab: e.target.id})
    }

    changeSearch(e){
        this.setState({
            search: document.getElementById("search").value
        }, ()=>{
            console.log("hello");
        })
     }

    

    render(){

        //let activeClass= this.state.active +"nav-item";

        return(
            <div>

                <Router>

                        <Nav className="navbar navbar-expand-sm bg-dark navbar-dark navItems">
                            <ul className="navbar-nav">

                                <li className="nav-item">
                                    <Link to='/'><div id="tab1" onClick={this.changeActive} className={(this.state.activeTab === "tab1") ? "active nav-link " : "nav-link"}>Home</div></Link>
                                </li>

                                <li className="nav-item">
                                    <Link to='/allpatients'><div id="tab2" onClick={this.changeActive} className={(this.state.activeTab === "tab2") ? "active nav-link" : "nav-link"}>Show all Patients (With BMI)</div></Link>
                                </li>

                                <li className="nav-item">
                                    <Link to='/addpatient'><div id="tab3" onClick={this.changeActive} className={(this.state.activeTab === "tab3") ? "active nav-link" : "nav-link"}>Add a Patient</div></Link>
                                </li>

                                <li className="nav-item">
                                    <Link to='/updatepatient'><div id="tab4" onClick={this.changeActive} className={(this.state.activeTab === "tab4") ? "active nav-link" : "nav-link"}>Update Patient details</div></Link>
                                </li>
                                
                                <li className="nav-item">
                                    <Link to='/deletepatient'><div id="tab5" onClick={this.changeActive} className={(this.state.activeTab === "tab5") ? "active nav-link" : "nav-link"}>Delete a Patient</div></Link>
                                </li>

                            </ul>
                            
                                <div className="searchBox">

                                    <form className="form-inline float-lg-right" action="/">
                                        <div>
                                            <input className="form-control mr-sm-2" id="search" type="text" placeholder="Patient Name" />
                                            <Link to='/searchpatient'>
                                                <button  className="btn btn-success" onClick={(e)=>{this.changeSearch(e); this.changeActive(e)}} type="submit">
                                                    <div className="searchButton" required>Search Patient</div>
                                                </button>
                                            </Link>
                                        </div>
                                    </form>

                                </div>
                        </Nav>

                    <Route exact strict path='/' component={Home}/>

                    <Route exact strict path='/addpatient' component={AddUser}/>
                    <Route exact strict path='/allpatients' component={AllUsers}/>
                    <Route exact strict path='/updatepatient' component={UpdateUser}/>
                    <Route exact strict path='/deletepatient' component={DeleteUser}/>
                    <Route exact strict path='/searchpatient' component={() => (<SearchUser search={this.state.search}/>)}/>


                    {/*<Route path='/search/' component={(props) => (<SearchNewsComponent {...props} search={this.state.searchText}/>)}/>
                    */}
              
        </Router>
      </div>
                )
            }
}

export default Header;