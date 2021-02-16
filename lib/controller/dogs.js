const { Router } = require('express');
const Dog = require('../models/Dogs');


module.exports = Router()
////post route
  .post('/', (req, res, next) => {
    Dog
      .insert(req.body)
      .then(dog => res.send(dog))
      .catch(next);
  }) 
  .get('/', (req, res, next) => {
    Dog
      .find()
      .then(dogs => res.send(dogs))
      .catch(next);
  })
  

