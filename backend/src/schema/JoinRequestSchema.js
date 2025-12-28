import mongoose from "mongoose";

const JoinRequestSchema = new mongoose.Schema(
  {
    eventId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "MovieEvent",
      required: true,
      index: true
    },

    fromUser: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true
    },

    toUser: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true
    },

    status: {
      type: String,
      enum: ["PENDING", "ACCEPTED", "REJECTED"],
      default: "PENDING",
      index: true
    }
  },
  { timestamps: true }
);

// prevent duplicate requests
JoinRequestSchema.index(
  { eventId: 1, fromUser: 1 },
  { unique: true }
);

export default mongoose.model("JoinRequest", JoinRequestSchema);
