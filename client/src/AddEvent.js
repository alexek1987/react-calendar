import { useRef } from "react";
import axios from "./api";
import { useEvent } from "./contexts/EventContext";

function AddEvent({ mousePosition, selectedDate, setMousePosition }) {
  const { addEvent } = useEvent();
  const inputRef = useRef();
  const occurRef = useRef();

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const data = {
        event: inputRef.current.value,
        date: new Date(selectedDate),
        reoccuring: occurRef.current.checked,
      };

      const response = await axios.post("/event/new", data);
      addEvent(response.data.event);
      setMousePosition({ x: null, y: null });
    } catch (error) {
      console.error(error.message);
    }
  };

  const closeInputFieldHandler = () => {
    setMousePosition({ x: null, y: null });
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
      <div
        style={{
          height: "150px",
          backgroundColor: "#ede6b8",
        }}>
        <input
          style={{
            height: "70px",
            border: "none",
            background: "transparent",
            outline: "none",
          }}
          ref={inputRef}
        />
        <div style={{ padding: "7px" }}>
          <label style={{ fontSize: "12px" }} for="reoccur">
            Schedule Every Week
          </label>
          <input
            ref={occurRef}
            name="reoccur"
            type="checkbox"
            value="reoccur"
          />
        </div>
        <div>
          <button
            onClick={closeInputFieldHandler}
            style={{
              border: "none",
              background: "transparent",
              fontSize: "20px",
            }}
            type="submit">
            ❌
          </button>
          <button
            style={{
              border: "none",
              background: "transparent",
              fontSize: "20px",
            }}
            type="submit">
            ✅
          </button>
        </div>
      </div>
    </form>
  );
}

export default AddEvent;
