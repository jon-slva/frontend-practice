// --------------------- INTERVIEW INSTRUCTIONS ---------------------

// Build a Bug Tracker frontend that connects to a RESTful API.

// Requirements:
// - Fetch all bugs from GET /bugs on mount X
// - Display them in a list or table X
// - Allow adding a new bug via form inputs (title, description, status, priority)X
// - Allow editing an existing bug (in-place or via a modal)
// - Allow deleting a bug
// - Allow changing status or priority interactively
// - Send changes to the backend using appropriate HTTP methods (POST, PUT, DELETE)

// Use React state to manage bugs client-side, and make sure to sync with the backend after any operation.

// ------------------------------------------------------------------

// PSEUDO
// first thing I need to do is fetch, put that in a useeffect and store it in state. I'll console.log the result to make sure I am getting it and I will take to the UI rendering from there.

import { useState, useEffect } from "react";
import axios, { AxiosResponse } from "axios";
const API_URL = import.meta.env.VITE_BACKEND;

type Bug = {
  id: number;
  title: string;
  description: string;
  status: "open" | "closed" | "in progress";
  priority: "low" | "medium" | "high" | "";
  createdAt: Date;
  updatedAt: Date;
};

type NewBug = {
  title: string;
  description: string;
  status: "open" | "closed" | "in progress" | "";
  priority?: "low" | "medium" | "high" | "";
};

const BlankCanvas = () => {
  const [bugData, setBugData] = useState<Bug[] | []>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [formData, setFormData] = useState<NewBug>({
    title: "",
    description: "",
    status: "",
    priority: "",
  });

  const fetchData = async () => {
    try {
      const response: AxiosResponse<Bug[]> = await axios.get<Bug[]>(
        `${API_URL}/api/bugs`,
      );
      console.log("Successfully fetched Bug data", response.data);
      // Now I need to set the state
      setBugData(response.data);
      setIsLoading(false);
    } catch (error) {
      console.error(`Could not retrieve data`, error);
    }
  };

  const postData = async (newBug: NewBug) => {
    try {
      const response: AxiosResponse<Bug> = await axios.post(
        `${API_URL}/api/bugs`,
        newBug,
      );
      console.log("Successfully posted new Bug", response.data);
      // Now I need to add it to the state
      setBugData((prev) => [...prev, response.data]);
      setFormData({
        title: "",
        description: "",
        status: "",
        priority: "",
      });
    } catch (error) {
      console.error(`Unable to post new Bug`, error);
    }
  };

  const deleteData = async (bug: Bug) => {
    try {
      const response: AxiosResponse<Bug> = await axios.delete<Bug>(
        `${API_URL}/api/bugs/${bug.id}`,
      );

      console.log({
        message: "Successfully deleted data",
        data: response.data,
      });
      // I can either find the index of the item to delete, and then create an updated array with that sliced out
      // or I can create an updated array with .filter.

      const updatedBugData = bugData.filter(
        (bug) => bug.id !== response.data.id,
      );
      setBugData(updatedBugData);
    } catch (error) {
      console.error({ message: "Could not delete Bug", error: error });
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    postData(formData);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    // confirm we are getting the right behavior
    // console.log(name, value);
    // Set state with change
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Prevent Enter key from submitting the form when inside an input
  const handleKeyDown = (e: React.KeyboardEvent<HTMLFormElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
    }
  };

  const handleDelete = (bug: Bug) => {
    deleteData(bug);
  };

  return (
    <>
      <h2>BlankCanvas</h2>
      <form onSubmit={(e) => handleSubmit(e)} onKeyDown={handleKeyDown}>
        <table>
          <tbody>
            <tr>
              <td>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  placeholder="Enter Title of bug"
                  required
                  onChange={handleChange}
                />
              </td>
              <td>
                <input
                  type="text"
                  name="description"
                  value={formData.description}
                  placeholder="Enter Description of bug"
                  required
                  onChange={handleChange}
                />
              </td>
              <td>
                <select
                  name="status"
                  value={formData.status}
                  required
                  onChange={handleChange}
                >
                  <option value="" disabled>
                    Select Status
                  </option>
                  <option value="open">Open</option>
                  <option value="closed">Closed</option>
                  <option value="in progress">In Progress</option>
                </select>
              </td>
              <td>
                <select
                  name="priority"
                  value={formData.priority}
                  onChange={handleChange}
                >
                  <option value="" disabled>
                    Select Priority
                  </option>
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </td>
              <td>
                <button type="submit">Add New Bug</button>
              </td>
            </tr>
          </tbody>
        </table>
      </form>

      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Status</th>
            <th>Priority</th>
            <th>Created</th>
            <th>Last Updated</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {isLoading ? (
            <tr>
              <td>
                <p>Loading...</p>
              </td>
            </tr>
          ) : (
            bugData.map((bug) => {
              return (
                <tr key={bug.id}>
                  <td>{bug.title}</td>
                  <td>{bug.description}</td>
                  <td>{bug.status}</td>
                  <td>{bug.priority}</td>
                  <td>{new Date(bug.createdAt).toLocaleDateString()}</td>
                  <td>{new Date(bug.updatedAt).toLocaleDateString()}</td>
                  <td>
                    <button onClick={() => handleDelete(bug)}>Delete</button>
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </>
  );
};

export default BlankCanvas;
