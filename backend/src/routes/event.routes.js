import express from "express";
import { jwtAuth } from "../middleware/jwt.middleware.js"; 
import { createEvent, listEvents, getMyEvents, getMyProfile } from "../controllers/event.controller.js";
const router = express.Router()

// Protected routes
router.post('/', jwtAuth, createEvent);
router.get('/', jwtAuth, listEvents);
router.get('/mine', jwtAuth, getMyEvents);
router.get('/me', jwtAuth, getMyProfile);

export default router;