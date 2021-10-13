const express = require('express');
const Item = require('../models/item');

module.exports = (db, todoAuthMiddleware) => {
  const router = express.Router();

  router.post('/', async (req, res, next) => {
    try {
      const uid = req.uid;
      const { name, quantity } = req.body;
      const newItem = new Item({ name, quantity, uid });
      const item = await db.insertItem(newItem);
      res.status(201).send(item);
    } catch (error) {
      next(error);
    }
  });

  router.get('/', async (req, res, next) => {
    try {
      const items = await db.findAllItems();
      res.send(items);
    } catch (error) {
      next(error);
    }
  });

  router.get('/:id', async (req, res, next) => {
    try {
      const id = req.params.id;
      const item = await db.findItem(id);
      if (item) {
        res.send(item);
      } else {
        res.status(400).send(`Item id ${id} not found`);
      }
    } catch (error) {
      next(error);
    }
  });

  router.put('/:id', todoAuthMiddleware, async (req, res, next) => {
    try {
      const uid = req.uid;
      const id = req.params.id;

      const { name, quantity } = req.body;
      const updatedItem = new Item({ name, quantity, uid });
      const item = await db.updateItem(id, updatedItem);
      res.send(item);
    } catch (error) {
      next(error);
    }
  });

  router.delete('/:id', todoAuthMiddleware, async (req, res, next) => {
    try {
      const id = req.params.id;
      const success = await db.deleteItem(id);
      if (success) {
        res.send(`Deleted item ${id} successfully`);
      } else {
        res.status(400).send(`Item id ${id} not found`);
      }
    } catch (error) {
      next(error);
    }
  });

  return router;
};
