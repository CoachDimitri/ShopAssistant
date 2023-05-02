const {Type} = require('../models/models')
const ApiError = require('../error/ApiError');

class TypeController {
    async create(req, res) {
        const {name} = req.body
        const type = await Type.create({name})
        return res.json(type)
    }

    async getAll(req, res) {
        const types = await Type.findAll()
        return res.json(types)
    }

    async delete(req, res) {
        const {id} = req.params
        console.log(id)
        const deletedType = await Type.destroy({where: {id}})
        if (!deletedType) {
            throw ApiError.badRequest(`Брэнд не найден`)
        }
        return res.json(deletedType)
    }

    async edit(req, res) {
        const { id, newTypeName } = req.body;

        const [_, [type]] = await Type.update(
            { name: newTypeName },
            { where: { id }, individualHooks: true, returning: true }
        );

        return res.json(type);
    }

}

module.exports = new TypeController()
