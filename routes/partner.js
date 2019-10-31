const router = require('express').Router()
const Partner = require('../models/partner')
const { handleError, handleSuccess, notFound } = require('../controllers/helperFunctions')

router.get('/', (req, res) => {
  Partner.find()
    .then(partner => handleSuccess(res, partner))
    .catch(err => handleError(err, res))
})

router.post('/', (req, res) => {
  const { name, color } = req.body
  Partner.create({ name, color })
    .then(partner => handleSuccess(res, partner, 200, 'partner created successfully'))
    .catch(err => handleError(err, res, 400, 'create partner unsucessful'))
})

router.patch('/:partnerId', (req, res) => {
  Partner.updateOne(
    { _id: req.params.partnerId },
    { $set: { ...req.body } }
  ).then(partner => handleSuccess(res, partner, 200, 'update successful'))
})

router.delete('/:partnerId', (req, res) => {
  Partner.findOneAndRemove({ _id: req.params.partnerId })
    .then(partner => {
      if (!partner) return notFound(res)
      handleSuccess(res, partner, 200, 'deleted successfully')
    })
    .catch(err => handleError(err, res))
})

module.exports = router
