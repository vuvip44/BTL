const Driver=require("../models/Driver");
const User=require("../models/User");
const bcrypt=require("bcryptjs");

class DriverService{
    async getAllDriver({page=1,pageSize=10,classFilter}){
        const whereClause={};
        if(classFilter){
            whereClause.class=classFilter;
        }
        const {count,rows}=await Driver.findAndCountAll({
            where:whereClause,
            include:{model:User,attributes:["fullName","email","username"]},
            limit:pageSize,
            offset:(page-1)*pageSize,
        });
        return {
            drivers: rows,
            total: count,
            totalPages: Math.ceil(count / pageSize),
            currentPage: page,
          };
    };

    async getDriverById(id) {
        return await Driver.findOne({
            where:{userId:id},
            include:{model:User,attributes:["fullName", "email", "username"]},
        });
    }

    async createDriver({fullName,email,username,password,phoneNumber}){
        const hashesPassword=await bcrypt.hash(password,10);
        const newUser=await User.create({
            fullName,
            email,
            username,
            password:hashesPassword,
            roleId:4,
        });

        const newDriver=await Teacher.create({
            userId:newUser.id,
            phoneNumber
        });
        return await Driver.findOne({
            where:{userId:newUser.id},
            include:{model:User,attributes:["fullName", "email", "username"]},
        });
    }

    async updateDriver(id,updateData){
        const driver=await Driver.findOne({where:{userId:id}});
        if(!driver)return null;
        if(updateData.fullName||updateData.email||updateData.username){
            await User.update(updateData,{where:{id}});
        }
        await Driver.update(updateData);
        return await Driver.findOne({
            where:{userId:id},
            include:{model:User,attributes:["fullName", "email", "username"]},
        });
    }

    async deleteDriver(id){
        const driver=await Teacher.findOne({where:{userId:id}});
        if(!driver)return null;
        await Driver.destroy({where:{userId:id}});
        await User.destroy({where:{id}});
        return true;
    }
}
module.exports=new DriverService();