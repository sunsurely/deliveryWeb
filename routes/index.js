const express = require('express');
const router = express.Router();
const authRouter = require('./auth');
const storeRouter = require('./store');
const orderRouter = require('./order');
const pageRouter = require('./page');
const addressRouter = require('./address');
const dibsRouter = require('./dibs');
const reviewRouter = require('./review');
const userRouter = require('./user');
const cartRouter = require('./cart');

const defaultRoutes = [
  {
    path: '/auth',
    route: authRouter,
  },
  {
    path: '/',
    route: storeRouter,
  },
  {
    path: '/',
    route: orderRouter,
  },
  {
    path: '/',
    route: pageRouter,
  },
  {
    path: '/',
    route: addressRouter,
  },
  {
    path: '/',
    route: dibsRouter,
  },
  {
    path: '/',
    route: reviewRouter,
  },
  {
    path: '/',
    route: userRouter,
  },
  {
    path: '/',
    route: cartRouter,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;
