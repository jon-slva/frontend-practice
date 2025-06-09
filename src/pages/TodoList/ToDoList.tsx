import { useContext } from "react";
import { ExampleContext } from "../../App";

// --------------------- INTERVIEW INSTRUCTIONS ---------------------

// ------------------------------------------------------------------

const ToDoList = () => {
  const receivedContext = useContext(ExampleContext);
  if (!receivedContext) throw new Error("ExampleContext not found");
  const { globalData, setGlobalData } = receivedContext;

  return <div>ToDoList</div>;
};

export default ToDoList;
