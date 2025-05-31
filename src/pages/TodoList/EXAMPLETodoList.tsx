// import { useEffect, useState } from "react";
// import axios from "axios";

// const API_URL = "http://localhost:3000/api/todo";

// type ToDo = {
//   id: number;
//   title: string;
//   completed: boolean;
//   dueDate: string;
// };

// // Your first task:

// // Implement the data fetching logic inside the provided useEffect hook.
// // Use JavaScript’s fetch API to get todos from your backend (http://localhost:3000/api/todo).
// // Ensure fetched todos populate React state.

// // First I am going to write the async get function inside the FC
// // then I will write a useEffect with an empty dependency array to call the function when the component mounts
// // I will then use a useState to store the todo list data
// // inside the try block, I will set the initial todo list state.
// // ----- Rendering in the DOM
// // I will first render the elements of the todo list to make sure I am getting them
// // then I will style out a text input and add task button

// const TodoList: React.FC = () => {
//   const [toDoListData, setToDoListData] = useState<ToDo[]>([]);
//   const [newTask, setNewTask] = useState<string>("");

//   // Method 1 - axios async/await
//   // async function getTodoAxiosAsync() {
//   //   try {
//   //     const response = await axios.get(API_URL) // store the response in an variable
//   //       console.log("Axios Async Data", response.data)
//   //   } catch (error) {
//   //       console.error("Could not get data", error)
//   //   }
//   // }

//   const getTodoAxiosAsync = async () => {
//     try {
//       const response = await axios.get(API_URL);
//       console.log("Axios async/await Data (arrow func)", response.data);
//       setToDoListData(response.data);
//       // console.log("This is the updated sate", toDoListData) // This isn't really necessary because if we know the fetch was successful, then we don't need to log it. It will be stale state anyway.
//     } catch (error) {
//       console.error("Could not get data", error);
//     }
//   };

//   const addTaskHandler = () => {
//     // post request to API
//     // response should be the submitted task with a new id
//     // if response, then set the new state of toDoListData with new task and maintain immutability.
//     // then clear the input which should be controlled by state - bind the value
//     console.log(newTask);
//   };

//   useEffect(() => {
//     getTodoAxiosAsync();
//   }, []);

//   return (
//     <>
//       <header>
//         <h2>Simple Todo List (CRUD)</h2>
//       </header>

//       {/* Todo List */}
//       <section>
//         <div className="task-input">
//           <input
//             type="text"
//             placeholder="Enter new task"
//             value={newTask}
//             onChange={(e) => setNewTask(e.target.value)} // in order to bind the input value, you have to set state with every change, and circularly set the value to that state.
//           />
//           <button onClick={addTaskHandler}>Add Task</button>
//         </div>
//         <div className="task-list">
//           <table
//             style={{
//               // display: "flex",
//               textAlign: "left",
//             }}
//           >
//             <tr>
//               <th style={{ padding: "8px" }}>Due Date</th>
//               <th style={{ padding: "8px" }}>Title</th>
//               <th style={{ padding: "8px" }}>Status</th>
//             </tr>
//             {toDoListData.map((task) => {
//               return (
//                 <tr key={task.id}>
//                   <td>{task.title}</td>
//                   <td>
//                     {task.completed === true ? "Completed" : "Incomplete"}
//                   </td>
//                   <td>{task.dueDate}</td>
//                 </tr>
//               );
//             })}
//           </table>
//         </div>
//       </section>
//     </>
//   );
// };

// export default TodoList;
