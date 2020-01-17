const sequelize = require('../model/_DB_CONNECTOR')

module.exports.softDelete = async (tableName, targetID) => {
    return new Promise(async (resolve, reject) => {
        try {
            let [results, metadata] = await sequelize.query(
            `
                UPDATE ${tableName}
                SET isActive = 0
                WHERE id = ${targetID}
            `)
            resolve({
                isDeleted: results["affectedRows"] == 1
            })
        } catch (error) {
            reject(error)
        }
    })
}
