import axios from 'axios';

const API_URL = 'http://localhost:3001';
const RECIPIENTS_URL = `${API_URL}/recipients`;
const ADDRESS_VALIDATION_URL = 'http://www.yaddress.net/api/Address';

export function createRecipient(recipient) {
  return axios.post(RECIPIENTS_URL, recipient);
}

export function getRecipientsList() {
  return axios.get(RECIPIENTS_URL);
}

export function deleteRecippient(id) {
  return axios.delete(`${RECIPIENTS_URL}/${id}`);
}

export function validateAddress(recipient) {
  const config = {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      //'Access-Control-Allow-Origin': '*'
    }
  }
  const addressLine1 = `AddressLine1=${encodeURIComponent(recipient.address)}`;
  const addressLine2 = `AddressLine2=${encodeURIComponent(recipient.city)},${encodeURIComponent(recipient.zipCode)}`;
  return axios.get(`${ADDRESS_VALIDATION_URL}?${addressLine1}&${addressLine2}&UserKey=`, config);
}