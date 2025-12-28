import mongoose from "mongoose";

const EventParticipantSchema = new mongoose.Schema(
  {
    eventId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "MovieEvent",
      required: true,
      index: true
    },

    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true
    }
  },
  { timestamps: true }
);

// prevent duplicate joins
EventParticipantSchema.index(
  { eventId: 1, userId: 1 },
  { unique: true }
);

export default mongoose.model("EventParticipant", EventParticipantSchema);
