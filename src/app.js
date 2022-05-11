const express = require('express');
const app = express();

const swaggerUi = require('swagger-ui-express');
const openAPIDocs = require('./swagger.json')

const inventoryRouter = require('./router/v1/inventoryRouter');
const shipmentRouter = require('./router/v1/shipmentRouter');

app.use(express.json())
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(openAPIDocs));
app.use('/v1/inventory', inventoryRouter);
app.use('/v1/shipment', shipmentRouter);

module.exports = app;