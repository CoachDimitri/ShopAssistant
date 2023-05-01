const { Type } = require('../models/models')
const ApiError = require('../error/ApiError');

class TypeController {

    async create(req, res, next) {
        try {
            const { name } = req.body
            const type = await Type.create({ name })
            return res.json(type)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async getAll(req, res, next) {
        try {
            const types = await Type.findAll()
            return res.json(types)
        } catch (e) {
            next(ApiError.internal(e.message))
        }
    }

    async delete(req, res, next) {
        const { id } = req.params;
        try {
            const type = await Type.findOne({ where: { id } });
            await type.destroy();
            return res.json({ message: 'Тип успешно удален' });
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async update(req, res, next) {
        const { id } = req.params;
        const { name } = req.body;
        try {
            const type = await Type.findOne({ where: { id } });
            if (!type) {
                throw ApiError.badRequest('Тип с таким id не найден');
            }
            type.name = name;
            await type.save();
            return res.json(type);
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }

    async getByName(req, res, next) {
        const { name } = req.params;
        try {
            const type = await Type.findOne({ where: { name } });
            if (!type) {
                throw ApiError('Тип не найден');
            }
            return res.json(type);
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }
}

module.exports = new TypeController()
