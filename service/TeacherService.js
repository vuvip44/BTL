const Teacher=require("../models/Teacher");
const User=require("../models/User");
const bcrypt=require("bcryptjs");

class TeacherService{
    async getAllTeacher({page=1,pageSize=10,classFilter}){
        const whereClause={};
        if(classFilter){
            whereClause.class=classFilter;
        }
        const {count,rows}=await Teacher.findAndCountAll({
            where:whereClause,
            include:{model:User,attributes:["fullName","email","username"]},
            limit:pageSize,
            offset:(page-1)*pageSize,
        });
        return {
            parents: rows,
            total: count,
            totalPages: Math.ceil(count / pageSize),
            currentPage: page,
          };
    };

    async getTeacherById(id) {
        return await Teacher.findOne({
            where:{userId:id},
            include:{model:User,attributes:["fullName", "email", "username"]},
        });
    }

    async createTeacher({fullName,email,username,password,phoneNumber}){
        const hashesPassword=await bcrypt.hash(password,10);
        const newUser=await User.create({
            fullName,
            email,
            username,
            password:hashesPassword,
            roleId:4,
        });

        const newTeacher=await Teacher.create({
            userId:newUser.id,
            phoneNumber
        });
        return await Teacher.findOne({
            where:{userId:newUser.id},
            include:{model:User,attributes:["fullName", "email", "username"]},
        });
    }

    async updateTeacher(id,updateData){
        const teacher=await Teacher.findOne({where:{userId:id}});
        if(!teacher)return null;
        if(updateData.fullName||updateData.email||updateData.username){
            await User.update(updateData,{where:{id}});
        }
        await Teacher.update(updateData);
        return await Teacher.findOne({
            where:{userId:id},
            include:{model:User,attributes:["fullName", "email", "username"]},
        });
    }

    async deleteTeacher(id){
        const teacher=await Teacher.findOne({where:{userId:id}});
        if(!teacher)return null;
        await Teacher.destroy({where:{userId:id}});
        await User.destroy({where:{id}});
        return true;
    }
}
module.exports=new TeacherService();