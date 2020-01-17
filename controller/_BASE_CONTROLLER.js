const {queryChecker} = require('../util/query.checker')

module.exports = class _BASE_CONTROLLER {

    constructor({
        model,
        requireFields,
        querySet,
        include
    }) {
        this.model = model
        this.requireFields = requireFields
        this.querySet = querySet
        this.include = include || null

        this.create = this.create.bind(this)
        this.update = this.update.bind(this)
        this.deleteByID = this.deleteByID.bind(this)
        this.getByID = this.getByID.bind(this)
        this.getAll = this.getAll.bind(this)
    }

    async create(req, res, next) {
        try {
            let {
                validQuery,
            } = await queryChecker(this.querySet(req.body), this.requireFields)
            let result = await this.model.create(validQuery)
            res.status(200).send(result)
        } catch (error) {
            next(error)
        }
    }

    async update(req, res, next) {
        try {
            let {
                validQuery,
            } = await queryChecker(this.querySet(req.body), ['id'])
            let result = await this.model.update(validQuery, {
                where: {
                    id: validQuery.id
                },
            })
            res.status(200).send({
                isUpdated: !!result[0]
            })
        } catch (error) {
            next(error)
        }
    }

    async deleteByID(req, res, next) {
        try {
            let {
                validQuery,
            } = await queryChecker(this.querySet(req.params))
            let result = await this.model.softDelete(validQuery.id)
            res.status(200).send(result)
        } catch (error) {
            next(error)
        }
    }

    async getByID(req, res, next) {
        try {
            let {
                validQuery,
            } = await queryChecker(this.querySet(req.params))
            let result = await this.model.findOne({
                where: {
                    ...validQuery,
                    isActive: true,
                },
                include: this.include
            })
            if (result) {
                res.status(200).send(result)
            } else {
                res.status(204).send()
            }
        } catch (error) {
            next(error)
        }
    }

    async getAll(req, res, next) {
        try {
            let {
                validOption,
                validQuery,
            } = await queryChecker(this.querySet(req.query))
            let result = await this.model.findAll({
                where: {
                    ...validQuery,
                    isActive: true,
                },
                ...validOption,
                include: this.include
            })
            if (result.length > 0) {
                res.status(200).send(result)
            } else {
                res.status(204).send()
            }
        } catch (error) {
            next(error)
        }
    }
}