const {Op} = require('sequelize')
const Category = require('../interactor/category.interactor')
const News = require('../interactor/news.interactor')
const TagLog = require('../interactor/tag.log.interactor')
const Tag = require('../interactor/tag.interactor')
const _BASE_CONTROLLER = require('./_BASE_CONTROLLER')
const {queryChecker} = require('../util/query.checker')

class NewsController extends _BASE_CONTROLLER {
    constructor() {
        super({
            model: News,
            requireFields: [
                'title',
                'description',
                // 'publish_date',
                // 'on_publish',
                'category_id',
                'tags',
            ],
            querySet: queries => [{
                name: 'id',
                value: queries.id,
                type: 'number'
            }, {
                name: 'category_id',
                value: queries.category_id,
                type: 'number'
            }, {
                name: 'title',
                value: queries.title,
                type: 'string'
            }, {
                name: 'description',
                value: queries.description,
                type: 'string'
            }, {
                name: 'tags',
                value: queries.tags,
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
            }],
            include: [
                {model: Category},
                {
                    model: TagLog,
                    include: [
                        {model: Tag},

                    ]
                },
            ]
        })
        // override constructor
        this.create = this.create.bind(this)
    }

    async create(req, res, next) {
        try {
            let {
                validQuery,
            } = await queryChecker(this.querySet(req.body), this.requireFields)
            validQuery.tags = validQuery.tags.split('|')
            let result = await this.model.create(validQuery)
            let tags = await Tag.findAll()
            Promise.map(validQuery.tags, async tagInput => {
                let tagID = null
                tags.map(tagLog => {
                    if (tagLog.name == tagInput){
                        tagID = tagLog.id
                    }
                })
                if (!tagID) {
                    let tag = await Tag.create({
                        name: tagInput
                    }) 
                    tagID = tag.id
                }
                TagLog.create({
                    news_tag_id: result.id,
                    tag_id: tagID,
                })
            })
            res.status(200).send(result)
        } catch (error) {
            next(error)
        }
    }

    // override method
}

module.exports = new NewsController()