"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const user_mjs_1 = __importDefault(require("./user.mjs"));
const sequelize = new sequelize_1.Sequelize({
    dialect: 'postgres',
    username: 'default',
    password: 'aylR8JFSL3mC',
    database: 'verceldb'
});
class EnvironmentData extends sequelize_1.Model {
}
EnvironmentData.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    place: {
        type: sequelize_1.DataTypes.CHAR
    },
    unit: {
        type: sequelize_1.DataTypes.CHAR
    },
    value: {
        type: sequelize_1.DataTypes.CHAR
    }
}, {
    sequelize,
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
});
EnvironmentData.belongsTo(user_mjs_1.default, {
    foreignKey: 'user_id'
});
exports.default = EnvironmentData;
