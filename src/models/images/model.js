const { DataTypes } = require("sequelize");
const sequelize = require("../../db/connection");

const Image = sequelize.define(
    "Image", {
        url: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
        },
        photographer: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
);

module.exports = Image;