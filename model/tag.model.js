const Sequelize = require('sequelize')
const sequelize = require('./_DB_CONNECTOR')
const tableName = 'tbl_tag'
const Tag = sequelize.define(
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
        isActive: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: true,
        },
    }, {
        tableName
    },
)
Tag.tableName = tableName

module.exports = Tag