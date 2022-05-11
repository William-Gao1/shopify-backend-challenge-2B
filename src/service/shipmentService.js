const db = require("../db/database");
const createSQLFile = require("../db/queryFile");

const ResponseCode = require('../enum/ResponseCode');
const inventoryService = require('./inventoryService');

const createShipmentQuery = createSQLFile('createShipment');
const createShipmentItemQuery = createSQLFile('createShipmentItem');
const getShipmentItemsQuery = createSQLFile('getShipmentItems');
const getShipmentItemByItemIdQuery = createSQLFile('getShipmentItemByItemId');
const updateShipmentItemQuantityQuery = createSQLFile('updateShipmentItemQuantity');

const getShipmentById = async (id) => {
  const items = await db.one(getShipmentItemsQuery, [id]);
  if (!items.items) {
    throw {status: ResponseCode.BAD_REQUEST, message: `No shipment found with id ${id}`}
  }
  return {id, ...items};
}

const consolidateShipment = (items) => {
  const consolidatedItems = new Map();
  items.forEach(item => {
    if (!item.id || !item.quantity) {
      throw {status: ResponseCode.BAD_REQUEST, message: "Please provide the required fields for each item"};
    }
    if (consolidatedItems.get(item.id)) {
      consolidatedItems.set(item.id, item.quantity + consolidatedItems.get(item.id));
    } else {
      consolidatedItems.set(item.id, item.quantity);
    }
  })
  return consolidatedItems;
}

const createShipment = async (items) => {
  const consolidatedItems = consolidateShipment(items);
  let shipmentResult;
  await db.tx(async t => {
    shipmentResult = await t.one(createShipmentQuery);
    await Promise.all(Array.from(consolidatedItems.entries()).map(async ([itemId, quantity]) => {
      await addItemToShipment(shipmentResult.id, itemId, quantity, t);
    }));
  });
  return await getShipmentById(shipmentResult.id);
  
}

const addItemToShipment = async (id, itemId, quantity, t) => {
  const inventoryItem = await inventoryService.getItemById(itemId, t);

  if (inventoryItem.stock < quantity) {
    throw {status: ResponseCode.BAD_REQUEST, message: `Not enough stock for inventory item with id ${shipmentItem.id}`}
  }
  
  const existingShipmentItem = await (t || db).oneOrNone(getShipmentItemByItemIdQuery, [id, itemId]);

  let shipmentItemPromise;
  if (!existingShipmentItem) {
    await (t || db).one(createShipmentItemQuery, [id, itemId, quantity]);
  } else {
    console.log(existingShipmentItem)
    await (t || db).one(updateShipmentItemQuantityQuery, [existingShipmentItem.shipment_item_id, existingShipmentItem.quantity + quantity]);
  }
  await inventoryService.updateItem(inventoryItem.id, inventoryItem.name, inventoryItem.price, inventoryItem.description, inventoryItem.stock - quantity, t)
}

const addAllItemsToShipment = async (id, items) => {
  const consolidatedItems = consolidateShipment(items);
  const shipment = await getShipmentById(id);
  await db.tx(async t => {
    await Promise.all(Array.from(consolidatedItems.entries()).map(async ([itemId, quantity]) => {
      await addItemToShipment(id, itemId, quantity, t);
    }));
  });
  return await getShipmentById(id);
}

module.exports = {
  createShipment,
  getShipmentById,
  addAllItemsToShipment
}