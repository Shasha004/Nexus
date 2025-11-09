import mongoose, { Schema } from "mongoose";

const taskSchema = new Schema(
  {
    // --- The "Who" ---
    user: {
      // This links the task back to its owner
      type: Schema.Types.ObjectId,
      ref: "User", // Points to the 'User' model
      required: true,
      index: true, // Good for finding all tasks for a user
    },

    // --- The "What" ---
    title: {
      type: String,
      required: [true, "Task title is required"],
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    category: {
      // For sorting and AI
      type: String,
      trim: true,
      default: "Personal", // e.g., "Work", "Study", "Groceries"
    },

    // --- The "When" (Pillar 1: Scheduler) ---
    dueDate: {
      type: Date,
      // This is your 'taskDeadline'
    },
    priority: {
      // Replaces 'taskPriority' with a clearer system
      type: String,
      enum: ["Low", "Medium", "High"], // Use text for clarity
      default: "Medium",
    },
    status: {
      type: String,
      enum: ["Pending", "In-Progress", "Completed"],
      default: "Pending",
    },

    // --- The "Where" (Pillar 2: Navigator) ---
    location: {
      // This is your 'taskLocation'
      type: Schema.Types.ObjectId,
      ref: "Place", // Points to the 'Place' model
      required: false, // A task doesn't *need* a location
    },
  },
  {
    timestamps: true, // Adds createdAt, updatedAt
  }
);

const TaskModel = mongoose.model("Task", taskSchema);
// Note: "Task" will become "tasks" collection

export default TaskModel;