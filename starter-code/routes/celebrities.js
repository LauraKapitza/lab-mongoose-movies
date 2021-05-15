const express = require('express');
const router = express.Router();
const Celebrity = require('../models/Celebrity.model')


router.get('/celebrities', (req, res, next) => {
    Celebrity.find()
        .then(data => {
            const results = {
                celebrities: data
            }
            res.render('celebrities/index', results)
        })
        .catch(err => next(err))
});


router.get('/celebrities/new', (req, res) => {
    res.render('celebrities/new')
})

router.post('/celebrities/new', (req, res, next) => {
    const newCelebrity = {
        name: req.body.name, 
        occupation: req.body.occupation, 
        catchPhrase: req.body.catchPhrase
    }

    Celebrity.create(newCelebrity)
        .then(() => res.redirect('/celebrities'))
        .catch(err => next(err))
    
})

router.post('/celebrities/:id/delete', (req, res, next) => {
    console.log('with id', req.params.id)
    console.log('without id', req.params)
    Celebrity.findByIdAndDelete(req.params.id)
        .then(() => res.redirect('/celebrities'))
        .catch(err => next(err))
})


router.get('/celebrities/:id', (req, res, next) => {
    Celebrity.findById(req.params.id)
        .then(data => {
            console.log(data)
            const results = {celebrity: data}
            res.render('celebrities/show', results)
        })
        .catch(err => next(err))
})

module.exports = router;