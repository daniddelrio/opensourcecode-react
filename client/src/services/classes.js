import axios from 'axios';
import { api } from "./";

export const getClasses = () => api.get(`/classes/`)
export const createClass = payload => api.post(`/classes/`, payload)
export const getClassById = id => api.get(`/classes/${id}/`)
export const updateClass = (id, payload) => api.put(`/classes/${id}/`, payload)
export const deleteClass = id => api.delete(`/classes/${id}/`)
