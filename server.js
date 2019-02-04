const express = require("express");
const app = express();
const hbs = require('hbs');
const fs = require('fs');


app.use(express.static(__dirname+'/public'));
app.use((req,res,next) => {
    var now =  new Date().toString();
    fs.appendFile('webserver',`${now}: ${req.method} ${req.url} \n`, (err)=>{
        if(err){console.log("Unable to append file");}
    });
    next();
});

/*app.use((req,res,next) => {

    res.render('maintain');
    
});*/


app.set('view engine', 'hbs');
hbs.registerPartials(__dirname+'/views/partials');
hbs.registerHelper('getCurrentYear',()=>{
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt',(text)=>{
    return text.toUpperCase();
})

app.get('/', (req,res)=> {
    res.render('home',{
        pageTitle : "Home Page",
        welcomeMessage: " Welcome to our Page",
        
    });
});

app.get('/about', (req,res)=> {
    res.render('about',{
        pageTitle : "About Page",
        
    });
});

app.get('/bad', (req,res)=>{
    res.send({errorMessage : "unable to Handle"})
})

app.listen(3000, ()=>{
    console.log("Server is Running in Port 3000");
});
