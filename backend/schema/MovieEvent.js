import { Schema } from "mongoose"
const MovieEventSchema = new Schema({
  movieTitle: { 
    type: String, 
    required: true 
  },
  theaterName: { 
    type: String, 
    required: true 
  },
  theaterLocation: {
    type: { 
        type: String, 
        enum: ["Point"], default: "Point" 
    },
    coordinates: { 
        type: [Number], 
        required: true } // [lng, lat]
  },
  showTime: { 
    type: Date, 
    required: true, 
    index: true 
  },
  city: { type: String, 
    required: true, 
    index: true 
  },
  createdBy: { 
    type: ObjectId, 
    ref: "User", 
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
}, { timestamps: true });
export default MovieEventSchema
// MovieEvent {
//   _id
//   movieTitle
//   theaterName
//   theaterLocation   // lat, lng
//   showTime          // exact datetime
//   createdBy         // userId
//   maxPeople         // optional (default 2)
//   status            // OPEN | FULL | CLOSED | EXPIRED
//   createdAt
// }