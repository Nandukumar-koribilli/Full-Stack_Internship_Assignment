/**
 * Validation middleware for todo operations
 */

/**
 * Validates todo creation/update requests
 * Checks for required fields and valid values
 */
const validateTodo = (req, res, next) => {
  const { title, status } = req.body;

  // Check if title is provided and not empty
  if (req.method === 'POST' || (req.method === 'PUT' && title !== undefined)) {
    if (!title || title.trim() === '') {
      return res.status(400).json({
        success: false,
        message: 'Title is required and cannot be empty'
      });
    }
  }

  // Validate status if provided
  if (status && !['pending', 'completed'].includes(status)) {
    return res.status(400).json({
      success: false,
      message: 'Status must be either "pending" or "completed"'
    });
  }

  next();
};

module.exports = { validateTodo };
