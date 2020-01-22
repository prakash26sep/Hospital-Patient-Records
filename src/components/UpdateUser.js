import React,{Component} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
//import {Bootstrap, Grid, Row, Col} from 'react-bootstrap';
//import { Nav} from "react-bootstrap";
//import 'bootstrap/dist/css/bootstrap-theme.css';
import './css/style.css';
import axios from 'axios';

var n=1;
var totalResults= 0;

class UpdateUser extends Component{
    constructor(props){
        super(props);

        this.updateRow= this.updateRow.bind(this);
        this.submitUpdate= this.submitUpdate.bind(this);
        this.nextPage= this.nextPage.bind(this);
        this.previousPage= this.previousPage.bind(this);

        this.onChangeFname= this.onChangeFname.bind(this);
        this.onChangeGender= this.onChangeGender.bind(this);
        this.onChangeLname= this.onChangeLname.bind(this);
        this.onChangeAge= this.onChangeAge.bind(this);
        this.onChangeEmail= this.onChangeEmail.bind(this);
        this.onChangeAbout= this.onChangeAbout.bind(this);
        this.onChangeWeight= this.onChangeWeight.bind(this);
        this.onChangeHeight= this.onChangeHeight.bind(this);

        this.state = {
            persons: [],
            fname: "",
            lname: "",
            gender: "",
            age: 0,
            email: "",
            about: "",
            weight: 0,
            height: 0,
            messageUpdate: "",
            totalResult: 0,
            message: ""
        }

    }

    componentDidMount() {
        axios.get(`http://hospital-record-backend.herokuapp.com/person/pages`)
        .then(response => {
            totalResults= response.data.totalResult;
            this.setState({
                totalResult: response.data.totalResult
            })
        }).catch((error) => {
            console.log(error);
        });



        axios.get(`http://hospital-record-backend.herokuapp.com/person/pages?page=1`)
        .then(response => {
            this.setState({
                "persons": response.data.data,

            })
        }).catch((error) => {
            console.log(error);
        });
    }

    submitUpdate(e){

    }

    updateRow(e){
        if(e.target.innerHTML=== "Edit"){

                // Get a NodeList of all .demo elements
                var x= "." +e.target.id;
                const demoClasses = document.querySelectorAll(x);

                // Change the text of multiple elements with a loop
                demoClasses.forEach(element => {
                element.contentEditable = "true";
                }); 
                e.target.innerHTML= "Update";

                var id1= "id1" +e.target.id.substring(3);
                var id2= "id2" +e.target.id.substring(3);
                var id3= "id3" +e.target.id.substring(3);
                var id4= "id4" +e.target.id.substring(3);
                var id5= "id5" +e.target.id.substring(3);
                var id6= "id6" +e.target.id.substring(3);
                var id7= "id7" +e.target.id.substring(3);
                var id8= "id8" +e.target.id.substring(3);
                
                this.setState({
                    fname: document.getElementById(id1).innerHTML,
                    lname: document.getElementById(id2).innerHTML,
                    gender: document.getElementById(id3).innerHTML,
                    age: document.getElementById(id4).innerHTML,
                    email: document.getElementById(id5).innerHTML,
                    weight: document.getElementById(id6).innerHTML,
                    height: document.getElementById(id7).innerHTML,
                    about: document.getElementById(id8).innerHTML
                })
                
            }
                
        else{

            //e.preventDefault();

            const user={

                fname: this.state.fname,
                lname: this.state.lname,
                gender: this.state.gender,
                age: this.state.age,
                email: this.state.email,
                weight: this.state.weight,
                height: this.state.height,
                about: this.state.about
            }
    
            console.log(user);

            //e.target.id.substring(3);
    
            axios.put(`http://hospital-record-backend.herokuapp.com/person/${e.target.id.substring(3)}`, user)
                .then(res => console.log(res.data));
    
            
            this.setState({
                username: '',
                messageUpdate: "Patient details Successfully Updated!",
                message: ""
            })

            var y= "." +e.target.id;
                const demoClasses = document.querySelectorAll(y);

                // Change the text of multiple elements with a loop
                demoClasses.forEach(element => {
                    element.contentEditable = "false";
                }); 

            e.target.innerHTML= "Edit";
        }
    }

