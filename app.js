const express = require('express');
const app = express();
const PORT = 3000;

app.set('views', `${__dirname}/dist/`);
app.engine('html', require('ejs').renderFile);

app.use(express.static(`${__dirname}/dist/`));

app.get('/', function(req, res){
    res.status(200).render('index.html');
    res.render('index.html');
});

app.get('/index.html', function(req, res){
    res.status(200).render('index.html');
});

app.get('/400', function(req, res){
    res.status(404).render('404.html');
});

app.get('/500', function(req, res){
    res.status(500).render('500.html');
});

app.listen(PORT, function () {
  console.log(`${PORT}`);
});
