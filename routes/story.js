const router = require('express').Router();
const Story = require('../models/story');
const { handleError, handleSuccess, notFound } = require('../controllers/helperFunctions');

router.get('/', (req, res) => {
    Story.find()
        .then(story => handleSuccess(res, story))
        .catch(err => handleError(err, res))
});

router.get('/:storyId', (req, res) => {
    Story.findOne({_id: req.params.storyId},'-__v')
        .populate('author', 'name age')
        .populate('fans', 'name age')
        .then(story => {
            if(!story) return notFound(res);
            handleSuccess(res, story)
        })
        .catch(err => handleError(err, res))
}); 

router.post('/', (req, res) => {
    const story = new Story({
        author: req.body.author,
        title: req.body.title,
    });   
    story.save()
        .then(story => handleSuccess(res, story, 201, 'story created successfully'))
        .catch(err => handleError(err, res, 500, 'create story unsuccessful'))
})

router.patch('/:storyId', (req, res) => {
    const {fan, author } = req.body;
    const update = {}
    if (fan) Object.assign(update, {$push: {fans, fan}});
    if (author) Object.assign(update, {$set: {author}});
    Story.findOneAndUpdate({_id:req.params.storyId}, update,function(err, data) {
        if(!data)return notFound(res)
    })
    .then(story => {
        if(!story) return notFound(res);
        handleSuccess(res,story, 201, 'update successful')})
    .catch(err => handleError(err, res, 500, 'update unsuccessful'))
})
  
module.exports = router; 