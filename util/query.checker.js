const validator = require('validator')
const dateFormat = require('dateformat')

module.exports.queryChecker = async (queries, requireFields = []) => {
    return new Promise((resolve, reject) => {
        try {
            let validOption = {}
            let validQuery = {}
            let inValidQuery = []
            let allField = []
            let isCheckRequireFields = requireFields.length > 0
            // [START] queries structure
            // queries = [
            //     {
            //         value,
            //         name,
            //         type: 'string',
            //         operator // optional
            //     },
            //     ...
            // ]
            // [END] queries structure
            queries.filter(query => !!query.value).map(query => {
                if (isCheckRequireFields) allField.push(query.name)
                let isValid = false
                switch (query.type) {
                    case 'string':
                        if (typeof query.value == 'string'){
                            isValid = true
                        }
                        break
                    case 'number':
                        if (validator.isNumeric(query.value)){
                            query.value = parseInt(query.value)
                            isValid = true
                        }
                        break
                    case 'boolean':
                        if (validator.isBoolean(query.value)) {
                            query.value = JSON.parse(query.value)
                            isValid = true
                        }
                        break
                    case 'date':
                        if (validator.toDate(query.value)){
                            isValid = true
                            query.value = dateFormat(new Date(query.value), 'yyyy-mm-dd')
                        }
                        break
                    case 'offset':
                    case 'limit':
                        if (validator.isNumeric(query.value)){
                            query.value = parseInt(query.value)
                            isValid = 'option'
                        }
                        break
                    default:
                        break
                }
                switch (isValid) {
                    case true:
                        if (query.operator) {
                            validQuery = {
                                ...validQuery,
                                [query.name]: {
                                    [query.operator]: query.value
                                }
                            }
                        } else {
                            validQuery = {
                                ...validQuery,
                                [query.name]: query.value
                            }
                        }
                        break
                    case false:
                        inValidQuery.push(`Invalid field : ${query.name} (${query.type})`)
                        break
                    case 'option':
                        validOption = {
                            ...validOption,
                            [query.type]: query.value
                        }
                        break
                    default:
                        break
                }
            }) // queries.filter(query => !!query.value).map
            if (isCheckRequireFields) {
                requireFields.map(required => {
                    let filtered = allField.filter(field => field == required)
                    if (filtered.length == 0) {
                        inValidQuery.push(`Missing field : ${required}`)
                    }
                })
            }
            if (inValidQuery.length > 0) {
                let error = new Error('INVALID QUERY')
                error.result = inValidQuery
                error.status = 400
                throw error
            }
            resolve({
                validOption,
                validQuery
            })
        } catch (error) {
            reject(error)
        }
    })
}