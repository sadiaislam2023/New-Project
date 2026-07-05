const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema(
  {
    building: {
      name: { type: String, required: true, trim: true },
      isArchived: { type: Boolean, default: false },
    },

    floor: {
      number: { type: Number, required: true },
      isArchived: { type: Boolean, default: false },
    },

    roomNumber: { type: String, required: true, trim: true },
    messLocation: { type: String, required: true, trim: true },

    rent: { type: Number, required: true, min: 0 },

    isArchived: { type: Boolean, default: false },

    totalArea: { type: Number, default: 0 },
    usableArea: { type: Number, default: 0 },

    storage: { type: String, default: "" },

    bathroomType: {
      type: String,
      enum: ["Shared", "Attached"],
      required: true,
    },

    amenities: { type: [String], default: [] },

    utilityPolicy: { type: String, default: "" },

    /* ✅ FIXED IMAGE STRUCTURE */
    images: [
      {
        url: { type: String, required: true },
        public_id: { type: String, required: true },
      },
    ],

    naturalLightLevel: {
      type: String,
      enum: ["Low", "Medium", "High"],
      default: "Medium",
    },

    ventilationNotes: { type: String, default: "" },

    layout: {
      roomWidth: { type: Number, default: 0 },
      roomLength: { type: Number, default: 0 },
      bedPositions: { type: [String], default: [] },
      deskPositions: { type: [String], default: [] },
      wardrobePositions: { type: [String], default: [] },
    },

    beds: [
      {
        bedNumber: String,
        position: String,
        occupied: { type: Boolean, default: false },
        isArchived: { type: Boolean, default: false },
      },
    ],

    currentOccupancy: { type: Number, default: 0 },
  },
  { timestamps: true }
);

/* AUTO OCCUPANCY */
roomSchema.pre("save", function (next) {
  this.currentOccupancy = this.beds.filter(
    (b) => b.occupied && !b.isArchived
  ).length;

  next();
});

module.exports = mongoose.model("Room", roomSchema);