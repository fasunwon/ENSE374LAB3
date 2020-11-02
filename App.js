class user{
    constructor(){
         this.users = [{username:"user1@abc.com", password:"something"},
                 {username2:"user2@abc.com", password2:"somethingelse"}
    ]

       
    }
}

class task{
    constructor(){
         this.tasks=[{_id:1, name: "unclaimed Task", creator: {username: "User1@abc.com"}, done:false, cleared:false },
               {_id:2, name: "claimed",owner:{username:"user1@abc.com"}, creator: {username: "user1@abc.com"}, done:false, cleared:false },
               {_id:3, name: "claimed",owner:{username:"user2@abc.com"}, creator: {username: "user1@abc.com"}, done:false, cleared:false },
               {_id:4, name: "claimed",owner:{username:"user1@abc.com"}, creator: {username: "user1@abc.com"}, done:true, cleared:false },
               {_id:5, name: "claimed",owner:{username:"user2@abc.com"}, creator: {username: "user1@abc.com"}, done:true, cleared:false }
    ]
      

    }
}


const fs = require('fs')
function saveJSON (filename = '', json='""'){
    return fs.writeFileSync(filename, JSON.stringify(json, null, 1))
}
function loadJSON (filename=''){
    if(fs.existsSync(filename)){
        return JSON.parse(fs.readFileSync(filename).toString())  
    }
    else{
        return JSON.parse('""')
    }
}
/*
const usernames = new user();
const listings = new task();
const data = loadJSON('users.json')
data.push(usernames.users)
saveJSON('users.json', data)

const data2 = loadJSON('tasks.json')
data2.push(listings.tasks)
saveJSON('tasks.json', data2);
*/

const express = require("express");
const app = express();
const {validateUserInfo} = require('./users.json')
const {validationResult} = require('express-validator')


var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const port =2000;



app.use(express.static("css"));
app.get("/", function(req, res){
    res.sendFile(__dirname + "/login.html")
});


app.post("/", function(req, res){
    var user_Id = req.body.usernames;
    var pass_word = req.body.password;
    
    for(let i = 0; i<validateUserInfo.length; i++)
    {
        if(user_Id[i] === validateUserInfo.username)
        {
            if(pass_word[i]==validateUserInfo.password)
            {
                res.redirect(__dirname + "/todo");
            }   
        }
        else{
            break;
        }
    }
})

app.listen(port, function(){
    console.log("server is running on port " + port);
})