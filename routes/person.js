const router = require('express').Router()
const Person = require('../models/person')
const { handleError, handleSuccess, notFound } = require('../controllers/helperFunctions')

//  get all persons from DB
router.get('/', (req, res) => {
  Person.find()
    .then(person => handleSuccess(res, person))
    .catch(err => handleError(err, res))
})

// get a specific person from DB
router.get('/:personId', (req, res) => {
  Person.findOne({ _id: req.params.personId })
    .then(person => {
      if (!person) return notFound(res)
      handleSuccess(res, person)
    })
    .catch(err => handleError(err, res))
})

// create a new person
router.post('/', (req, res) => {
  const author = new Person({
    name: req.body.name,
    age: req.body.age,
    category: req.body.category
  })
  author.save()
    .then(person => handleSuccess(res, person, 200, `${req.body.category} created successfully`))
    .catch(err => handleError(err, res, 500))
})

router.patch('/personId', (req, res) => {
  Person.updateOne(
    { _id: req.params.personId },
    {
      $set: {
        ...req.body
      }
    })
})

// delete a specific person
router.delete('/:personId', (req, res) => {
  Person.findOneAndRemove({ _id: req.params.personId })
    .then(person => {
      if (!person) return notFound(res)
      handleSuccess(res, person)
    })
    .catch(err => handleError(err, res))
})

module.exports = router
