const express = require('express');
const router = new express.Router();

const ResponseCode = require('../../enum/ResponseCode');
const inventoryService = require('../../service/inventoryService');


router.get('/', async (req, res) => {
  try {
    const items = await inventoryService.getAllItems();
    res.status(ResponseCode.OK).json(items);
  } catch (e) {
    res.status(e.status || ResponseCode.SERVER_ERROR).send(e.message);
  }
});


router.post('/', async (req, res) => {
  try {
    const {name, price, description, stock} = req.body;
    const result = await inventoryService.createItem(name, price, description, stock);
    res.status(ResponseCode.CREATED).send(result);
  } catch (e) {
    res.status(e.status || ResponseCode.SERVER_ERROR).send(e.message);
  }
});


router.put('/:id', async (req, res) => {
  try {
    const {name, price, description, stock} = req.body;
    const result = await inventoryService.updateItem(req.params.id, name, price, description, stock);
    res.status(ResponseCode.OK).send(result);
  } catch (e) {
    res.status(e.status || ResponseCode.SERVER_ERROR).send(e.message)
  }
});


router.delete('/:id', async (req, res) => {
  try {
    const result = await inventoryService.deleteItem(req.params.id);
    res.status(ResponseCode.OK).send(result);
  } catch (e) {
    res.status(e.status || ResponseCode.SERVER_ERROR).send(e.message)
  }
});

module.exports = router;