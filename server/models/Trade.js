const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection.js');

class Trade extends Model {};

Trade.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        date: {
            type: DataTypes.STRING,
            allowNull: false
        },
        profit: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        prem: {
            type: DataTypes.DECIMAL(10,2),
            allowNull: false
        },
        trades: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'user',
                key: 'id'
            }
        }
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'trades'
    }
);

module.exports = Trade;