import { useEffect, useState } from "react";
import axios, { AxiosResponse } from "axios";
import { Task, NewTask } from "./types EXAMPLE";

const API_URL = import.meta.env.VITE_BACKEND; // "http://localhost:3000/api"

const ToDoList: React.FC = () => {
  const [toDoListData, setToDoListData] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [enteredTask, setEnteredTask] = useState<string>("");
  //

  // API REQUESTS ==========
  const fetchData = async () => {
    try {
      const response: AxiosResponse<Task[]> = await axios.get<Task[]>(
        `${API_URL}/todo`,
      );
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
      const response: AxiosResponse<Task> = await axios.post<Task>(
        `${API_URL}/todo`,
        task,
      );
      console.log("New Task Successfully Added", response.data);
      setToDoListData((prev) => [...prev, response.data]);
      setEnteredTask("");
    } catch (error) {
      console.error("Could not add Task", error);
    }
  };

  const deleteData = async (id: number): Promise<void> => {
    try {
      const response: AxiosResponse<Task> = await axios.delete<Task>(
        `${API_URL}/todo/${id}`,
      );
      console.log("Task Successfully Deleted", response.data);

      const updatedList: Task[] = toDoListData.filter((task) => task.id !== id);
      setToDoListData(updatedList);
    } catch (error) {
      console.log("Could Not Delete Task", error);
    }
  };

  const putData = async (id: number): Promise<void> => {
    const taskToUpdate: Task | undefined = toDoListData.find(
      (task) => task.id === id,
    );
    if (!taskToUpdate) return;

    const updatedTask = { ...taskToUpdate, completed: !taskToUpdate.completed };

    try {
      const response: AxiosResponse<Task> = await axios.put(
        `${API_URL}/todo/${id}`,
        updatedTask,
      );
      console.log("Task Successfully Updated", response.data);

      const updatedList: Task[] = toDoListData.map((task) => {
        return task.id === id ? { ...task, completed: !task.completed } : task;
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
    };
    postData(formattedTask);
  };

  const deleteTaskHandler = (id: number) => {
    deleteData(id);
  };

  const markDoneHandler = (id: number) => {
    putData(id);
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
