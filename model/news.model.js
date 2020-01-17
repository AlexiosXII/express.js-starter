const Sequelize = require('sequelize')
const sequelize = require('./_DB_CONNECTOR')
const tableName = 'tbl_news'
const News = sequelize.define(
    tableName, {
        id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        author_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            defaultValue: 0,
        },
        title: {
            type: Sequelize.STRING(255),
            allowNull: false,
        },
        description: {
            type: Sequelize.TEXT,
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
News.tableName = tableName

module.exports = News