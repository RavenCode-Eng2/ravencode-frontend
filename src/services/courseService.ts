import axios from 'axios';
import { Course } from '../types';
import { API_URL } from '../config/env';

export const courseService = {
  // Get all courses
  getAllCourses: async (): Promise<Course[]> => {
    const response = await axios.get(`${API_URL}/courses`);
    return response.data;
  },

  // Get a single course by ID
  getCourseById: async (id: string): Promise<Course> => {
    const response = await axios.get(`${API_URL}/courses/${id}`);
    return response.data;
  },

  // Create a new course
  createCourse: async (course: Omit<Course, 'id'>): Promise<Course> => {
    const response = await axios.post(`${API_URL}/courses`, course);
    return response.data;
  },

  // Update a course
  updateCourse: async (id: string, course: Partial<Course>): Promise<Course> => {
    const response = await axios.put(`${API_URL}/courses/${id}`, course);
    return response.data;
  },

  // Delete a course
  deleteCourse: async (id: string): Promise<void> => {
    await axios.delete(`${API_URL}/courses/${id}`);
  },

  // Get courses by instructor
  getCoursesByInstructor: async (instructorId: string): Promise<Course[]> => {
    const response = await axios.get(`${API_URL}/courses/instructor/${instructorId}`);
    return response.data;
  },

  // Publish a course
  publishCourse: async (id: string): Promise<Course> => {
    const response = await axios.post(`${API_URL}/courses/${id}/publish`);
    return response.data;
  },

  // Archive a course
  archiveCourse: async (id: string): Promise<Course> => {
    const response = await axios.post(`${API_URL}/courses/${id}/archive`);
    return response.data;
  }
}; 