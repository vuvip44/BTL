
const studentService=require("../service/StudentService");

class StudentController{
    async getAllStudents(req,res){
        try {
            const {page,pageSize,classFilter}=req.query;
            const students=await studentService.getAllStudent({page,pageSize,classFilter});
            res.json(students);
        } catch (error) {
            res.status(500).json({message:error.message});
        }
    }

    async createStudent(req,res){
        try {
            const newStudent=await studentService.createStudent(req.body);
            res.status(201).json(newStudent);
        } catch (error) {
            res.status(500).json({message:error.message});
        }
    }

    async getStudentById(req,res){
        try {
            const student=await studentService.getStudentById(req.params.id);
            if(!student){
                return res.status(404).json({message:"Student not found"});
            }
            res.json(student);
        } catch (error) {
            res.status(500).json({message:error.message});
        }
    }

    async updateStudent(req,res){
        try {
            const updateStudent=await studentService.updateStudent(req.params.id,req.body);
            if(!updateStudent){
                return res.status(404).json({message:"Student not found"});
            }
            res.json(updateStudent);
        } catch (error) {
            res.status(500).json({message:error.message});
        }
    }

    async deleteStudent(req,res){
        try {
            const deleted=await studentService.deleteStudent(req.params.id);
            if(!deleted){
                return res.status(404).json({message:"Student not found"});
            }
            res.json({message:"Delete successfully"});
        } catch (error) {
            res.status(500).json({message:error.message});
        }
    }
}
module.exports=new StudentController();