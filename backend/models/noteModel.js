const Note = require("../schema/Notes");

const findAll = async () => {
  return await Note.findAll();
};

const findById = async (id) => {
  return await Note.findByPk(id);
};

const create = async (data) => {
  return await Note.create(data);
};

const updateById = async (id, data) => {
  return await Note.update(data, {
    where: { id },
  });
};

const deleteById = async (id) => {
  return await Note.destroy({
    where: { id },
  });
};

module.exports = {
  findAll,
  findById,
  create,
  updateById,
  deleteById,
};