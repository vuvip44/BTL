const RoleService = require('../service/RoleService');

exports.createRole = async (req, res) => {
    try{
        const { name } = req.body;
        const existRole = RoleService.getRoleByName(name);
        if(!existRole){
            return res.status(400).json({ message: 'Role đã tồn tại' });
        }
        const role = await RoleService.createRole(name);
        res.status(201).json({ message: 'Role created successfully', role });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
