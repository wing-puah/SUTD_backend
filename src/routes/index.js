const express = require('express');

module.exports = (authMiddleware, todoAuthMiddleware, authService, db) => {
  const router = express.Router();

  router.get('/', (req, res, next) => {
    res.send('Hello world!');
  });

  router.use('/', require('./auth')(authService));

  // All routes from this point will use the auth middleware
  router.use(authMiddleware);

  router.use('/items', require('./items')(db, todoAuthMiddleware));

  return router;
};
