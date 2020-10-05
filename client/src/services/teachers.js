import axios from 'axios';
import { api } from "./";

export const getTeachers = () => api.get(`/teachers/`)
export const createTeacher = payload => api.post(`/teachers/`, payload)
export const getTeacherById = id => api.get(`/teachers/${id}/`)
export const updateTeacher = (id, payload) => api.put(`/teachers/${id}/`, payload)
export const deleteTeacher = id => api.delete(`/teachers/${id}/`)
