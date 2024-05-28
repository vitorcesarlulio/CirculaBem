// src/services/api.js
import axios from 'axios';

const API_BASE_URL = 'http://192.168.11.7:5159/api';

const apiClient = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});

export const registerUser = async (userData) => {
    try {
        print(userData)
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
        return response.data;
    } catch (error) {
        console.error('Erro ao autenticar usuário:', error);
        throw error;
    }
};