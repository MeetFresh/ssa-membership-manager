import axios from 'axios';

export const loginUser = user => axios.post('/api/login', user);
export const logoutUser = () => axios.get('/api/logout');

export const getAllUsers = () => axios.get('/api/user/all');
export const getOneUser = id => axios.get('/api/user/' + id);
export const createUser = user => axios.post('/api/user', user);
export const updateUserProfile = user => axios.put('/api/user', user);
export const adminUpdateUserProfile = user => axios.put('/api/user/admin', user);
export const updateUserMembership = user => axios.put('/api/user/membership_update', user);