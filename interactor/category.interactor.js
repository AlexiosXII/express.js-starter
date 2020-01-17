const {Category} = require('../model')
const {softDelete} = require('../util/db.soft.delete')

// override method
Category.softDelete = async (targetID) => {
    return softDelete(Category.tableName, targetID)
}

module.exports = Category