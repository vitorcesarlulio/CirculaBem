import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_BASE_URL = 'http://192.168.11.7:5159/api';

const apiClient = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});

apiClient.interceptors.request.use(async (config) => {
    const token = await AsyncStorage.getItem('token'); // Certifique-se de que o nome do token está correto
    if (token) {
        config.headers.Authorization = `${token}`;
    }
    return config;
}, error => {
    return Promise.reject(error);
});

export const registerUser = async (userData) => {
    try {
        const response = await apiClient.post('/User', userData);
        return response.data;
    } catch (error) {
        console.error('Erro ao registrar usuário:', error);
        throw error;
    }
};

export const authenticateUser = async (credentials) => {
    try {
        const response = await apiClient.post('/Authentication/authenticate', credentials);
        const token = response.data.token;
        const registrationNumber = response.data.registrationNumber;
        await AsyncStorage.setItem('token', token);
        await AsyncStorage.setItem('registrationNumber', registrationNumber);
        return response.data;
    } catch (error) {
        console.error('Erro ao autenticar usuário:', error);
        throw error;
    }
};

export const fetchCategories = async () => {
    try {
        const response = await apiClient.get('/Category');
        return response.data;
    } catch (error) {
        console.error('Erro ao buscar categorias:', error);
        throw error;
    }
};

export const fetchProducts = async () => {
    try {
        const response = await apiClient.get('/Product/');
        return response.data;
    } catch (error) {
        console.error('Erro ao buscar produtos:', error);
        throw error;
    }
};

export const fetchProductById = async (id) => {
    try {
        const response = await apiClient.get(`/Product/${id}`);
        return response.data;
    } catch (error) {
        console.error('Erro ao buscar detalhes do produto:', error);
        throw error;
    }
};

export const fetchUserById = async (id) => {
    try {
        console.log(id)
        const response = await apiClient.get(`/User/${id}`);
        return response.data;
    } catch (error) {
        console.error('Erro ao buscar detalhes do usuario:', error);
        throw error;
    }
};

export const fetchRentedDates = async (productId, startDate, endDate) => {
    try {
        const response = await apiClient.get(`/Rent/by-preoduct/${productId}?startDate=${startDate}&endDate=${endDate}`);
        return response.data;
    } catch (error) {
        console.error('Erro ao buscar datas alugadas:', error);
        throw error;
    }
};
