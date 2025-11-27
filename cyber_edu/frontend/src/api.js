import axios from 'axios';
const API = axios.create({ baseURL: process.env.VITE_API_URL || 'http://localhost:4000/api' });

export async function login(email, password) {
  return API.post('/auth/login', { email, password }).then(r => r.data);
}
export async function getLabs(token) {
  return API.get('/labs', { headers: { authorization: `Bearer ${token}` } }).then(r => r.data);
}
export async function getAssigned(token) {
  return API.get('/labs/assigned', { headers: { authorization: `Bearer ${token}` } }).then(r => r.data);
}
export async function adminStudents(token) {
  return API.get('/admin/students', { headers: { authorization: `Bearer ${token}` } }).then(r => r.data);
}
export async function adminAssign(token, emails, lab_key) {
  return API.post('/admin/assign', { emails, lab_key }, { headers: { authorization: `Bearer ${token}` } }).then(r => r.data);
}
