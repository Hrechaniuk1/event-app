import { Router } from "express";

import ctrlWrapper from "../helpers/ctrlWrapper.js";
import * as eventController from '../controllers/eventController.js'
import { validateBody } from "../middleware/validateBody.js";
import { eventSchema } from "../validation/eventSchema.js";

const router = Router()

router.get('/events', ctrlWrapper(eventController.getAllEventsController))

router.get('/events/:id', ctrlWrapper(eventController.getOneEventController))

router.patch('/events/:id', validateBody(eventSchema), ctrlWrapper(eventController.patchEventController))

export default router
