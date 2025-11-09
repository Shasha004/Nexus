import mongoose, { Schema } from "mongoose";

const placeSchema = new Schema(
  {
    // --- The "Who" ---
    user: {
      // Who saved this place?
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // --- The "What" ---
    name: {
      // e.g., "Home", "Work", "Main Supermarket", "Campus Library"
      type: String,
      required: true,
      trim: true,
    },
    address: {
      // A human-readable address, e.g., "123 Main St"
      type: String,
      trim: true,
    },

    // --- The "Where" (Pillar 2: Geofencing) ---
    // This is the most important part for location features
    location: {
      type: {
        type: String,
        enum: ["Point"], // Must be 'Point' for GeoJSON
        default: "Point",
      },
      coordinates: {
        type: [Number], // Stores as [longitude, latitude]
        required: true,
      },
    },
    geofenceRadiusMeters: {
      // How close to trigger a reminder? e.g., 200 meters
      type: Number,
      default: 200,
    },
  },
  {
    timestamps: true,
  }
);

// --- CRITICAL ---
// This creates a '2dsphere' index.
// This is what allows MongoDB to run fast "near" queries
// for your geofencing feature.
placeSchema.index({ location: "2dsphere" });

const PlaceModel = mongoose.model("Place", placeSchema);
// Note: "Place" will become "places" collection

export default PlaceModel;