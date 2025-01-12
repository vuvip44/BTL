const RoleService = require('../service/RoleService');

const authorize = (roles) => {
    return (req,res,next)=>{
        const userRole=req.user?.role
        const role=RoleService.getRoleById(userRole);
        if(!roles==role){
            return res.status(403).json({message: 'Không có quyền truy cập'});
        }
        next();
    };
};
module.exports = authorize;