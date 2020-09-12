import axios from 'axios';

export const createTxn = txn => axios.post('/api/txn', txn);
export const updateTxn = txn => axios.put('./api/txn', txn);