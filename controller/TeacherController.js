const teacherService = require("../service/TeacherService");


class TeacherController{
    async getAllTeacher(req,res){
        try {
            const {page,pageSize,classFilter}=req.query;
            const teachers=await teacherService.getAllTeacher({page,pageSize,classFilter});
            res.json(teachers);
        } catch (error) {
            res.status(500).json({message:error.message});
        }
    }

    async createTeacher(req,res){
        try {
            const newTeacher=await teacherService.createTeacher(req.body);
            res.status(201).json(newTeacher);
        } catch (error) {
            res.status(500).json({message:error.message});
        }
    }

    async getTeacherById(req,res){
        try {
            const teacher=await teacherService.getTeacherById(req.params.id);
            if(!teacher){
                return res.status(404).json({message:"Teacher not found"});
            }
            res.json(teacher);
        } catch (error) {
            res.status(500).json({message:error.message});
        }
    }

    async updateTeacher(req,res){
        try {
            const updateTeacher=await teacherService.updateTeacher(req.params.id,req.body);
            if(!updateTeacher){
                return res.status(404).json({message:"Teacher not found"});
            }
            res.json(updateTeacher);
        } catch (error) {
            res.status(500).json({message:error.message});
        }
    }

    async deleteTeacher(req,res){
        try {
            const deleted=await teacherService.deleteTeacher(req.params.id);
            if(!deleted){
                return res.status(404).json({message:"Teacher not found"});
            }
            res.json({message:"Delete successfully"});
        } catch (error) {
            res.status(500).json({message:error.message});
        }
    }
}
module.exports=new TeacherController();