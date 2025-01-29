const Plant = require('./plant.model');

//post a plant
const postAPlant = async(req,res) => {

    try{
        const newPlant = new Plant({...req.body});
        await newPlant.save();
        res.status(200).send({message: "Plant POSTED Successfully", plant: newPlant})
    }catch(error){
        console.error("Error Creating Plant", error);
        res.status(500).send({message: "Failed to create a Plant"})
    }
}

//get all plants
const getAllPlants = async(req, res) => {
    try{
        const plants = await Plant.find().sort({createdAt: -1})
        res.status(200).send(plants)

    }catch(error){
        console.error("Error Fetching Plants", error);
        res.status(500).send({message: "Failed to fetch Plants"})        
    }
}

//get single plant
const getSinglePlant = async (req,res) => {
    try{
        const {id} = req.params
        const plant = await Plant.findById(id)
        if(!plant){
            res.status(404).send({message: "Plant not found"})          
        }
        res.status(200).send(plant)

    }catch(error){
        console.error("Error Fetching Plant", error);
        res.status(500).send({message: "Failed to fetch Plant"})        
    }
}

//update a plant data
const UpdatePlant = async(req,res) => {
    try{
        const {id} = req.params
        const updatedPlant = await Plant.findByIdAndUpdate(id, req.body,{new:true})
        if(!updatedPlant){
            res.status(404).send({message: "Plant not found"})          
        }
        res.status(200).send({
            message: "Plant updated Successfully",
            plant: updatedPlant
        })

    }catch(error){
        console.error("Error Updating the Plant", error);
        res.status(500).send({message: "Failed to update Plant"})  
    }
}

//delete a plant
const deleteAPlant = async (req,res) => {
    try{
        const {id} = req.params
        const deletedPlant = await Plant.findByIdAndDelete(id)
        if(!deletedPlant){
            res.status(404).send({message: "Plant not found"})          
        }
        res.status(200).send({
            message: "Plant deleted Successfully",
            plant: deletedPlant
        })

    }catch(error){
        console.error("Error Deleting the Plant", error);
        res.status(500).send({message: "Failed to delete Plant"})        
    }
}

module.exports = {
    postAPlant,
    getAllPlants,
    getSinglePlant,
    UpdatePlant,
    deleteAPlant
}
