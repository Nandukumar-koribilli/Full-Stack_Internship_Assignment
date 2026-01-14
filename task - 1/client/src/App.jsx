import { useState, useEffect } from 'react';
import AddTodo from './components/AddTodo';
import TodoList from './components/TodoList';
import EditTodo from './components/EditTodo';
import { fetchTodos, createTodo, updateTodo, deleteTodo } from './services/api';
import './App.css';

/**
 * Main App Component
 * Manages the todo application state and operations
 */
function App() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingTodo, setEditingTodo] = useState(null);

  // Fetch todos on component mount
  useEffect(() => {
    loadTodos();
  }, []);

  /**
   * Load all todos from the backend
   */
  const loadTodos = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetchTodos();
      setTodos(response.data);
    } catch (err) {
      setError(err.message);
      console.error('Failed to load todos:', err);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Add a new todo
   */
  const handleAddTodo = async (todoData) => {
    try {
      const response = await createTodo(todoData);
      setTodos([response.data, ...todos]);
      return response;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  /**
   * Update an existing todo
   */
  const handleUpdateTodo = async (id, todoData) => {
    try {
      const response = await updateTodo(id, todoData);
      setTodos(todos.map(todo => 
        todo._id === id ? response.data : todo
      ));
      return response;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  /**
   * Delete a todo
   */
  const handleDeleteTodo = async (id) => {
    if (!window.confirm('Are you sure you want to delete this todo?')) {
      return;
    }

    try {
      await deleteTodo(id);
      setTodos(todos.filter(todo => todo._id !== id));
    } catch (err) {
      setError(err.message);
      alert('Failed to delete todo: ' + err.message);
    }
  };

  /**
   * Toggle todo status between pending and completed
   */
  const handleToggleStatus = async (id, currentStatus) => {
    const newStatus = currentStatus === 'pending' ? 'completed' : 'pending';
    try {
      await handleUpdateTodo(id, { status: newStatus });
    } catch (err) {
      console.error('Failed to toggle status:', err);
    }
  };

  /**
   * Open edit modal
   */
  const handleEditClick = (todo) => {
    setEditingTodo(todo);
  };

  /**
   * Close edit modal
   */
  const handleCloseEdit = () => {
    setEditingTodo(null);
  };

  return (
    <div className="app">
      <div className="container">
        <header className="app-header">
          <h1>📝 Todo List Application</h1>
          <p className="subtitle">Manage your tasks efficiently</p>
        </header>

        {error && (
          <div className="error-banner">
            <span>⚠️ {error}</span>
            <button onClick={() => setError(null)}>×</button>
          </div>
        )}

        <div className="app-content">
          <AddTodo onAdd={handleAddTodo} />
          
          <div className="divider"></div>
          
          <TodoList
            todos={todos}
            loading={loading}
            onDelete={handleDeleteTodo}
            onToggleStatus={handleToggleStatus}
            onEdit={handleEditClick}
          />
        </div>

        {editingTodo && (
          <EditTodo
            todo={editingTodo}
            onUpdate={handleUpdateTodo}
            onClose={handleCloseEdit}
          />
        )}
      </div>
    </div>
  );
}

export default App;
