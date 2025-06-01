import { useEffect, useState } from "react";
import axios from "axios";
import { Task, AddedTask } from "./types";

const API_URL = "http://localhost:3000/api";

// Your first task:
// Implement the data fetching logic inside the provided useEffect hook.
// Use JavaScript’s fetch API to get todos from your backend (http://localhost:3000/api/todo).
// Ensure fetched todos populate React state.

// First I am going to write the async get function inside the FC
// then I will write a useEffect with an empty dependency array to call the function when the component mounts
// I will then use a useState to store the todo list data
// inside the try block, I will set the initial todo list state.
// ----- Rendering in the DOM
// I will first render the elements of the todo list to make sure I am getting them
// then I will style out a text input and add task button

const ToDoList: React.FC = () => {
  const [toDoListData, setToDoListData] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [newTask, setNewTask] = useState<string>("");

  const fetchData = async () => {
    try {
      const response = await axios.get(`${API_URL}/todo`);
      console.log(
        "Axios async/await with arrow function data: ",
        response.data,
      );
      setToDoListData(response.data);
      setIsLoading(false);
    } catch (error) {
      console.error("Could not get data", error);
    }
  };

  const postData = async (task: AddedTask): Promise<void> => {
    try {
      console.log(task);
      const response = await axios.post(`${API_URL}/todo`, task);
      console.log("New Task Successfully Added", response.data);
      setToDoListData([...toDoListData, response.data]);
      setNewTask("");
    } catch (error) {
      console.error("Could not add Task", error);
    }
  };
  const deleteData = async (id: number): Promise<void> => {
    try {
      const response = await axios.delete(`${API_URL}/todo/${id}`);
      console.log("Task Successfully Deleted", response.data);

      const updatedList: Task[] = toDoListData.filter((task) => task.id !== id);
      setToDoListData(updatedList);
    } catch (error) {
      console.log("Could Not Delete Task", error);
    }
  };

  const addTaskHandler = () => {
    const formattedTask: AddedTask = {
      title: newTask,
      dueDate: new Date().toISOString(),
      completed: false,
    };
    postData(formattedTask);
  };

  const deleteTaskHandler = (id: number) => {
    deleteData(id);
  };

  useEffect(() => {
    setTimeout(() => {
      fetchData();
    }, 3000);
  }, []);

  return (
    <>
      <h1>ToDoList</h1>

      <section>
        {isLoading ? (
          <h2>Loading...</h2>
        ) : (
          <>
            <aside>
              <input
                type="text"
                value={newTask}
                placeholder="Enter New Task"
                onChange={(e) => setNewTask(e.target.value)}
              />
              <button onClick={addTaskHandler}>Add Task</button>
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
                {toDoListData.map((item) => {
                  return (
                    <tr key={item.id}>
                      <td>{item.title}</td>
                      <td>{item.completed ? "Done" : "Incomplete"}</td>
                      <td>{item.dueDate}</td>
                      <td>
                        <button onClick={() => deleteTaskHandler(item.id)}>
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </>
        )}
      </section>
    </>
  );
};

export default ToDoList;
