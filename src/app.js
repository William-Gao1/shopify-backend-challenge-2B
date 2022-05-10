const express = require('express');
const app = express();

const inventoryRouter = require('./router/v1/inventoryRouter');

app.use(express.json())
app.use('/v1/inventory', inventoryRouter);

module.exports = app;