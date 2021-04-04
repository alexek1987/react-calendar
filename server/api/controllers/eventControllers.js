import Event from "../models/Event.js";
// more about response status codes   --->   https://restapitutorial.com/httpstatuscodes.html

export async function addEvent(req, res, next) {
  try {
    // Handle your logic here...
    const { event, date, reoccuring } = req.body;

    let singleOrMultipleEvents = [];

    if (reoccuring) {
      let endNum;
      let currDay = new Date(date).getDate();
      let currMonth = new Date(date).getMonth();
      let currYear = new Date(date).getFullYear();

      if (currMonth === 1) {
        // feb
        endNum = 28;
      } else if (currMonth % 2 === 0) {
        // even months, by index jan, march, etc
        endNum = 31;
      } else if (currMonth % 2 != 0) {
        // odd months by index, april etc
        endNum = 30;
      }

      for (let index = currDay; index <= endNum; index += 7) {
        const newEvent = await Event.create({
          event,
          date: new Date(currYear, currMonth, index),
        });
        singleOrMultipleEvents.push(newEvent);
      }
    } else {
      const newEvent = await Event.create({
        event,
        date,
      });
      singleOrMultipleEvents = newEvent;
    }

    // return something to the client-side
    res
      .status(201)
      .json({ message: "Event created", event: singleOrMultipleEvents });
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
