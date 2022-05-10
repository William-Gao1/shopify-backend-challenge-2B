const db = require("../db/database");
const createSQLFile = require("../db/queryFile");

const ResponseCode = require('../enum/ResponseCode');

const getItemsQuery = createSQLFile('getItems');
const createItemQuery = createSQLFile('createItem');
const getItemByIdQuery = createSQLFile('getItemById');
const saveItemQuery = createSQLFile('saveItem');
const deleteItemQuery = createSQLFile('deleteItem');



const getAllItems = async () => {
  const items = await db.query(getItemsQuery);
  return items;
};



const createItem = async (name, price, description = '', stock = 0) => {
  if (!name || !price) {
    throw {status: ResponseCode.BAD_REQUEST, message: "Please provide all required fields"};
  }
  return await db.one(createItemQuery, [name, price, description, stock]);
}




const updateItem = async (id, name, price, description = '', stock = 0) => {
  if (!id) {
    throw {status: ResponseCode.BAD_REQUEST, message: "Please provide an id"};
  } else if (!name || !price) {
    throw {status: ResponseCode.BAD_REQUEST, message: "Please provide all required fields"};
  }

  const item = await db.oneOrNone(getItemByIdQuery, [id]);
  if (!item) {
    throw {status: ResponseCode.BAD_REQUEST, message: `No such item with id ${id} found`};
  }

  return await db.one(saveItemQuery, [id, name, price, description, stock]);
}



const deleteItem = async (id) => {
  if (!id) {
    throw {status: ResponseCode.BAD_REQUEST, message: "Please provide an id"};
  }
  
  const item = await db.oneOrNone(getItemByIdQuery, [id]);
  
  if (!item) {
    throw {status: ResponseCode.BAD_REQUEST, message: `No such item with id ${id} found`};
  }

  return await db.one(deleteItemQuery, [id]);
}



module.exports = {
  getAllItems,
  createItem,
  updateItem,
  deleteItem
}