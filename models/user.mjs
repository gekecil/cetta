import pg from 'pg';
import { Sequelize, DataTypes, Model } from 'sequelize';
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
class User extends Model {
}
User.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    username: {
        type: DataTypes.CHAR
    },
    password: {
        type: DataTypes.CHAR
    }
}, {
    sequelize,
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: false
});
export default User;
