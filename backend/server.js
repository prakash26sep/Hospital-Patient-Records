//Using the various libraries installed using node package manager
var express=require("express"); 
const mongoose = require('mongoose');
var bodyParser=require("body-parser");

const cors= require('cors');
//var ObjectId = require('mongodb').ObjectID;

//Importing mongoose schema
var Person = require('./models/person');

var PORTNUM= process.env.PORT;
console.log(process.env);

//Connecting it to the mongodb with DB 'gfg'


mongoose.Promise= global.Promise;
mongoose.connect('mongodb+srv://prakash26sep:tatasky1@ourcommmunicatordata-yoagc.mongodb.net/test?retryWrites=true&w=majority', {useNewUrlParser: true, server: { socketOptions: {
    socketTimeoutMS: 0,
    connectTimeoutMS: 0
  }
}}).catch((error) => { console.log(error); });;;
var db=mongoose.connection; 
db.on('error', console.log.bind("connection error")); 
db.once('open', function(callback){ 
    console.log("connection succeeded"); 
}); 

//invoking express and storing as reference to 'app' 
var app=express(); 
app.use(bodyParser.json()); 
app.use(cors());
app.use(express.json());

mongoose.set('useFindAndModify', false);

//The root route

app.get('/person/pages',(req,res)=>{ 

    if(req.query.page == undefined){

        Person.find({},(err,data)=>{
        
            if(data.length === 0){
                    
                res.json({"message": "No data found!"});
            }else{
                res.json({"totalResult": data.length, data});
                //res.json(data);
                }
            
            //res.json(data);
              })
            
        }
        else{

            var page= req.query.page;


            Person.find({},{}, { skip: 10 *(page-1), limit: 10},(err,data)=>{
                
                if(data.length === 0){
                        
                    res.json({"message": "No data found!"});
                }else{
                    res.json({"totalResult": data.length, data});
                    //res.json(data);
                    }
                
                //res.json(data);
                })
        }
});

//The get route for finding name specific data
app.get('/person/query',(req,res)=>{ 

    if(req.query.age == undefined){

        var str = req.query.name;

        //Using Regex for the case insesnsitive queries to search on mongodb
        var regex = new RegExp(["^", str, "$"].join(""), "i");
        var pos = str.search(" ");

        //console.log(str);
        
        //console.log(str);
        //console.log(pos);

        var fname= str.slice(0, pos);
        var regexFname= new RegExp(["^", fname, "$"].join(""), "i");
        
        var lname= str.slice(pos, str.length);
        var regexLname= new RegExp(["^", lname, "$"].join(""), "i");

        //console.log(fname);
        //console.log(lname);

        if(pos=== -1){

            //It finds whether the single string without space is first name or last name, both results will be fetched
            Person.find({ $or: [ { fname: regex }, { lname: regex } ] },(err,data)=>{

                if(data.length === 0){
                    
                    res.json({"totalResult": data.length});
                }else{
                    res.json({"totalResult": data.length, data});
                    //res.json(data);
                    }
                }) ;
        }
        else{
            Person.find({"fname": regexFname, "lname": regexLname},(err,data)=>{

                if(data.length === 0){
                    
                    res.json({"totalResult": data.length});
                }else{
                    res.json({"totalResult": data.length, data});
                    //res.json(data);
                    }
                }) ;
        }

        
    }
          
    if(req.query.name == undefined){

        Person.find({"age": req.query.age},(err,data)=>{

            if(data.length === 0){
                
                res.json({"totalResult": data.length});
            }else{
                res.json({"totalResult": data.length, data});
                //res.json(data);
                }
            });  
    }

    if( (req.query.name !== undefined) && (req.query.age !== undefined)){
        Person.find({"fname": req.query.name, "age": req.query.age},(err,data)=>{

            if(data.length === 0){
            
                res.json({"totalResult": data.length});
            }else{
                res.json({"totalResult": data.length, data});
                //res.json(data);
                }
            }) ;
        }

});

//Getting data through post
app.post('/person', (req, res)=>{

    const userdata={
        fname: req.body.fname,
        lname: req.body.lname,
        gender: req.body.gender,
        age: Number(req.body.age),
        email: req.body.email,
        weight: Number(req.body.weight),
        height: Number(req.body.height),
        about: req.body.about,
    }

    const personObject= new Person(userdata);
    personObject.save().then(() => res.json({"message": "user added"}));
    
});

//Deleteing data
app.delete('/person/:id', (req, res)=>{

    const userdata={
        email : req.body.email
    }

    Person.findOneAndRemove({_id: req.params.id}, (err) => {
        res.json({ "message": "user deleted"});
      });
    
});

app.put('/person/:id', (req, res)=>{

    /*
    const userdata={
        emailid : req.body.emailid,
    }*/

   Person.findByIdAndUpdate( req.params.id, req.body, {new: true},(err) => {
            res.json({"message": "user updated"});
        });
    
});

//assigning the port
app.listen(PORTNUM,function(){
    console.log("Live at Port "+ PORTNUM);
});
