var express = require('express');
var morgan = require('morgan');
var path = require('path');

var articles ={
    'art-one': {
        title: 'Art 1'
        , heading: 'Article One',
        date: '12 Aug',
        content: `
            Content 1 Should Display Here
        `
    },
    'art-two':{
        title: 'Art 2'
        , heading: 'Article Two',
        date: '13 Aug',
        content: `
            Content 2 Should Display Here
        `
    },
    'art-three':{
        title: 'Art 3'
        , heading: 'Article Three',
        date: '15 Aug',
        content: `
            Content 3 Should Display Here
        `
    }
};



function createtemp(data){
    var title=data.title;
    var head=data.heading;
    var cont=data.content;
    var date=data.date;
    
    
    var temp=`<html>
    <head>
        <title>
        ${title}
        </title>
        <meta name="viewport" content="width=device-width,initial scale=1"/>
         <link href="/ui/style.css" rel="stylesheet" />
    </head>
    <body>
        <div class="container">
            <div>
                <a href="/">Home</a>
            </div>
            <hr/>
            <h3>
                ${head}
            </h3>
            <div>
                ${date}
            </div>
            <div>
                <p>
                    ${cont}
                </p>
                <p>
                    The Article is here
                </p>
                <p>
                    The start is here
                </p>
            </div>
        </div>
    </body>
</html>`
    return temp;
}




var app = express();

var Pool = require('pg').Pool;
var crypto = require('crypto');
var bodyParser = require('body-parser');
var config = {
    user: 'mastersabhinav',
    database: 'mastersabhinav',
    host: 'db.imad.hasura-app.io',
    port: '5432',
    password: process.env.DB_PASSWORD
}
app.use(morgan('combined'));
app.use(bodyParser.json());

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});
var pool= new Pool(config);
app.get('/test-db', function (req, res) {
    pool.query('SELECT * from test',function(err,result){
       if(err){
           res.status(500).send(err.toString());
       }
       else{
           res.send(JSON.stringify(result.rows));
       }
    });
});

function hash(input, salt){
    var hashed = crypto.pbkdf2Sync( input, salt, 10000, 512, 'sha512');
    return hashed.toString('hex');
}
app.get('/hash/:input', function(req,res){
   var hashedString = hash(req.params.input, 'random-string');
   res.send(hashedString); 
});

app.post('/create-user', function(req,res){
    var username= req.body.username;
    var password= req.body.password;
    
    var salt= crypto.randomBytes(128).toString('hex');
   var dbString = hash(password, salt); 
   pool.query('Insert into "user" (username, password) values ($1,$2)',[username, dbString], function(err,result){
      if(err){
           res.status(500).send(err.toString());
       }
       else{
           res.send('user successfully created!');
       }
   });
});
app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});
/*
var counter=0;
app.get('/counter', function(req,res) {
    counter = counter + 1;
    res.send(counter.toString());
});*/
var counter=0;
app.get('/counter' ,function (req,res){
    counter=counter + 1;
    res.send(counter.toString());
});
var names=[];
app.get('/sub',function(req,res) {
    var name=req.query.name;
    
    names.push(name);
    
    res.send(JSON.stringify(names));
});
app.get('/:articlename', function (req, res) {
    var articlename = req.params.articlename;
   res.send(createtemp(articles[articlename]));
});
app.get('/ui/main.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'main.js'));
});

// Do not change port, otherwise your app won't run on IMAD servers
// Use 8080 only for local development if you already have apache running on 80

var port = 80;
app.listen(port, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
