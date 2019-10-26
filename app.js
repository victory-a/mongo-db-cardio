const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const mongoose = require('mongoose');
const morgan = require('morgan')

// routes
const personRoute = require('./routes/person');
const storyRoute = require('./routes/story');

// middlewares
app.use(bodyParser.json());
app.use(morgan('dev'))
app.use('/person', personRoute)
app.use('/story', storyRoute)

mongoose.set("useUnifiedTopology", true)
mongoose.set("useNewUrlParser", true)
mongoose.connect('mongodb://localhost/populate', { useNewUrlParser:true,  useUnifiedTopology: true})

// app.use(function (err, req, res, next) {
//     res.status(500).json({
//         success: false,
//         message: 'something went wrong',
//         err
//     })
// })

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => console.log('db successfully connected'));

const PORT = process.env.port || 3000;
app.listen(PORT, () => console.log(`server listening on port ${PORT}`))