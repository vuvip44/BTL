const Role = require('../models/Role');
async function createRole(name) {
  return await Role.create({ name });
}

async function getRoleById(id) {
  const role = await Role.findByPk(id);
    return role ? role.id : null;
}

async function getRoleByName(name) {
  const role = await Role.findOne({ where: { name } });
  return role ? role : null;
}
module.exports = { createRole, getRoleById,getRoleByName };