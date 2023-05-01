import ApiError from "../error/ApiError";
import {BasketDevice} from "../models/models";

class BasketDeviceController {
    async create(req, res, next) {
        try {
            const { basketId, deviceId, count, price } = req.body;
            const basketDevice = await BasketDevice.create({ basketId, deviceId, count, price });
            return res.json(basketDevice);
        } catch (error) {
            next(ApiError.badRequest(error.message));
        }
    }

    async delete(req, res, next) {
        const { id } = req.params;
        try {
            const basketDevice = await BasketDevice.findOne({ where: { id } });
            await basketDevice.destroy();
            return res.json({ message: 'Товар из корзины успешно удален' });
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }
}

module.exports = new BasketDeviceController();