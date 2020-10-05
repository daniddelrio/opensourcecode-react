import axios from 'axios';
import { api } from "./";

export const getSections = () => api.get(`/sections/`)
export const createSection = payload => api.post(`/sections/`, payload)
export const getSectionById = id => api.get(`/sections/${id}/`)
export const updateSection = (id, payload) => api.put(`/sections/${id}/`, payload)
export const deleteSection = id => api.delete(`/sections/${id}/`)
