const {Tag} = require('../model')
const {softDelete} = require('../util/db.soft.delete')

// override method
Tag.softDelete = async (targetID) => {
    return softDelete(Tag.tableName, targetID)
}

module.exports = Tag