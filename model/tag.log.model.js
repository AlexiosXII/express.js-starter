const Sequelize = require('sequelize')
const sequelize = require('./_DB_CONNECTOR')
const tableName = 'tbl_tag_log'
const TagLog = sequelize.define(
    tableName, {
        id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        target_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            defaultValue: 0,
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
TagLog.tableName = tableName

module.exports = TagLog