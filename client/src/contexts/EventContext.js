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
    <EventContext.Provider value={{ events, setEvents }}>
      {children}
    </EventContext.Provider>
  );
}
