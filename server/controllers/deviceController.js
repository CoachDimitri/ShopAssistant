const uuid = require('uuid')
const path = require('path');
const {Device, DeviceInfo} = require('../models/models')
const ApiError = require('../error/ApiError');

class DeviceController {
    async create(req, res, next) {
        try {
            let {name, price, brandId, typeId, info} = req.body
            const {img} = req.files
            let fileName = uuid.v4() + ".jpg"
            img.mv(path.resolve(__dirname, '..', 'static', fileName))
            const device = await Device.create({name, price, brandId, typeId, img: fileName});

            if (info) {
                info = JSON.parse(info)
                info.forEach(i =>
                    DeviceInfo.create({
                        title: i.title,
                        description: i.description,
                        deviceId: device.id
                    })
                )
            }

            return res.json(device)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async getAll(req, res) {
        let {brandId, typeId, limit, page} = req.query
        page = page || 1
        limit = limit || 9
        let offset = page * limit - limit
        let devices;
        if (!brandId && !typeId) {
            devices = await Device.findAndCountAll({limit, offset})
        }
        if (brandId && !typeId) {
            devices = await Device.findAndCountAll({where:{brandId}, limit, offset})
        }
        if (!brandId && typeId) {
            devices = await Device.findAndCountAll({where:{typeId}, limit, offset})
        }
        if (brandId && typeId) {
            devices = await Device.findAndCountAll({where:{typeId, brandId}, limit, offset})
        }
        return res.json(devices)
    }

    async getOne(req, res) {
        const {id} = req.params
        const device = await Device.findOne(
            {
                where: {id},
                include: [{model: DeviceInfo, as: 'info'}]
            },
        )
        return res.json(device)
    }

    async delete(req, res, next) {
        const {id} = req.params;
        try {
            const device = await Device.findOne({where: {id}});
            await device.destroy();
            return res.json({message: 'Устройство успешно удалено'});
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async update(req, res, next) {
        const { id } = req.params;
        const { name, price } = req.body;
        try {
            const device = await Device.findOne({ where: { id } });
            if (!device) {
                throw new Error(`Устройство с id ${id} не найдено`);
            }
            device.name = name;
            device.price = price;
            await device.save();
            return res.json({ message: 'Устройство успешно обновлено' });
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }


}

module.exports = new DeviceController();
