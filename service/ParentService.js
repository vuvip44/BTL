const Parent=require("../models/Parent");
const User=require("../models/User");
const bcrypt=require("bcryptjs");

class ParentService{
    async getAllParent({page=1,pageSize=10,classFilter}){
        const whereClause={};
        if(classFilter){
            whereClause.class=classFilter;
        }
        const {count,rows}=await Parent.findAndCountAll({
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

    async getParentById(id) {
        return await Parent.findOne({
            where:{userId:id},
            include:{model:User,attributes:["fullName", "email", "username"]},
        });
    }

    async createParent({fullName,email,username,password,phoneNumber}){
        const hashesPassword=await bcrypt.hash(password,10);
        const newUser=await User.create({
            fullName,
            email,
            username,
            password:hashesPassword,
            roleId:4,
        });

        const newParent=await Parent.create({
            userId:newUser.id,
            phoneNumber
        });
        return await Parent.findOne({
            where:{userId:newUser.id},
            include:{model:User,attributes:["fullName", "email", "username"]},
        });
    }

    async updateParent(id,updateData){
        const parent=await Parent.findOne({where:{userId:id}});
        if(!parent)return null;
        if(updateData.fullName||updateData.email||updateData.username){
            await User.update(updateData,{where:{id}});
        }
        await Parent.update(updateData);
        return await Parent.findOne({
            where:{userId:id},
            include:{model:User,attributes:["fullName", "email", "username"]},
        });
    }

    async deleteParent(id){
        const parent=await Parent.findOne({where:{userId:id}});
        if(!parent)return null;
        await Parent.destroy({where:{userId:id}});
        await User.destroy({where:{id}});
        return true;
    }
}
module.exports=new ParentService();