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
        const deletedBrand = await Brand.destroy({where: {id}})
        if (!deletedBrand) {
            throw ApiError.badRequest(`Брэнд не найден`)
        }
        return res.json(deletedBrand)
    }

    async edit(req, res) {
        const { oldBrandId, newBrandName } = req.body;
        try {
            const [updatedCount, [updatedBrand]] = await Brand.update(
                { newBrandName },
                { where: { oldBrandId }, returning: true }
            );

            if (updatedCount !== 1) {
                res.status(404).json({ message: 'Brand not found' });
            } else {
                res.json(updatedBrand);
            }
        } catch (error) {
            res.status(500).json({ message: 'Internal server error' });
        }
    }

}

module.exports = new BrandController()
