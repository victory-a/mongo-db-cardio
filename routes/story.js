const router = require('express').Router()
const { Story } = require('../models/defineDBandModels')
const { handleError, handleSuccess, notFound } = require('../controllers/helperFunctions')

router.get('/', (req, res) => {
  Story.aggregate([
    {
      $lookup: {
        from: 'people',
        localField: 'author',
        foreignField: '_id',
        as: 'author'
      }
    }
  ])
  // .populate('author')
    .then(story => handleSuccess(res, story))
    .catch(err => handleError(err, res))
})

router.get('/:storyId', (req, res) => {
  Story.findOne({ _id: req.params.storyId }, '-__v')
    .populate({ path: 'author', populate: { path: 'partner' } })
    .then(story => {
      if (!story) return notFound(res)
      handleSuccess(res, story)
    })
    .catch(err => handleError(err, res))
})

router.post('/', (req, res) => {
  const { author, title } = req.body
  const story = new Story({ author, title })
  story.save()
    .then(story => handleSuccess(res, story, 201, 'story created successfully'))
    .catch(err => handleError(err, res, 500, 'create story unsuccessful'))
})

router.patch('/:storyId', (req, res) => {
  const update = { $set: { ...req.body } }
  Story.updateOne({ _id: req.params.storyId }, update)
    .then(story => {
      if (!story) return notFound(res)
      handleSuccess(res, story, 201, 'update successful')
    })
    .catch(err => handleError(err, res, 500, 'update unsuccessful'))
})

router.patch('/:storyId/fans', (req, res) => {
  const update = { $push: { fans: req.body.fan } }
  Story.updateOne({ _id: req.params.storyId }, update)
    .then(story => {
      if (!story) return notFound(res)
      handleSuccess(res, story, 201, 'update successful')
    })
    .catch(err => handleError(err, res, 500, 'update unsuccessful'))
})

router.delete('/:storyId', (req, res) => {
  Story.findByIdAndRemove(req.params.storyId)
    .then(story => {
      if (!story) return notFound(res)
      handleSuccess(res, story, 200, 'successfully deleted')
    })
})

module.exports = router
