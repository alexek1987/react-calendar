import { useRef } from "react";
import axios from "./api";
import { useEvent } from "./contexts/EventContext";
import { TextField } from "@material-ui/core";
import { Button } from "@material-ui/core";

function AddEvent({ mousePosition, selectedDate, setMousePosition }) {
  const { addEvent } = useEvent();
  const inputRef = useRef();

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const data = {
        event: inputRef.current.value,
        date: new Date(selectedDate),
      };

      const response = await axios.post("/event/new", data);
      addEvent(response.data.event);
      setMousePosition({ x: null, y: null });
    } catch (error) {
      console.error(error.message);
    }
  };
  return (
    <form
      onSubmit={submitHandler}
      style={{
        position: "fixed",
        top: mousePosition.y,
        left: mousePosition.x,
        zIndex: "999",
      }}>
      {/* <input style={{ height: "50px" }} ref={inputRef} /> */}
      <TextField
        inputRef={inputRef}
        id="standard-basic"
        label="Add new Event"
      />
      <button
        style={{ border: "none", background: "transparent", fontSize: "20px" }}
        type="submit"></button>
    </form>
  );
}

export default AddEvent;