    onChangeFname(e){

        console.log("ONCHANGE First NAME CALLED");
        
            /*e.addEventListener('input', function() {
            this.setState({
                fname: e.target.innerHTML
            },
            ()=>{
                console.log("value updated")
            })
        });
        */

        this.setState({
            fname: e.target.innerHTML
            },
            ()=>{
                console.log("value updated")
            })
                
    }
    onChangeLname(e){
        console.log("ONCHANGE LAST NAME CALLED");
        this.setState({
            lname: e.target.innerHTML
        },()=>{ console.log('hello')})
        /**/
    }
    onChangeGender(e){
        this.setState({
            gender: e.target.innerHTML
        })
    }
    onChangeAge(e){
        console.log("ONCHANGE AGE CALLED");
        this.setState({
            age: e.target.innerHTML
        })
    }
    onChangeEmail(e){
        this.setState({
            email: e.target.innerHTML
        })
    }
    onChangeAbout(e){
        this.setState({
            about: e.target.innerHTML
        })
    }
    onChangeWeight(e){
        this.setState({
            weight: e.target.innerHTML
        })
    }
    onChangeHeight(e){
        this.setState({
            height: e.target.innerHTML
        })
    }

    nextPage() {

        if(n < Math.ceil(totalResults/10)){
        n++;
        
        this.setState({
            message: ""
        })
            }
        else{
            this.setState({
                message: "Last Page Reached!"
            })
        }
        //db.comments.find().skip(pagesize * (n-1)).limit(pagesize);
        axios.get(`http://hospital-record-backend.herokuapp.com/person/pages?page=${n}`)
          .then(response => {
              this.setState({
                  "persons": response.data.data,


              })
          }).catch((error) => {
              console.log(error);
          });
    }

    previousPage() {
        if(n>=2){
            n--;
            this.setState({
                message: ""
            })
        }
        else{
            this.setState({
                message: "Already at first Page!"
            })
        }
        //db.comments.find().skip(pagesize * (n-1)).limit(pagesize);
        axios.get(`http://hospital-record-backend.herokuapp.com/person/pages?page=${n}`)
        .then(response => {
            this.setState({
                "persons": response.data.data,


            })
        }).catch((error) => {
            console.log(error);
        });
    }


    render(){
        return(
            
            <div id="wrap" className="">
                <br/>
                <br/>
                <div className="container align-items-center">

                    <h3 style={{color: "green"}} className="label label-success">{this.state.messageUpdate}</h3>
                    
                    <h1>Select a Patient to Update details</h1>
                    <br/>

                    <div className="table-responsive">

                    <table className="table">
                        <thead>
                        <tr>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Gender</th>
                            <th>Age</th>
                            <th>Email Id</th>
                            <th>Weight (KG)</th>
                            <th>Height (Metre)</th>
                            <th>Problems</th>
                        </tr>

                            </thead>
                            <tbody>
                            { this.state.persons.map(person => 
                            <tr>

                                    <td className={"doc" +person._id} id={"id1" +person._id} onBlur={this.onChangeFname} value={this.state.fname} contentEditable="false">{person.fname}</td>
                                    <td className={"doc" +person._id} id={"id2" +person._id} onBlur={this.onChangeLname} value={this.state.lname} contentEditable="false">{person.lname}</td>
                                    <td className={"doc" +person._id} id={"id3" +person._id} onBlur={this.onChangeGender} contentEditable="false">{person.gender}</td>
                                    <td className={"doc" +person._id} id={"id4" +person._id} onBlur={this.onChangeAge} contentEditable="false">{person.age}</td>
                                    <td className={"doc" +person._id} id={"id5" +person._id} onBlur={this.onChangeEmail} contentEditable="false">{person.email}</td>
                                    <td className={"doc" +person._id} id={"id6" +person._id} onBlur={this.onChangeWeight} contentEditable="false">{person.weight}</td>
                                    <td className={"doc" +person._id} id={"id7" +person._id} onBlur={this.onChangeHeight} contentEditable="false">{person.height}</td>
                                    <td className={"doc" +person._id} id={"id8" +person._id} onBlur={this.onChangeAbout} contentEditable="false">{person.about}</td>

                                    <td><button id={"doc" +person._id} type="button" onClick={this.updateRow} className="btn btn-warning btn-sm">Edit</button></td>
                               
                                
                        </tr>)}
                        </tbody>
                    </table></div>

                    <div><button onClick={this.previousPage}>Previous</button> <button onClick={this.nextPage}>Next</button></div>
                    <h3 style={{color: "red"}}>{this.state.message}</h3>
                   
                    
                </div> 
            </div>
        )
    }
}

export default UpdateUser;
