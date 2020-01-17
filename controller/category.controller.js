const {Op} = require('sequelize')
const Category = require('../interactor/category.interactor')
const _BASE_CONTROLLER = require('./_BASE_CONTROLLER')

class CategoryController extends _BASE_CONTROLLER {
    constructor() {
        super({
            model: Category,
            requireFields: [
                'name',
                'publish_date',
                'on_publish',
            ],
            querySet: queries => [{
                name: 'id',
                value: queries.id,
                type: 'number'
            }, {
                name: 'name',
                value: queries.name,
                type: 'string'
            }, {
                name: 'publish_date',
                value: queries.publish_date ? queries.publish_date.split('|')[0] : null,
                type: 'date',
                operator: Op[queries.publish_date ? queries.publish_date.split('|')[1] || 'eq' : null]
            }, {
                name: 'on_publish',
                value: queries.on_publish,
                type: 'boolean'
            }, {
                name: 'isActive',
                value: queries.isActive,
                type: 'boolean'
            }, {
                name: 'offset',
                value: queries.offset,
                type: 'offset'
            }, {
                name: 'limit',
                value: queries.limit,
                type: 'limit'
            }]
        })
        // override constructor
    }
    // override method
}

module.exports = new CategoryController()