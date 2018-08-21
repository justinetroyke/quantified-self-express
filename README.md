[![Waffle.io - Issues in progress](https://badge.waffle.io/justinetroyke/quantified-self-express.svg?columns=all)](http://waffle.io/justinetroyke/quantified-self-express)

__Quick Start:__

*Clone down this repo

*run in the command line
```
npm install
npm install -g pg

```
*Create psql database for production, development and any other environment you would like.
*Run ```knex init```

*Configure you knexfile.js by setting up your connections

*Open the created knexfile.js and configure it for development using something like what's below:

*Run migrations: knex migrate:latest

__Heroku Link__

https://justine-qs-express.herokuapp.com/

__Testing__

To run the full rspec testing suite, run
```mocha -exit```
from the command line

__Contributions__
To make contributions please fork the repo and submit a PR. If you are fixing an existing issue from the Waffleboard please include which issue number it fixes. 
