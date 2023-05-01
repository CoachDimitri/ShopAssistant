import { $authHost, $host } from './index';


// добавляем экспорт editBrand
export const editBrand = async (oldBrandName, newBrandName) => {
    const { data } = await $authHost.put(`api/brand/${oldBrandName}/${newBrandName}`);
    return data;
};

// добавляем экспорт editType
export const editType = async (type) => {
    const { data } = await $authHost.put(`api/type/${type.id}`, type);
    return data;
};

export const createType = async (type) => {
    const { data } = await $authHost.post('api/type', type);
    return data;
};

export const fetchTypes = async () => {
    const { data } = await $host.get('api/type');
    return data;
};

export const deleteType = async (id) => {
    const { data } = await $authHost.delete(`api/type/${id}`);
    return data;
};

export const updateType = async (type) => {
    const { data } = await $authHost.put('api/type', type);
    return data;
};

export const createBrand = async (brand) => {
    const { data } = await $authHost.post('api/brand', brand);
    return data;
};

export const findBrandByName = async (name) => {
    const { data } = await $host.get('api/brand', { params: { name } });
    return data;
};

export const fetchBrands = async () => {
    const { data } = await $host.get('api/brand');
    return data;
};

export const deleteBrand = async (id) => {
    const { data } = await $authHost.delete(`api/brand/${id}`);
    return data;
};

export const createDevice = async (device) => {
    const { data } = await $authHost.post('api/device', device);
    return data;
};

export const deleteDevice = async (id) => {
    const response = await $authHost.delete(`api/device/${id}`);
    return response.data;
};

export const fetchDevices = async (typeId, brandId, page, limit = 5) => {
    const { data } = await $host.get('api/device', {
        params: {
            typeId,
            brandId,
            page,
            limit,
        },
    });
    return data;
};

export const fetchOneDevice = async (id) => {
    const { data } = await $host.get('api/device/' + id);
    return data;
};

export const getAllTypes = async () => {
    const { data } = await $host.get('api/type');
    return data;
};

export const listBasket = []
export const addToBasketList =  (id) => {
    listBasket.push(id)
}



