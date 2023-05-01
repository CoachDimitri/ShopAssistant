import { $authHost, $host } from "./index";
import jwt_decode from "jwt-decode";

export const registration = async (email, password) => {
    const { data } = await $host.post("api/user/registration", {
        email,
        password,
        role: "ADMIN",
    });
    localStorage.setItem("token", data.token);
    return jwt_decode(data.token);
};

export const login = async (email, password) => {
    const { data } = await $host.post("api/user/login", { email, password });
    localStorage.setItem("token", data.token);
    return jwt_decode(data.token);
};

export const check = async () => {
    const { data } = await $authHost.get("api/user/auth");
    localStorage.setItem("token", data.token);
    return jwt_decode(data.token);
};

export const createUser = async (user) => {
    const { data } = await $authHost.post("api/user", user);
    return data;
};

export const fetchUsers = async () => {
    const { data } = await $authHost.get("api/user");
    return data;
};

export const updateUser = async (id, user) => {
    const { data } = await $authHost.put(`api/user/${id}`, user);
    return data;
};

export const deleteUser = async (id) => {
    const { data } = await $authHost.delete(`api/user/${id}`);
    return data;
};


