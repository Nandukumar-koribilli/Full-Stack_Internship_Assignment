import { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

function App() {
  const [todos, setTodos] = useState([])
  const [newTodo, setNewTodo] = useState({ title: '', description: '' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchTodos()
  }, [])

  const fetchTodos = async () => {
    setLoading(true)
    setError(null)
    try {
      const response = await axios.get(`${API_URL}/todos`)
      setTodos(response.data)
    } catch (err) {
      setError('Failed to fetch todos')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    try {
      await axios.post(`${API_URL}/todos`, newTodo)
      setNewTodo({ title: '', description: '' })
      fetchTodos()
    } catch (err) {
      setError('Failed to create todo')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id) => {
    setLoading(true)
    setError(null)
    try {
      await axios.delete(`${API_URL}/todos/${id}`)
      fetchTodos()
    } catch (err) {
      setError('Failed to delete todo')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleToggleComplete = async (todo) => {
    try {
      await axios.put(`${API_URL}/todos/${todo._id}`, {
        ...todo,
        completed: !todo.completed
      })
      fetchTodos()
    } catch (err) {
      setError('Failed to update todo')
      console.error(err)
    }
  }

  return (
    <div className="app">
      <header className="header">
        <h1>✅ Full-Stack Todo App</h1>
        <p>React + Python + MongoDB + Docker + GitHub Actions</p>
      </header>

      <main className="container">
        <section className="form-section">
          <h2>Add New Task</h2>
          <form onSubmit={handleSubmit} className="item-form">
            <input
              type="text"
              placeholder="Task title"
              value={newTodo.title}
              onChange={(e) => setNewTodo({ ...newTodo, title: e.target.value })}
              required
              className="input"
            />
            <input
              type="text"
              placeholder="Description (optional)"
              value={newTodo.description}
              onChange={(e) => setNewTodo({ ...newTodo, description: e.target.value })}
              className="input"
            />
            <button type="submit" disabled={loading} className="btn btn-primary">
              {loading ? 'Adding...' : 'Add Task'}
            </button>
          </form>
        </section>

        {error && <div className="error">{error}</div>}

        <section className="items-section">
          <h2>Tasks List</h2>
          {loading && <div className="loading">Loading...</div>}
          <div className="items-grid">
            {todos.map((todo) => (
              <div key={todo._id} className={`item-card ${todo.completed ? 'completed' : ''}`}>
                <div className="card-header">
                  <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => handleToggleComplete(todo)}
                    className="checkbox"
                  />
                  <h3>{todo.title}</h3>
                </div>
                {todo.description && <p>{todo.description}</p>}
                <div className="card-actions">
                  <button
                    onClick={() => handleDelete(todo._id)}
                    disabled={loading}
                    className="btn btn-danger"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
          {todos.length === 0 && !loading && (
            <p className="empty-state">No tasks yet. Add your first task above!</p>
          )}
        </section>
      </main>
    </div>
  )
}

export default App
