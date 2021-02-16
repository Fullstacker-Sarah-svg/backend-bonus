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
  .get('/:id', (req, res, next) => {
    Dog
      .findById(req.params.id)
      .then(dogs => res.send(dogs))
      .catch(next);
  })
  .delete('/:id', (req, res, next) => {
    Dog
      .delete(req.params.id)
      .then(dogs => res.send(dogs))
      .catch(next);
  })
  .put('/:id', (req, res, next) => {
    Dog
      .update(req.params.id, req.body)
      .then(dogs => res.send(dogs))
      .catch(next);
  });


