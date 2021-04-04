import { createContext, useContext, useState, useEffect } from "react";
import axios from "../api";

// init context
const EventContext = createContext();

// export the consumer
export function useEvent() {
  return useContext(EventContext);
}

// export the provider (handle all the logic here)
export function EventProvider({ children }) {
  const [events, setEvents] = useState([]);

  const addEvent = (item) => {
    const copyOfEvents = [...events];
    if (item.length) {
      for (const thing of item) {
        copyOfEvents.push(thing);
      }
    } else {
      copyOfEvents.push(item);
    }
    setEvents(copyOfEvents);
  };

  //
  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get("/event/all");
        setEvents(response.data.events);
      } catch (error) {
        console.error(error.message);
      }
    })();
  }, []);

  return (
    <EventContext.Provider value={{ events, addEvent }}>
      {children}
    </EventContext.Provider>
  );
}
