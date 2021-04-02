import express from "express";
import { addEvent, getEvents } from "../controllers/eventControllers.js";

// initialize router
const router = express.Router();

// example: empty middleware
const middleware = (request, response, next) => next();

/*
  request methods   --->   https://www.tutorialspoint.com/http/http_methods.htm
  1st param = extended url path
  2nd param = middlewares (optional)
  3rd param = request & response function (controller)
*/

// POST at path: http://localhost:8080/event
router.post("/new", middleware, addEvent);
// GET at path: http://localhost:8080/auth/account
router.get("/all", middleware, getEvents);

export default router;
