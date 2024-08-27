"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const process_1 = require("process");
const sequelize_1 = require("sequelize");
const sequelize = new sequelize_1.Sequelize({
    dialect: 'postgres',
    username: process_1.env['DB_USERNAME'],
    password: process_1.env['DB_PASSWORD'],
    database: process_1.env['DB_DATABASENAME']
});
class User extends sequelize_1.Model {
}
User.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    username: {
        type: sequelize_1.DataTypes.CHAR
    },
    password: {
        type: sequelize_1.DataTypes.CHAR
    }
}, {
    sequelize,
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: false
});
exports.default = User;
