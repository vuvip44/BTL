const driverService = require("../service/DriverService");


class DriverController{
    async getAllDriver(req,res){
        try {
            const {page,pageSize,classFilter}=req.query;
            const drivers=await driverService.getAllDriver({page,pageSize,classFilter});
            res.json(drivers);
        } catch (error) {
            res.status(500).json({message:error.message});
        }
    }

    async createDriver(req,res){
        try {
            const newDriver=await driverService.createDriver(req.body);
            res.status(201).json(newDriver);
        } catch (error) {
            res.status(500).json({message:error.message});
        }
    }

    async getDriverById(req,res){
        try {
            const driver=await driverService.getTeacherById(req.params.id);
            if(!driver){
                return res.status(404).json({message:"Driver not found"});
            }
            res.json(driver);
        } catch (error) {
            res.status(500).json({message:error.message});
        }
    }

    async updateDriver(req,res){
        try {
            const updateDriver=await driverService.updateDriver(req.params.id,req.body);
            if(!updateDriver){
                return res.status(404).json({message:"Driver not found"});
            }
            res.json(updateDriver);
        } catch (error) {
            res.status(500).json({message:error.message});
        }
    }

    async deleteDriver(req,res){
        try {
            const deleted=await driverService.deleteDriver(req.params.id);
            if(!deleted){
                return res.status(404).json({message:"Driver not found"});
            }
            res.json({message:"Delete successfully"});
        } catch (error) {
            res.status(500).json({message:error.message});
        }
    }
}
module.exports=new DriverController();