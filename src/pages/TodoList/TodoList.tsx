import { useEffect, useState } from "react";
import axios from "axios";
import { Task, NewTask, Priority } from "./types EXAMPLE";

const API_URL = import.meta.env.VITE_BACKEND; // "http://localhost:3000/api"

const ToDoList: React.FC = () => {
  const [toDoListData, setToDoListData] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [enteredTask, setEnteredTask] = useState<string>("");
  //

  // API REQUESTS ==========
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

  const postData = async (task: NewTask): Promise<void> => {
    try {
      const response = await axios.post(`${API_URL}/todo`, task);
      console.log("New Task Successfully Added", response.data);
      setToDoListData([...toDoListData, response.data]);
      setEnteredTask("");
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

  const putData = async (updatedTask: Task): Promise<void> => {
    try {
      const response = await axios.put(
        `${API_URL}/todo/${updatedTask.id}`,
        updatedTask,
      );
      console.log("Task Successfully Updated", response.data);

      const updatedList: Task[] = toDoListData.map((task) => {
        return task.id === response.data.id ? response.data : task;
      });
      setToDoListData(updatedList);
    } catch (error) {
      console.log("Could Not Update Task", error);
    }
  };

  // EVENT HANLDERS ==========
  const addTaskHandler = () => {
    const formattedTask: NewTask = {
      title: enteredTask,
      dueDate: new Date().toISOString(),
      completed: false,
      priority: "",
    };
    postData(formattedTask);
  };

  const deleteTaskHandler = (id: number) => {
    deleteData(id);
  };

  const markDoneHandler = (id: number) => {
    const taskToUpdate: Task | undefined = toDoListData.find(
      (task) => task.id === id,
    );
    if (!taskToUpdate) {
      console.error(`Could not find task ${id} to mark DONE`);
      return;
    }

    const updatedTask: Task = {
      ...taskToUpdate,
      completed: !taskToUpdate.completed,
    };
    putData(updatedTask);
  };

  const priorityHandler = (id: number, priority: Priority) => {
    const taskToUpdate: Task | undefined = toDoListData.find(
      (task) => task.id === id,
    );

    if (!taskToUpdate) {
      console.error(`Could not find task ${id} to update PRIORITY`);
      return;
    }
    const updatedTask: Task = { ...taskToUpdate, priority: priority };

    putData(updatedTask);
  };

  useEffect(() => {
    fetchData();
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
                value={enteredTask}
                placeholder="Enter New Task"
                onChange={(e) => setEnteredTask(e.target.value)}
              />
              <button onClick={addTaskHandler}>Add Task</button>
            </aside>
            <table>
              <thead>
                <tr>
                  <th>Task</th>
                  <th>Status</th>
                  <th>Due Date</th>
                  <th>Priority</th>
                </tr>
              </thead>
              <tbody>
                {toDoListData.map((item) => {
                  return (
                    <tr key={item.id}>
                      <td>{item.title}</td>
                      <td>
                        <button onClick={() => markDoneHandler(item.id)}>
                          {item.completed ? "☑︎" : "☐"}
                        </button>
                      </td>
                      <td>{item.dueDate}</td>
                      <td>
                        <select
                          name="priority"
                          id="priority"
                          value={item.priority}
                          onChange={(e) =>
                            priorityHandler(item.id, e.target.value as Priority)
                          }
                        >
                          <option value=""></option>
                          <option value="low">Low</option>
                          <option value="med">Med</option>
                          <option value="high">High</option>
                        </select>
                      </td>
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
