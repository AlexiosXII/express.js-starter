const {News} = require('../model')
const {softDelete} = require('../util/db.soft.delete')
const sequelize = require('../model/_DB_CONNECTOR')

// override method
News.softDelete = async (targetID) => {
    return softDelete(News.tableName, targetID)
}

module.exports = News