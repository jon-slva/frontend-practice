// --------------------- INTERVIEW INSTRUCTIONS ---------------------

// Build a Bug Tracker frontend that connects to a RESTful API.

// Requirements:
// - Fetch all bugs from GET /bugs on mount X
// - Display them in a list or table X
// - Allow adding a new bug via form inputs (title, description, status, priority)
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
  status: "open" | "closed" | "";
  priority: "low" | "medium" | "high" | "";
  createdAt: Date;
  updatedAt: Date;
};

type NewBug = {
  title: string;
  description: string;
  status: "open" | "closed" | "";
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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <h2>BlankCanvas</h2>
      <form
        onSubmit={(e) => handleSubmit(e)}
        style={{ width: "100%", height: "60px" }}
      >
        <table style={{ margin: "14px auto", height: "40px" }}>
          <tbody>
            <tr style={{ display: "flex", alignItems: "center" }}>
              <td style={{ width: "30%" }}>
                <input
                  type="text"
                  placeholder="Enter Title"
                  required
                  style={{ width: "100%" }}
                  onChange={handleChange}
                />
              </td>
              <td style={{ width: "50%" }}>
                <input
                  type="text"
                  placeholder="Enter Description"
                  required
                  style={{ width: "100%" }}
                  onChange={handleChange}
                />
              </td>
              <td>
                <select
                  name="status"
                  id="status"
                  defaultValue="none"
                  onChange={handleChange}
                >
                  <option value="none" disabled>
                    Select Status
                  </option>
                  <option value="open">Open</option>
                  <option value="closed">Closed</option>
                </select>
              </td>
              <td>
                <select
                  name="priority"
                  id="priority"
                  defaultValue="none"
                  onChange={handleChange}
                >
                  <option value="none" disabled>
                    Select Priority
                  </option>
                  <option value="low">Low</option>
                  <option value="medium">Med</option>
                  <option value="high">High</option>
                </select>
              </td>
              <td>
                <button type="submit">Add Bug</button>
              </td>
            </tr>
          </tbody>
        </table>
      </form>
      <table style={{ margin: "14px auto" }}>
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
                    <button>Delete</button>
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
