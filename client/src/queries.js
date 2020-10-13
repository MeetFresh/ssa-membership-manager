import axios from 'axios';

export const createUser = user => axios.post('/api/user', user);
export const updateUser = user => axios.put('./api/user', user);
