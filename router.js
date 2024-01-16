var express = require('express');
var router = express.Router();

// inbuilt password&mail
const credential={
    email:"shibin123@gmail.com",
    password:"123"
}

// user login

router.post('/login',(req,res)=>{
    if(req.body.email===credential.email && req.body.password===credential.password){
        req.session.user=req.body.email;
        res.redirect('/route/home')
    }
    else
    {
        res.end('invalid Uername or Password')
    }
});
// home backbutton disable
router.get('/home',(req,res)=>{
    if(req.session.user){
        
        res.render('home',{content:credential})
    }
    else{
        res.redirect('/')
    }
    
})
// logout
router.get('/logout',(req,res)=>{
    console.log(credential.email);
    req.session.destroy()
    res.redirect('/');
})
module.exports=router;