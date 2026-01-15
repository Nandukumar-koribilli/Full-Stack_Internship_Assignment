const mongoose = require("mongoose");

/**
 * Todo Schema Definition
 * Defines the structure of a todo item in MongoDB
 */
const todoSchema = new mongoose.Schema(
  {
    // Title is required and must be a non-empty string
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
      minlength: [1, "Title cannot be empty"],
    },

    // Description is optional
    description: {
      type: String,
      trim: true,
      default: "",
    },

    // Status can only be 'pending' or 'completed'
    status: {
      type: String,
      enum: ["pending", "completed"],
      default: "pending",
    },

    // Automatically track creation date
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    // Add timestamps for updatedAt
    timestamps: true,
  }
);

// Create and export the Todo model
const Todo = mongoose.model("Todo", todoSchema);

module.exports = Todo;
