import axiosInstance from './axiosInstance';

const register = (data) => axiosInstance.post('/auth/register', data);
const login = (data) => axiosInstance.post('/auth/authenticate', data);
const logout = () => axiosInstance.post('/auth/logout');
const getCurrentUser = () => axiosInstance.get('/auth/getCurrentUser');

export default { register, login, logout, getCurrentUser };
