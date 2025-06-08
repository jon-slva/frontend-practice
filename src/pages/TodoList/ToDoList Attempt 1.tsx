import { useState, useEffect } from "react";
import axios from "axios";
//

type NewTask = {
  title: string;
  completed: boolean;
  dueDate: string;
};

type Task = NewTask & {
  id: number;
};

const API_URL = import.meta.env.VITE_BACKEND; // '/todo' must be added

// --------------------- INTERVIEW INSTRUCTIONS ---------------------
// Follow these steps in order:
// 1. Fetch and display existing todos:
//    • In useEffect, call GET http://localhost:3000/api/todo to retrieve todo list.
//    • Store response in state (useState).
//    • Conditionally render a "Loading..." message until data arrives.
//    • Render todos in a <table> with columns: Task, Status (checkbox), Due Date, Actions.
// 2. Add a new todo:
//    • Create controlled input state for a new task title.
//    • Implement an "Add Task" button that sends POST http://localhost:3000/api/todo with { title, dueDate: new Date().toISOString(), completed: false }.
//    • When POST succeeds, append the new todo to state and clear input.
// 3. Toggle completion status:
//    • In the Status column, render a checkbox reflecting todo.completed.
//    • On click, send PUT http://localhost:3000/api/todo/:id with updated completed value.
//    • On success, update that todo’s completed status in state.
// 4. Delete a todo:
//    • In the Actions column, render a "Delete" button for each row.
//    • On click, send DELETE http://localhost:3000/api/todo/:id.
//    • On success, remove the todo from state to update the UI.
// 5. Error handling and edge cases:
//    • Display console errors if any fetch/post/put/delete fails.
//    • Prevent adding empty titles (disable button or ignore).
//
// Build in this exact order. Once step 1 works, move on to step 2, and so on.
// -------------------------------------------------------------------

const ToDoList: React.FC = () => {
  const [enteredTask, setEnteredTask] = useState<string>("");
  const [toDoListData, setToDoListData] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // API Calls
  const fetchData = async () => {
    try {
      const response = await axios.get<Task[]>(`${API_URL}/todo`);
      console.log("Too fetch Request Response", response.data);
      setToDoListData(response.data);
      setIsLoading(false);
    } catch (error) {
      console.error("Could not retrieve ToDo List data", error);
      return undefined;
    }
  };

  const addTask = async (newTask: NewTask) => {
    try {
      const response = await axios.post<Task>(`${API_URL}/todo`, newTask);
      console.log("New task successfully added", response.data);
      setToDoListData((prev) => [...prev, response.data]); // This way of updating state will always show the updated state and avoid bad re-renders with stale state
      setEnteredTask("");
    } catch (error) {
      console.error("Add new task failed", error);
      return undefined;
    }
  };

  const togglePut = async (taskToUpdate: Task): Promise<Task | undefined> => {
    try {
      const response = await axios.put<Task>(
        `${API_URL}/todo/${taskToUpdate.id}`,
        taskToUpdate,
      );

      const updatedTaskList: Task[] = toDoListData.map((task) => {
        if (task.id === taskToUpdate.id) {
          return { ...task, completed: !task.completed };
        } else {
          return task;
        }
      });

      setToDoListData(updatedTaskList);
    } catch (error) {
      console.error("Task failed to update", error);
      return undefined;
    }
  };

  const deleteTask = async (id: number) => {
    try {
      const response = await axios.delete<Task>(`${API_URL}/todo/${id}`);
      console.log("Task to delete found!", response.data);
      const updatedToDoList = toDoListData.filter(
        (task) => task.id != response.data.id,
      );
      setToDoListData(updatedToDoList);
    } catch (error) {
      console.error("Task to delete was not found", error);
    }
  };

  // Event Handler Functions
  const addNewTaskHandler = async () => {
    const newTask: NewTask = {
      title: enteredTask,
      completed: false,
      dueDate: new Date().toISOString(),
    };
    addTask(newTask);
  };

  const toggleCompleteHandler = (id: number) => {
    const taskToUpdate = toDoListData.find((task) => task.id === id);
    if (!taskToUpdate) {
      console.error("Task to update not found");
      return;
    }
    togglePut(taskToUpdate);
  };

  const deleteTaskhandler = (id: number) => {
    deleteTask(id);
  };

  useEffect(() => {
    fetchData(); // called this outside the useEffect  which caused an infinite loop. check before running always.
  }, []);

  return (
    <>
      <h2>ToDoList</h2>

      {isLoading ? (
        "Loading..."
      ) : (
        <section>
          <aside>
            <input
              type="text"
              placeholder="Enter Task Here"
              value={enteredTask}
              onChange={(e) => setEnteredTask(e.target.value)}
            />
            <button
              onClick={addNewTaskHandler}
              disabled={enteredTask.trim() === ""} // disables the button if the field is empty
            >
              Add Task
            </button>
          </aside>
          <table>
            <thead>
              <tr>
                <th>Task</th>
                <th>Status</th>
                <th>Due Date</th>
              </tr>
            </thead>
            <tbody>
              {toDoListData.map((task) => {
                return (
                  <tr key={task.id}>
                    <td>{task.title}</td>
                    <td>
                      <button onClick={() => toggleCompleteHandler(task.id)}>
                        {task.completed ? "☑︎" : "☐"}
                      </button>
                    </td>
                    <td>{task.dueDate}</td>
                    <td>
                      <button onClick={() => deleteTaskhandler(task.id)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </section>
      )}
    </>
  );
};

export default ToDoList;
