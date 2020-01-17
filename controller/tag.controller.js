const {Op} = require('sequelize')
const Tag = require('../interactor/tag.interactor')
const _BASE_CONTROLLER = require('./_BASE_CONTROLLER')

class TagController extends _BASE_CONTROLLER {
    constructor() {
        super({
            model: Tag,
            requireFields: [
                'name',
            ],
            querySet: queries => [{
                name: 'id',
                value: queries.id,
                type: 'number'
            }, {
                name: 'name',
                value: queries.title,
                type: 'string'
            },{
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

module.exports = new TagController()