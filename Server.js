const express = require('express');

const app = express();

const port = 17011;

//Store all HTML files in public folder.
app.use(express.static(__dirname + '/public'));

// Routes

// Home
app.get('/', function (req, res) {
    res.sendFile('index.html')
});

app.get('/singh',function(req,res){
    res.sendFile('singh.html')
});

app.get('/acosta',function(req,res){
    res.sendFile('acosta.html')
});

app.get('/nemtsov',function(req,res){
    res.sendFile('nemtsov.html')
});

app.get('/tung',function(req,res){
    res.sendFile('tung.html')
});

app.get('/huang',function(req,res){
    res.sendFile('huang.html')
});

app.get('/szeto',function(req,res){
    res.sendFile('szeto.html')
});

// Page Not Found (404)
app.get('*', function (req, res) {
    res.send('<h1>Page Not Found</h1>')
});


app.listen(port, function () {
   console.log('This app is running on localhost: ' +port)
});