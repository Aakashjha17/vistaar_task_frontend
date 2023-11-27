import axios from 'axios'

const url = 'http://localhost:8000/api'

export const googleSignin = () => axios.get(`${url}/google`)

export const fetchActiveCustomer = () => axios.get(`${url}/customer/active`)

export const fetchTransactionsByAccount = async(account_id) => axios.post(`${url}/transactions/getTransactionsByAccount`,account_id)