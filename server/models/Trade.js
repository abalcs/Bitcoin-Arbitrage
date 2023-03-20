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
            // allowNull: false
        },
        revenue: {
            type: DataTypes.INTEGER,
            // allowNull: false
        },
        profit: {
            type: DataTypes.INTEGER,
            // allowNull: false
        },
        prem: {
            type: DataTypes.DECIMAL,
            // allowNull: false
        },
        trades: {
            type: DataTypes.INTEGER,
            allowNull: true
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