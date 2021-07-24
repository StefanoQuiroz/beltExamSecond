const express = require('express');
const router = express();
const {findPyrate, findSinglePyrate, createPyrate, updatePyrate, deletePyrate} = require('../controllers/pyrates.controller')
const { authenticate } = require('../config/jwt.config');

/* router.get(`/pryvate/`, authenticate, findPryvate);
router.get(`/pryvate/:id`, authenticate, findSinglePryvate);
router.post(`/pryvate/new`, authenticate, createPryvate);
router.put(`/pryvate/update/:id`, authenticate, updatePryvate);
router.delete(`/pryvate/delete/:id`, authenticate, deletePryvate); */

/* Esto borrar solo prueba */
router.get(`/pyrate`, authenticate, findPyrate);
router.get(`/pyrate/:id`, authenticate, findSinglePyrate);
router.post(`/pyrate/new`, authenticate, createPyrate);
router.put(`/pyrate/update/:id`, authenticate, updatePyrate);
router.delete(`/pyrate/delete/:id`, authenticate, deletePyrate);

module.exports = router;