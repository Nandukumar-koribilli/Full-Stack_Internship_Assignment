import React from 'react';
import TodoItem from './TodoItem';

/**
 * TodoList Component
 * Displays all todos or empty state
 */
const TodoList = ({ todos, loading, onDelete, onToggleStatus, onEdit }) => {
  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading todos...</p>
      </div>
    );
  }

  if (todos.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-icon">📝</div>
        <h3>No todos yet!</h3>
        <p>Start by adding your first todo above.</p>
      </div>
    );
  }

  // Separate completed and pending todos
  const pendingTodos = todos.filter(todo => todo.status === 'pending');
  const completedTodos = todos.filter(todo => todo.status === 'completed');

  return (
    <div className="todo-list">
      {pendingTodos.length > 0 && (
        <div className="todo-section">
          <h3 className="section-title">Pending ({pendingTodos.length})</h3>
          {pendingTodos.map((todo) => (
            <TodoItem
              key={todo._id}
              todo={todo}
              onDelete={onDelete}
              onToggleStatus={onToggleStatus}
              onEdit={onEdit}
            />
          ))}
        </div>
      )}

      {completedTodos.length > 0 && (
        <div className="todo-section">
          <h3 className="section-title">Completed ({completedTodos.length})</h3>
          {completedTodos.map((todo) => (
            <TodoItem
              key={todo._id}
              todo={todo}
              onDelete={onDelete}
              onToggleStatus={onToggleStatus}
              onEdit={onEdit}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default TodoList;
