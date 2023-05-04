import ApiError from "../error/ApiError";
import {BasketDevice} from "../models/models";

class BasketDeviceController {
    async create(req, res, next) {
        try {
            const { basketId, deviceId, count} = req.body;
            const basketDevice = await BasketDevice.create({ basketId, deviceId, count});
            return res.json(basketDevice);
        } catch (error) {
            next(ApiError.badRequest(error.message));
        }
    }
}
module.exports = new BasketDeviceController();