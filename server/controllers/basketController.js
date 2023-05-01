const ApiError = require("../error/ApiError");
const {Basket, BasketDevice} = require('../models/models');

class BasketController {
    async create(req, res, next) {
        try {
            const { items, totalPrice, itemCount, userId } = req.body;
            const basket = await Basket.create({ totalPrice, itemCount, userId });

            // Создаем BasketDevice для каждого элемента items
            for (let i = 0; i < items.length; i++) {
                const { productId, count, price } = items[i];
                await BasketDevice.create({ basketId: basket.id, deviceId: productId, count, price });
            }

            return res.json(basket);
        } catch (error) {
            next(ApiError.badRequest(error.message));
        }
    }

    async delete(req, res, next) {
        const { id } = req.params;
        try {
            const basket = await Basket.findOne({ where: { id } });
            await basket.destroy();
            return res.json({ message: 'Корзина успешно удалена' });
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }
}

module.exports = new BasketController();
