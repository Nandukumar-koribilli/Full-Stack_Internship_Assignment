from flask import Flask, jsonify, request
from flask_cors import CORS
from pymongo import MongoClient
from bson.objectid import ObjectId
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

app = Flask(__name__)
CORS(app)

# MongoDB connection
MONGODB_URI = os.getenv('MONGODB_URI', 'mongodb://localhost:27017/')
client = MongoClient(MONGODB_URI)
db = client.get_database('fullstack_app')
todos_collection = db.todos

# Health check endpoint
@app.route('/health', methods=['GET'])
def health_check():
    try:
        # Check MongoDB connection
        client.admin.command('ping')
        return jsonify({
            'status': 'healthy',
            'database': 'connected'
        }), 200
    except Exception as e:
        return jsonify({
            'status': 'unhealthy',
            'error': str(e)
        }), 500

# Get all todos
@app.route('/api/todos', methods=['GET'])
def get_todos():
    try:
        todos = list(todos_collection.find())
        for todo in todos:
            todo['_id'] = str(todo['_id'])
        return jsonify(todos), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# Get single todo
@app.route('/api/todos/<todo_id>', methods=['GET'])
def get_todo(todo_id):
    try:
        todo = todos_collection.find_one({'_id': ObjectId(todo_id)})
        if todo:
            todo['_id'] = str(todo['_id'])
            return jsonify(todo), 200
        return jsonify({'error': 'Todo not found'}), 404
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# Create todo
@app.route('/api/todos', methods=['POST'])
def create_todo():
    try:
        data = request.get_json()
        if 'title' not in data:
            return jsonify({'error': 'Title is required'}), 400
            
        new_todo = {
            'title': data['title'],
            'description': data.get('description', ''),
            'completed': data.get('completed', False)
        }
        
        result = todos_collection.insert_one(new_todo)
        return jsonify({
            'message': 'Todo created successfully',
            'id': str(result.inserted_id)
        }), 201
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# Update todo
@app.route('/api/todos/<todo_id>', methods=['PUT'])
def update_todo(todo_id):
    try:
        data = request.get_json()
        
        # Remove _id from data if present to avoid "immutable field" error
        if '_id' in data:
            del data['_id']
            
        result = todos_collection.update_one(
            {'_id': ObjectId(todo_id)},
            {'$set': data}
        )
        if result.modified_count > 0:
            return jsonify({'message': 'Todo updated successfully'}), 200
        # Check if it was because the data was the same
        existing = todos_collection.find_one({'_id': ObjectId(todo_id)})
        if existing:
             return jsonify({'message': 'Todo updated successfully (no changes)'}), 200
             
        return jsonify({'error': 'Todo not found'}), 404
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# Delete todo
@app.route('/api/todos/<todo_id>', methods=['DELETE'])
def delete_todo(todo_id):
    try:
        result = todos_collection.delete_one({'_id': ObjectId(todo_id)})
        if result.deleted_count > 0:
            return jsonify({'message': 'Todo deleted successfully'}), 200
        return jsonify({'error': 'Todo not found'}), 404
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    port = int(os.getenv('PORT', 5000))
    app.run(host='0.0.0.0', port=port, debug=False)
