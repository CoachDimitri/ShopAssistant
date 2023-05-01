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
        let {id, newBrandName} = req.body
        console.log(id)
        console.log(newBrandName)
        console.log("++++++++++++++++")
        const [updatedCount, [updatedBrand]] = await Brand.update(
            {newBrandName},
            {where: {id}, returning: true}
        );
        console.log(updatedCount)
        console.log(updatedBrand)
        // if (updatedCount !== 1) {
        //     return res.status(404).json({message: 'Brand not found'});
        // } else {
        //     return res.json(updatedBrand);
        // }
        res.json("dwadwadwa")
    }

}

module.exports = new BrandController()
