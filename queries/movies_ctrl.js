var movies = require('../models/movies')

module.exports = {

  index: function(req, res, next) {
    let q = req.query;
    if (q.genre) {
      let filtered = movies.filter(function(obj) {
        return obj.genre === q.genre;
      })
      return res.status(200).json(filtered)
    };
    res.status(200).json(movies);
  },

  last: function(req, res, next) {
    res.status(200).json(movies.pop());
  },

  select: function(req, res, next) {
    let id = parseInt(req.params.id);
    res.status(200).json(movies[id]);
  },

  // NOTE: (URL BAR) Paths & ANY input is always parsed into strings --so numbers need parsing.
  // express takes everything from ':id' & puts it on the req.params
  create: function(req, res, next) {
    movies.push(req.body);
    res.status(200).json(movies);
  },

  update: function(req, res, next) {
    let movieId = parseInt(req.params.id);
    let nuFilm = req.body;
    movies.splice(movieId, 1, nuFilm);
    res.status(200).json(movies[movieId]);
  },
  destroy: function(req, res, next) {
    var deletedMovie = movies.splice(req.params.id, 3)[0]; //splice returns an array so...[0]
    res.status(200).json(deletedMovie);
  }

}
