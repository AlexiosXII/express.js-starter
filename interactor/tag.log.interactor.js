const {TagLog} = require('../model')
const {softDelete} = require('../util/db.soft.delete')

// override method
TagLog.softDelete = async (targetID) => {
    return softDelete(TagLog.tableName, targetID)
}

module.exports = TagLog