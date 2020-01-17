const Sequelize = require('sequelize')
const sequelize = require('./_DB_CONNECTOR')
const tableName = 'tbl_category'
const Category = sequelize.define(
    tableName, {
        id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: Sequelize.STRING(255),
            allowNull: false,
        },
        publish_date: {
            type: Sequelize.DATEONLY,
            allowNull: true,
        },
        on_publish: {
            type: Sequelize.BOOLEAN,
            allowNull: true,
            defaultValue: true,
        },
        isActive: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: true,
        },
    }, {
        tableName
    },
)
Category.tableName = tableName

module.exports = Category