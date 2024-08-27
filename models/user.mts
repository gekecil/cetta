import { env } from 'process'
import { Sequelize, DataTypes, Model } from 'sequelize'

const sequelize = new Sequelize({
    dialect: 'postgres',
    username: 'default',
    password: 'aylR8JFSL3mC',
    database: 'verceldb'
})

class User extends Model {
    declare id: number
    declare username: string
    declare password: string
}

User.init(
    {
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
    },
    {
        sequelize,
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: false
    }
)

export default User
