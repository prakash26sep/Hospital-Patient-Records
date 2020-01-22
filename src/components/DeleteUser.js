import React,{Component} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
//import {Bootstrap, Grid, Row, Col} from 'react-bootstrap';
//import { Nav} from "react-bootstrap";
//import 'bootstrap/dist/css/bootstrap-theme.css';
import './css/style.css'
import axios from 'axios';

var n=1;
var totalResults= 0;

class DeleteUser extends Component{
    constructor(props){
        super(props);

        this.deleteUser= this.deleteUser.bind(this);
        this.nextPage= this.nextPage.bind(this);
        this.previousPage= this.previousPage.bind(this);

        this.state = {
            persons: [],
            message: "",
            messageDelete: ""
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
                  "persons": response.data.data

              })
          }).catch((error) => {
              console.log(error);
          });
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

    async deleteUser(e){

        // eslint-disable-next-line no-restricted-globals
        var result = confirm("Want to delete?");
        if (result) {
            //Logic to delete the item

        await axios.delete(`http://hospital-record-backend.herokuapp.com/person/${e.target.id}`)
        .catch((error) => {console.log(error);})
        .then(

           console.log("deleted")

           //this.forceUpdate();
           //window.location= '/deleteuser';
        )}

        if(result){
        axios.get('http://hospital-record-backend.herokuapp.com/person/')
           .then((response) => {
               
               this.setState({
                   "persons": response.data.data,
                   messageDelete: "Patient Record Successfully Deleted!"
                },
                ()=> {console.log(this.state.persons);})
               
           }).catch((error) => {

               console.log(error);
           });
        }
    }

    


    render(){

        return(
            
            <div id="wrap" className="">
                <br/>
                <br/>
                <div className="container align-items-center">
                <h3 style={{color: "green"}} className="label label-success">{this.state.messageDelete}</h3>
                    
                    <h1>Select a Patient to Delete</h1>
                    <br/>

                    <div className="table-responsive">

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
                        <td>{person.fname}</td>
                        <td>{person.lname}</td>
                        <td>{person.gender}</td>
                        <td>{person.age}</td>
                        <td>{person.email}</td>
                        <td>{person.weight}</td>
                        <td>{person.height}</td>
                        <td>{person.about}</td>

                        <td><button type="button" id={person._id} onClick={this.deleteUser} className="btn btn-danger btn-sm">Delete</button></td>
                    </tr>)}
                        </tbody>
                    </table></div>
                    </div>

                    <div><button onClick={this.previousPage}>Previous</button> <button onClick={this.nextPage}>Next</button></div>
                    <h3 style={{color: "red"}}>{this.state.message}</h3>
                   
                    
                </div> 
            </div>
        )
    }
}

export default DeleteUser;
