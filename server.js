const express = require('express');
const app = express();
const path = require('path');
const bodyparser = require('body-parser');
const session = require('express-session')
const {v4:uuidv4}=require('uuid');
const router=require("./router");
const nocache = require('nocache');

// used for setting view engine
app.set('view engine','ejs');
 
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:true}))

// load static assets
app.use('/static',express.static(path.join(__dirname,'public')))
app.use('/assets',express.static(path.join(__dirname,'public/assets')))
app.use(nocache())
app.use(session({
    secret:"uuidv4()",
    resave:false,
    saveUninitialized:true
}));

app.use('/route',router);
// home
app.get('/',(req,res) => {
    if(req.session.user){
        res.redirect('/route/home')
    }
    else{
        res.render('base');
    }

})

app.listen(7000,()=>{
    console.log("The port is on:http://localhost:7000 ");
});
