import mongoose from "mongoose";

const MovieEventSchema = new mongoose.Schema(
  {
    movieTitle: {
      type: String,
      required: true
    },

    theaterName: {
      type: String,
      required: true
    },

    showTime: {
      type: Date,
      required: true
    },

    city: {
      type: String,
      required: true,
      index: true
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true
    },

    maxPeople: {
      type: Number,
      default: 2
    },

    currentPeople: {
      type: Number,
      default: 1
    },

    status: {
      type: String,
      enum: ["OPEN", "FULL", "EXPIRED"],
      default: "OPEN",
      index: true
    }
  },
  { timestamps: true }
);

export default mongoose.model("MovieEvent", MovieEventSchema);
