const parentService = require("../service/ParentService");


class ParentController{
    async getAllParent(req,res){
        try {
            const {page,pageSize,classFilter}=req.query;
            const parent=await parentService.getAllParent({page,pageSize,classFilter});
            res.json(parent);
        } catch (error) {
            res.status(500).json({message:error.message});
        }
    }

    async createParent(req,res){
        try {
            const newParent=await parentService.createParent(req.body);
            res.status(201).json(newParent);
        } catch (error) {
            res.status(500).json({message:error.message});
        }
    }

    async getParentById(req,res){
        try {
            const parent=await parentService.getParentById(req.params.id);
            if(!parent){
                return res.status(404).json({message:"Parent not found"});
            }
            res.json(parent);
        } catch (error) {
            res.status(500).json({message:error.message});
        }
    }

    async updateParent(req,res){
        try {
            const updateParent=await parentService.updateParent(req.params.id,req.body);
            if(!updateParent){
                return res.status(404).json({message:"Parent not found"});
            }
            res.json(updateParent);
        } catch (error) {
            res.status(500).json({message:error.message});
        }
    }

    async deleteParent(req,res){
        try {
            const deleted=await parentService.deleteParent(req.params.id);
            if(!deleted){
                return res.status(404).json({message:"Parent not found"});
            }
            res.json({message:"Delete successfully"});
        } catch (error) {
            res.status(500).json({message:error.message});
        }
    }
}
module.exports=new ParentController();