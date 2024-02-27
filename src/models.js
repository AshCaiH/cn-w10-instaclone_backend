const { DataTypes } = require("sequelize");
const sequelize = require("./db/connection");

// For the scope of the project, I've decided to keep all the modules
// in one file for the sake of simplicity.

module.exports.
User = sequelize.define("User", {
    username: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});


module.exports.
Like = sequelize.define( "Like", {});


module.exports.
Image = sequelize.define( "Image", {
    id: {
        primaryKey:true,
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
    },
    urlSmall: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
    },
    urlRegular: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
    },
    photographer: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});