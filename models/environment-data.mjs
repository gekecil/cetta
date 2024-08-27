import pg from 'pg';
import { Sequelize, DataTypes, Model } from 'sequelize';
import User from './user.mjs';
const sequelize = new Sequelize({
    dialect: 'postgres',
    dialectModule: pg,
    host: 'ep-icy-king-a4vexl6b.us-east-1.aws.neon.tech',
    username: 'default',
    password: 'aylR8JFSL3mC',
    database: 'verceldb',
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false
        }
    },
});
class EnvironmentData extends Model {
}
EnvironmentData.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    place: {
        type: DataTypes.CHAR
    },
    unit: {
        type: DataTypes.CHAR
    },
    value: {
        type: DataTypes.CHAR
    }
}, {
    sequelize,
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
});
EnvironmentData.belongsTo(User, {
    foreignKey: 'user_id'
});
export default EnvironmentData;
