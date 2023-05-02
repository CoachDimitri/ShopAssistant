const {Brand} = require('../models/models')
const ApiError = require('../error/ApiError');

class BrandController {
    async create(req, res) {
        const {name} = req.body
        const brand = await Brand.create({name})
        return res.json(brand)
    }

    async getAll(req, res) {
        const brands = await Brand.findAll()
        return res.json(brands)
    }

    async delete(req, res) {
        const {id} = req.params
        console.log(id)
        const deletedBrand = await Brand.destroy({where: {id}})
        if (!deletedBrand) {
            throw ApiError.badRequest(`Брэнд не найден`)
        }
        return res.json(deletedBrand)
    }

    async edit(req, res) {
        const { id, newBrandName } = req.body;

        const [_, [brand]] = await Brand.update(
            { name: newBrandName },
            { where: { id }, individualHooks: true, returning: true }
        );

        return res.json(brand);
    }

}

module.exports = new BrandController()
