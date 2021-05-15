const mongoose = require('mongoose');
const Celebrity = require ('../models/Celebrity.model');

const DB_NAME = 'starter-code';

mongoose.connect(`mongodb://localhost/${DB_NAME}`, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
})

const celebrities = [
    {
        name: 'Britney Spears',
        occupation: 'Singer',
        catchPhrase: `t's Britney, bitch`
    },
    {
        name: 'RuPaul',
        occupation: 'Entertainer',
        catchPhrase: `Don't fuck it up`
    },
    {
        name: 'Arnold Schwarzenegger',
        occupation: 'Actor',
        catchPhrase: `Hasta la vista, baby`
    }
];

Celebrity.create(celebrities)
    .then(data => {
        console.log(`Created ${data.length} celebrities`);
        mongoose.connection.close();
    })
    .catch(err => next(err))