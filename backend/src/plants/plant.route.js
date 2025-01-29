const express = require('express');

const { postAPlant, getAllPlants, getSinglePlant, UpdatePlant, deleteAPlant } = require('./plant.controller');
const verifyAdminToken = require('../middleware/verifyAdminToken');

const router = express.Router();

//frontend => backend => controller => plant schema => database => send data to server => back to the frontend
//post when we need to submit something from frontend to db
//get when we need something from db
//put/patch when we edit or update data
//delete = when we need to delete

router.post('/create-plant', verifyAdminToken, postAPlant);

//get all plants
router.get('/', getAllPlants);

//single plant endpoint
router.get('/:id', getSinglePlant);

//update a plant endpoint
router.put('/edit/:id', UpdatePlant);

//delete
router.delete('/:id', deleteAPlant);

module.exports = router;
