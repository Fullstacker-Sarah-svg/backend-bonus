const express = require('express');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(cors());

app.use('/api/v1/dogs', require('./controller/dogs'));
app.use(require('./middleware/not-found'));
app.use(require('./middleware/error'));

module.exports = app;
