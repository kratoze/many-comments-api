const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv/config');

const errorHandler = require('./_helpers/errorHandling');

const corsOptions = {
  exposedHeaders: 'auth',
};

app.use(cors(corsOptions));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/api', require('./routes'));

app.use(errorHandler);

app.listen(3000);
