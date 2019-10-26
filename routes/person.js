const router = require('express').Router();
const Person = require('../models/person');
const { handleError, handleSuccess } = require('../controllers/helperFunctions');

router.get('/', (req, res) => {
    Person.find()
        .then(person => handleSuccess(res, person))
        .catch(err => handleError(err, res))
});

router.get('/:personId', (req, res) => {
    Person.findOne({_id: req.params.personId})
    .then(person => handleSuccess(res, person, ))
    .catch(err => handleError(err, res))
})

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

// router.post('/fan', (req, res) => {
//     const fan = new Person({
//         name: req.body.name,
//         age: req.body.age, 
//         category: "fan"
//     })
//     fan.save()
//     .then(person => handleSuccess(res, person, 200, 'fan created successfully'))
//     .catch(err => handleError(err, res, 500))
// })


module.exports = router;    