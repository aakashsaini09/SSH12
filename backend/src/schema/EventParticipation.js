import { Schema } from "mongoose";

const ParticipationRequestSchema = new Schema({
  eventId: { 
    type: ObjectId, 
    ref: "MovieEvent", 
    index: true 
},
  fromUser: { 
    type: ObjectId, 
    ref: "User", 
    index: true 
},
  toUser: { 
    type: ObjectId, 
    ref: "User", 
    index: true 
},

  status: {
    type: String,
    enum: ["PENDING", "ACCEPTED", "REJECTED", "EXPIRED"],
    default: "PENDING",
    index: true
  }
}, { timestamps: true });
export default ParticipationRequestSchema