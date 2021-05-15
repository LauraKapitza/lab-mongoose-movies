const express = require('express');
const router = express.Router();
const Celebrity = require('../models/Celebrity.model')

//
// List Movies
//

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

//
// Add A New Movie
//

router.get('/celebrities/new', (req, res) => {
    res.render('celebrities/new')
})

router.post('/celebrities', (req, res, next) => {
    const newCelebrity = {
        name: req.body.name, 
        occupation: req.body.occupation, 
        catchPhrase: req.body.catchPhrase
    }

    Celebrity.create(newCelebrity)
        .then(() => res.redirect('/celebrities'))
        .catch(err => next(err))
    
})


//
// Delete A Movie
//

router.post('/celebrities/:id/delete', (req, res, next) => {
    Celebrity.findByIdAndDelete(req.params.id)
        .then(() => res.redirect('/celebrities'))
        .catch(err => next(err))
})

//
// Update A Movie
//

router.get('/celebrities/:id/edit', (req, res, next) => {
    Celebrity.findById(req.params.id)
        .then(celebrity => res.render('celebrities/edit', {celebrity}))
        .catch(err => next(err))
})

router.post('/celebrities/:id', (req, res, next) => {
    const id = req.params.id;
    console.log('The Id for editing', id)

    const updates = {
        name: req.body.name,
        occupation: req.body.occupation,
        catchPhrase: req.body.catchPhrase
    }

    console.log(updates)

    Celebrity.findByIdAndUpdate({_id: id}, updates, {new: true})
        .then(() => res.redirect(`/celebrities/${id}`))
        .catch(err => next(err))

})


//
// Show Movie Details
//

router.get('/celebrities/:id', (req, res, next) => {
    Celebrity.findById(req.params.id)
        .then(data => {
            const results = {celebrity: data}
            res.render('celebrities/show', results)
        })
        .catch(err => next(err))
})

module.exports = router;