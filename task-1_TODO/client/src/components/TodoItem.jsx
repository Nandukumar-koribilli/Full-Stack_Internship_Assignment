import React from 'react';

/**
 * TodoItem Component
 * Displays individual todo with actions
 */
const TodoItem = ({ todo, onDelete, onToggleStatus, onEdit }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className={`todo-item ${todo.status === 'completed' ? 'completed' : ''}`}>
      <div className="todo-header">
        <div className="todo-checkbox">
          <input
            type="checkbox"
            checked={todo.status === 'completed'}
            onChange={() => onToggleStatus(todo._id, todo.status)}
            id={`todo-${todo._id}`}
          />
          <label htmlFor={`todo-${todo._id}`}></label>
        </div>
        <div className="todo-content">
          <h3>{todo.title}</h3>
          {todo.description && <p className="todo-description">{todo.description}</p>}
          <span className="todo-date">{formatDate(todo.createdAt)}</span>
        </div>
      </div>
      <div className="todo-actions">
        <button
          className="btn btn-edit"
          onClick={() => onEdit(todo)}
          title="Edit todo"
        >
          ✏️ Edit
        </button>
        <button
          className="btn btn-delete"
          onClick={() => onDelete(todo._id)}
          title="Delete todo"
        >
          🗑️ Delete
        </button>
      </div>
    </div>
  );
};

export default TodoItem;
