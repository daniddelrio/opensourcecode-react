import axios from 'axios';
import { api } from "./";

export const getStudents = () => api.get(`/students/`)
export const createStudent = payload => api.post(`/students/`, payload)
export const getStudentById = id => api.get(`/students/${id}/`)
export const updateStudent = (id, payload) => api.put(`/students/${id}/`, payload)
export const deleteStudent = id => api.delete(`/students/${id}/`)
