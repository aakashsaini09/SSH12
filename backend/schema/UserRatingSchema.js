import { Schema } from "mongoose";

const UserRatingSchema = new Schema({
  eventId: { type: ObjectId, ref: "MovieEvent", index: true },
  fromUser: { type: ObjectId, ref: "User", index: true },
  toUser: { type: ObjectId, ref: "User", index: true },

  rating: { type: Number, min: 1, max: 5 },
  reportReason: String
}, { timestamps: true });

export default UserRatingSchema