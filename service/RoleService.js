const Role = require('../models/Role');
async function createRole(name) {
  return await Role.create({ name });
}

async function getRoleById(id) {
  return await Role.findByPk(id);
}

async function getRoleByName(name) {
    return await Role.findOne({ where: { name } });
}
module.exports = { createRole, getRoleById };