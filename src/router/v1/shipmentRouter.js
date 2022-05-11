const express = require('express');
const router = new express.Router();

const ResponseCode = require('../../enum/ResponseCode');
const shipmentService = require('../../service/shipmentService');

router.get('/:id', async (req, res) => {
  try {
    const result = await shipmentService.getShipmentById(req.params.id);
    res.status(ResponseCode.OK).send(result);
  } catch (e) {
    res.status(e.status || ResponseCode.SERVER_ERROR).send(e.message);
  }
});

router.post('/', async (req, res) => {
  try {
    const {items} = req.body;
    const result = await shipmentService.createShipment(items);
    res.status(ResponseCode.CREATED).send(result);
  } catch (e) {
    res.status(e.status || ResponseCode.SERVER_ERROR).send(e.message);
  }
});

router.post('/addItems/:id', async (req, res) => {
  try{
    const {items} = req.body;
    const result = await shipmentService.addAllItemsToShipment(req.params.id, items);
    res.status(ResponseCode.OK).send(result);
  } catch (e) {
    res.status(e.status || ResponseCode.SERVER_ERROR).send(e.message);
  }
});

module.exports = router;