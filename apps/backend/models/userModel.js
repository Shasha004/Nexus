import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: [true, "Username is required"],
      unique: true,
      lowercase: true,
      trim: true,
      index: true, // Good for performance
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      // Note: You must hash this password before saving!
      // Use a library like 'bcrypt' in your user controller.
    },
    phoneNumber: {
      type: String,
      trim: true,
      sparse: true, // Allows multiple nulls, but unique if provided
    },

    // --- Relationships ---
    // This is the CRITICAL part. It links this user to their tasks and places.
    tasks: [
      {
        type: Schema.Types.ObjectId,
        ref: "Task", // Points to the 'Task' model
      },
    ],
    savedPlaces: [
      {
        type: Schema.Types.ObjectId,
        ref: "Place", // Points to the 'Place' model
      },
    ],

    // --- Pillar 3: The Proactive Coach ---
    preferences: {
      focusMode: {
        // For the "Anti-Distraction Nudge"
        type: Boolean,
        default: false,
      },
      wellnessGoals: {
        // For the "Wellness Watchdog"
        type: [String], // e.g., ["Get 8 hours sleep", "Walk 30 mins"]
        default: [],
      },
    },

    // --- Pillar 4: The Reflective Partner ---
    socialMemory: [
      {
        // For the "Social Memory" feature
        name: String,
        relationship: String,
        birthday: Date,
        lastContact: Date,
      },
    ],
    journalEntries: [
      {
        // For the "Daily Debrief"
        content: String,
        date: { type: Date, default: Date.now },
        mood: { type: String, enum: ["Happy", "Neutral", "Sad", "Stressed"] },
      },
    ],
  },
  {
    // This adds 'createdAt' and 'updatedAt' fields automatically
    timestamps: true,
  }
);

const UserModel = mongoose.model("User", userSchema);
// Note: Mongoose conventions use "User" (singular, capitalized)
// It will create a collection called "users"

export default UserModel;