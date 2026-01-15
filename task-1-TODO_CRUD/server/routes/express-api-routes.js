const express = require('express');
const router = express.Router();
const Todo = require('../models/Todo');
const { validateTodo } = require('../middleware/validation');

/**
 * GET /api/todos
 * Fetch all todo items sorted by creation date (newest first)
 */
router.get('/', async (req, res) => {
  try {
    const todos = await Todo.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      count: todos.length,
      data: todos
    });
  } catch (error) {
    console.error('Error fetching todos:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch todos',
      error: error.message
    });
  }
});

/**
 * GET /api/todos/:id
 * Fetch a single todo item by ID
 */
router.get('/:id', async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);
    
    if (!todo) {
      return res.status(404).json({
        success: false,
        message: 'Todo not found'
      });
    }

    res.status(200).json({
      success: true,
      data: todo
    });
  } catch (error) {
    console.error('Error fetching todo:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch todo',
      error: error.message
    });
  }
});

/**
 * POST /api/todos
 * Create a new todo item
 */
router.post('/', validateTodo, async (req, res) => {
  try {
    const { title, description, status } = req.body;

    const newTodo = new Todo({
      title,
      description: description || '',
      status: status || 'pending'
    });

    const savedTodo = await newTodo.save();

    res.status(201).json({
      success: true,
      message: 'Todo created successfully',
      data: savedTodo
    });
  } catch (error) {
    console.error('Error creating todo:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create todo',
      error: error.message
    });
  }
});

/**
 * PUT /api/todos/:id
 * Update an existing todo item
 */
router.put('/:id', validateTodo, async (req, res) => {
  try {
    const { title, description, status } = req.body;

    // Build update object with only provided fields
    const updateData = {};
    if (title !== undefined) updateData.title = title;
    if (description !== undefined) updateData.description = description;
    if (status !== undefined) updateData.status = status;

    const updatedTodo = await Todo.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!updatedTodo) {
      return res.status(404).json({
        success: false,
        message: 'Todo not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Todo updated successfully',
      data: updatedTodo
    });
  } catch (error) {
    console.error('Error updating todo:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update todo',
      error: error.message
    });
  }
});

/**
 * DELETE /api/todos/:id
 * Delete a todo item
 */
router.delete('/:id', async (req, res) => {
  try {
    const deletedTodo = await Todo.findByIdAndDelete(req.params.id);

    if (!deletedTodo) {
      return res.status(404).json({
        success: false,
        message: 'Todo not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Todo deleted successfully',
      data: deletedTodo
    });
  } catch (error) {
    console.error('Error deleting todo:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete todo',
      error: error.message
    });
  }
});

module.exports = router;
