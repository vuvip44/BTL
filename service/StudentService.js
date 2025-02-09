const Student=require("../models/Student");
const User=require("../models/User");
const bcrypt=require("bcryptjs");

class StudentService{
    async getAllStudent({page=1,pageSize=10,classFilter}){
        const whereClause={};
        if(classFilter){
            whereClause.class=classFilter;
        }
        const {count,rows}=await Student.findAndCountAll({
            where:whereClause,
            include:{model:User,attributes:["fullName","email","username"]},
            limit:pageSize,
            offset:(page-1)*pageSize,
        });
        return {
            students: rows,
            total: count,
            totalPages: Math.ceil(count / pageSize),
            currentPage: page,
          };
    };

    async getStudentById(id) {
        return await Student.findOne({
            where:{userId:id},
            include:{model:User,attributes:["fullName", "email", "username"]},
        });
    }

    
}