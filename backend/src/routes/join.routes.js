import express from "express";
import { jwtAuth } from "../middleware/jwt.middleware.js";
import {
  requestToJoin,
  acceptRequest,
  rejectRequest,
  myIncomingRequests,
  getEventMembers
} from '../controllers/joinReqcontroller.js'

const router = express.Router();

router.post("/:eventId/request", jwtAuth, requestToJoin);
router.post("/requests/:requestId/accept", jwtAuth, acceptRequest);
router.post("/requests/:requestId/reject", jwtAuth, rejectRequest);
router.get("/requests/incoming", jwtAuth, myIncomingRequests);
router.get("/:eventId/members",jwtAuth, getEventMembers);

export default router;
