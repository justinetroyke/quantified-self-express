const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const database = require('knex')(configuration);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set('port', process.env.PORT || 8000);
app.locals.title = 'Quantified Self Express API';

app.get('/', (request, response) => {
  response.send('Quantified Self Express API')
});

app.get('/api/v1/foods', (request, response) => {
  database('foods').select()
    .then(foods => response.status(200).json(foods))
    .catch(error => console.error(error));
});

app.listen(app.get('port'), () => {
  console.log(`${app.locals.title} is now running on port ${app.get('port')}.`);
});

module.exports = app;
