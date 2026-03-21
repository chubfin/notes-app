const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Note = sequelize.define("Note", {
  judul: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  isi: {
    type: DataTypes.TEXT,
  },
});

module.exports = Note;