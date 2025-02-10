const Student=require("../models/Student");
const User=require("../models/User");
const bcrypt=require("bcryptjs");
const Parent=require("../models/Parent");

class StudentService{
    async getAllStudent({page=1,pageSize=10,classFilter}){
        const whereClause={};
        if(classFilter){
            whereClause.class=classFilter;
        }
        const {count,rows}=await Student.findAndCountAll({
            where:whereClause,
            include: [
                {
                  model: Parent,
                  include: [
                    {
                      model: User, // Nếu muốn lấy cả thông tin User của Parent
                      attributes: ["fullName", "email", "username"],
                    },
                  ],
                  attributes: ["userId","phoneNumber"], // Có thể thêm các trường của Parent
                },
                {
                  model: User, // Lấy thông tin User của Student
                  attributes: [ "fullName", "email", "username"],
                },
              ],
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
            include: [
                {
                  model: Parent,
                  include: [
                    {
                      model: User, // Nếu muốn lấy cả thông tin User của Parent
                      attributes: ["fullName", "email", "username"],
                    },
                  ],
                  attributes: ["userId","phoneNumber"], // Có thể thêm các trường của Parent
                },
                {
                  model: User, // Lấy thông tin User của Student
                  attributes: [ "fullName", "email", "username"],
                },
              ],
        });
    }

    async createStudent({fullName,email,username,password,dateOfBirth,classroom,parentId}){
        const hashesPassword=await bcrypt.hash(password,10);
        const newUser=await User.create({
            fullName,
            email,
            username,
            password:hashesPassword,
            roleId:4,
        });

        const newStudent=await Student.create({
            userId:newUser.id,
            dateOfBirth,
            classroom,
            parentId
        });

        
        return await Student.findOne({
            where:{userId:newUser.id},
            include: [
                {
                  model: Parent,
                  include: [
                    {
                      model: User, // Nếu muốn lấy cả thông tin User của Parent
                      attributes: ["fullName", "email", "username"],
                    },
                  ],
                  attributes: ["userId","phoneNumber"], // Có thể thêm các trường của Parent
                },
                {
                  model: User, // Lấy thông tin User của Student
                  attributes: [ "fullName", "email", "username"],
                },
              ],
        });
    }

    async updateStudent(id,updateData){
        const student=await Student.findOne({where:{userId:id}});
        if(!student)return null;
        if(updateData.fullName||updateData.email||updateData.username){
            await User.update(updateData,{where:{id}});
        }
        await student.update(updateData);
        return await Student.findOne({
            where:{userId:id},
            include: [
                {
                  model: Parent,
                  include: [
                    {
                      model: User, // Nếu muốn lấy cả thông tin User của Parent
                      attributes: ["fullName", "email", "username"],
                    },
                  ],
                  attributes: ["userId","phoneNumber"], // Có thể thêm các trường của Parent
                },
                {
                  model: User, // Lấy thông tin User của Student
                  attributes: [ "fullName", "email", "username"],
                },
              ],
        });
    }

    async deleteStudent(id){
        const student=await Student.findOne({where:{userId:id}});
        if(!student)return null;
        await Student.destroy({where:{userId:id}});
        await User.destroy({where:{id}});
        return true;
    }
}
module.exports=new StudentService();