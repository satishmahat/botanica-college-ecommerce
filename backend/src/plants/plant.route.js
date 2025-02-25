import express from 'express';
import { 
    postAPlant, 
    getAllPlants, 
    getSinglePlant, 
    UpdatePlant, 
    deleteAPlant 
} from './plant.controller.js';
import verifyAdminToken from '../middleware/verifyAdminToken.js';

const router = express.Router();

// Frontend => Backend => Controller => Plant Schema => Database => Send data to server => Back to the frontend
// POST: Submit data from frontend to database
// GET: Retrieve data from database
// PUT/PATCH: Edit or update data
// DELETE: Remove data from database

router.post('/create-plant', verifyAdminToken, postAPlant);

// Get all plants
router.get('/', getAllPlants);

// Single plant endpoint
router.get('/:id', getSinglePlant);

// Update a plant endpoint
router.put('/edit/:id', UpdatePlant);

// Delete a plant
router.delete('/:id', deleteAPlant);

export default router;
