const express = require('express');
const Item = require('../models/item');

module.exports = (db) => {
  const router = express.Router();

  router.post('/', async (req, res, next) => {
    const uid = req.uid;
    const { name, quantity } = req.body;
    const newItem = new Item({ name, quantity, uid });
    const item = await db.insertItem(newItem);
    res.status(201).send(item);
  });

  router.get('/', async (req, res, next) => {
    const items = await db.findAllItems();
    res.send(items);
  });

  router.get('/:id', async (req, res, next) => {
    const id = req.params.id;
    const item = await db.findItem(id);
    if (item) {
      res.send(item);
    } else {
      res.status(400).send(`Item id ${id} not found`);
    }
  });

  router.put('/:id', async (req, res, next) => {
    const uid = req.uid;
    const id = req.params.id;

    const dbItem = db.findItem(id);
    const { name, quantity } = req.body;
    console.log({ dbItem });

    if (dbItem.userid !== uid) {
      return res.status(403).send(`User ${uid} caanot edit item ${id}`);
    }

    const updatedItem = new Item({ name, quantity, uid });
    const item = await db.updateItem(id, updatedItem);
    res.send(item);
  });

  router.delete('/:id', async (req, res, next) => {
    const id = req.params.id;
    const success = await db.deleteItem(id);
    if (success) {
      res.send(`Deleted item ${id} successfully`);
    } else {
      res.status(400).send(`Item id ${id} not found`);
    }
  });

  return router;
};
