const ApiError = require("../error/ApiError");
const {Basket, BasketDevice, Type} = require('../models/models');

class BasketController {
    async create(req, res) {
        const {userId} = req.body;
        const newBasket = await Basket.create({userId});
        return res.json(newBasket);
    }
}
module.exports = new BasketController();
