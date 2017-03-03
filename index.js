var express = require('express');
var bodyParser = require('body-parser');

var moviesCtrl = require('./queries/movies_ctrl');
// NOTE: this VAR becomes an obj with methods on it

var logQuery = function(req, res, next) {
  console.log("req.path", req.path);
  console.log("req.query", req.query);
  next();
}
var app = express();
app.use(bodyParser.json());
//NOTE: this line takes the body and parses out every single req
//
app.use(logQuery);

// NOTE: (regarding these methods) The only thing that will "cut off the chain" of the life-cycle is if the Fn sends something back. (i.e. 'res.status(200).json(movies)')
// OTHERWISE: YOU MUST USE **NEXT**

// Collection √
app.get('/movies', logQuery, moviesCtrl.index);
// Last in Collection √
app.get('/movies/last', moviesCtrl.last);
// Select by index √
app.get('/movies/:id', moviesCtrl.select);
// Add item √
app.post('/movies/', logQuery, moviesCtrl.create);
// Edit item √
app.put('/movies/:id', moviesCtrl.update);
// Erase item
app.delete('/movies/:id', moviesCtrl.destroy);


var PORT = 3000;
app.listen(PORT);
