import axios from 'axios';

const API_URL = 'http://localhost:3001';
const RECIPIENTS_URL = `${API_URL}/recipients`

export function createRecipient(recipient) {
  return axios.post(RECIPIENTS_URL, recipient);
}

export function getRecipientsList() {
  return axios.get(RECIPIENTS_URL);
}

export function deleteRecippient(id) {
  return axios.delete(`${RECIPIENTS_URL}/${id}`);
}

