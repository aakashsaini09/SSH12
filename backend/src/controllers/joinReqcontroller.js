import MovieEvent from "../schema/MovieEvent.js";
import JoinRequest from "../schema/JoinRequestSchema.js";
import EventParticipant from "../schema/EventParticipantSchema.js";

export const requestToJoin = async (req, res) => {
  const { eventId } = req.params;
  const userId = req.user.userId;

  try {
    const event = await MovieEvent.findById(eventId);

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    if (event.status !== "OPEN") {
      return res.status(400).json({ message: "Event is not open" });
    }

    if (event.createdBy.toString() === userId) {
      return res.status(400).json({
        message: "You cannot join your own event"
      });
    }

    const request = await JoinRequest.create({
      eventId,
      fromUser: userId,
      toUser: event.createdBy
    });

    return res.status(201).json({
      message: "Join request sent",
      request
    });

  } catch (err) {
    if (err.code === 11000) {
      return res.status(409).json({
        message: "You already requested to join"
      });
    }

    console.error(err);
    return res.status(500).json({
      message: "Internal server error"
    });
  }
};



export const myIncomingRequests = async (req, res) => {
  try {
    const requests = await JoinRequest.find({
      toUser: req.user.userId,
      status: "PENDING"
    })
      .populate("fromUser", "name city")
      .populate("eventId", "movieTitle showTime");

    return res.json(requests);

  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: "Internal server error"
    });
  }
};

export const acceptRequest = async (req, res) => {
  const { requestId } = req.params;

  try {
    const request = await JoinRequest.findById(requestId);

    if (!request || request.status !== "PENDING") {
      return res.status(400).json({
        message: "Invalid request"
      });
    }

    if (request.toUser.toString() !== req.user.userId) {
      return res.status(403).json({
        message: "Not authorized"
      });
    }

    const event = await MovieEvent.findById(request.eventId);

    if (event.currentPeople >= event.maxPeople) {
      event.status = "FULL";
      await event.save();

      return res.status(400).json({
        message: "Event is full"
      });
    }

    // add participant
    await EventParticipant.create({
      eventId: event._id,
      userId: request.fromUser
    });

    event.currentPeople += 1;
    if (event.currentPeople >= event.maxPeople) {
      event.status = "FULL";
    }
    await event.save();

    request.status = "ACCEPTED";
    await request.save();

    return res.json({
      message: "Request accepted"
    });

  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: "Internal server error"
    });
  }
};


export const rejectRequest = async (req, res) => {
  const { requestId } = req.params;

  try {
    const request = await JoinRequest.findById(requestId);

    if (!request || request.status !== "PENDING") {
      return res.status(400).json({
        message: "Invalid request"
      });
    }

    if (request.toUser.toString() !== req.user.userId) {
      return res.status(403).json({
        message: "Not authorized"
      });
    }

    request.status = "REJECTED";
    await request.save();

    return res.json({
      message: "Request rejected"
    });

  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: "Internal server error"
    });
  }
};


export const getEventMembers = async (req, res) => {
  const { eventId } = req.params;

  try {
    const event = await MovieEvent.findById(eventId);

    if (!event) {
      return res.status(404).json({
        message: "Event not found"
      });
    }

    // Only event owner can see members (for now)
    if (event.createdBy.toString() !== req.user.userId) {
      return res.status(403).json({
        message: "Not authorized"
      });
    }

    const members = await EventParticipant.find({ eventId })
      .populate("userId", "name city");

    return res.json(members);

  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: "Internal server error"
    });
  }
};