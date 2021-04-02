import Event from "../models/Event.js";
// more about response status codes   --->   https://restapitutorial.com/httpstatuscodes.html

export async function addEvent(req, res, next) {
  try {
    // Handle your logic here...

    const newEvent = await Event.create({
      event: req.body.event,
      date: req.body.date,
    });

    // return something to the client-side
    res.status(201).json({ message: "Event created", event: newEvent });
  } catch (error) {
    console.error(error);
    response.status(500).send();
  }
}

export async function getEvents(request, response, next) {
  try {
    // Handle your logic here...
    const foundEvents = await Event.find({});
    // return something to the client-side
    response
      .status(200)
      .json({ message: "Events, fetched", events: foundEvents });
  } catch (error) {
    console.error(error);
    response.status(500).send();
  }
}
