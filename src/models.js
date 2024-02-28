import { DataTypes } from "sequelize";
import sequelize from "./db/connection.js";

// For the scope of the project, I've decided to keep all the modules
// in one file for the sake of simplicity.

export const User = sequelize.define("User", {
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


export const Like = sequelize.define( "Like", {});


export const Image = sequelize.define( "Image", {
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