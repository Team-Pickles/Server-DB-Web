const docsRoute = require('./docs.controller');
const mapRoute = require('./map.controller');
const userRoute = require('./user.controller');
const express = require('express');
const router = express.Router();

const defaultRoutes = [
  {
    path: '/map',
    route: mapRoute,
  },
  {
    path: '/user',
    route: userRoute,
  },
];

const devRoutes = [
  // routes available only in development mode
  {
    path: '/docs',
    route: docsRoute,
  },
];

devRoutes.forEach((route) => {
  router.use(route.path,route.route);
});

defaultRoutes.forEach((route) => {
  router.use(route.path,route.route);
});

module.exports = router;