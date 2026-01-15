import axios from 'axios';

// API base URL - use environment variable or default to localhost for development
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001/api/todos';

/**
 * API Service for Todo operations
 * Centralized service for all backend communication
 */

/**
 * Fetch all todos from the server
 */
export const fetchTodos = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching todos:', error);
    throw new Error(error.response?.data?.message || 'Failed to fetch todos');
  }
};

/**
 * Fetch a single todo by ID
 */
export const fetchTodoById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching todo:', error);
    throw new Error(error.response?.data?.message || 'Failed to fetch todo');
  }
};

/**
 * Create a new todo
 */
export const createTodo = async (todoData) => {
  try {
    const response = await axios.post(API_URL, todoData);
    return response.data;
  } catch (error) {
    console.error('Error creating todo:', error);
    throw new Error(error.response?.data?.message || 'Failed to create todo');
  }
};

/**
 * Update an existing todo
 */
export const updateTodo = async (id, todoData) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, todoData);
    return response.data;
  } catch (error) {
    console.error('Error updating todo:', error);
    throw new Error(error.response?.data?.message || 'Failed to update todo');
  }
};

/**
 * Delete a todo
 */
export const deleteTodo = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting todo:', error);
    throw new Error(error.response?.data?.message || 'Failed to delete todo');
  }
};
