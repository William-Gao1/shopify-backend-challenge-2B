const express = require('express');
const app = express();

const inventoryRouter = require('./router/inventoryRouter');

app.use(inventoryRouter);

module.exports = app;