import { useEffect, useState } from "react";
import axios from "axios";
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
      const response = await axios.get(`${API_URL}/todo`);
      console.log(
        "Axios async/await with arrow function data: ",
        response.data,
      );
      const tasks = response.data as any;
      setToDoListData(tasks);
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
        return task.id === updatedTask.id ? response.data : task;
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
    const taskToUpdate = toDoListData.find((task) => task.id === id);
    if (!taskToUpdate) return;

    const updatedTask = { ...taskToUpdate, completed: !taskToUpdate.completed };
    putData(updatedTask);
  };

  const addTagHandler = (taskId: number, tag: string) => {
    const taskToUpdate: Task | undefined = toDoListData.find(
      (task) => task.id === taskId,
    );

    if (!taskToUpdate) {
      console.error(`Task id ${taskId} not found - cannot add TAG`);
      return;
    }
    const updatedTask = { ...taskToUpdate, tag: tag };
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
                  <th>Tag</th>
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
                          name="tag"
                          id="tag"
                          value={item.tag}
                          onChange={(e) =>
                            addTagHandler(item.id, e.target.value)
                          }
                        >
                          <option value=""></option>
                          <option value="work">Work</option>
                          <option value="personal">Personal</option>
                          <option value="urgent">Urgent</option>
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
