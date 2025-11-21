import React, { useState, useEffect } from "react";
import axios from "axios";

const BugTracker = () => {
  const [bugs, setBugs] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const fetchBugs = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/bugs");
      setBugs(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchBugs();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/bugs", { title, description });
      setBugs([...bugs, res.data]);
      setTitle("");
      setDescription("");
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/bugs/${id}`);
      setBugs(bugs.filter((bug) => bug._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  const handleStatusChange = async (id, status) => {
    try {
      const res = await axios.put(`http://localhost:5000/api/bugs/${id}`, { status });
      setBugs(bugs.map((bug) => (bug._id === id ? res.data : bug)));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-4">
      <form onSubmit={handleSubmit} className="mb-4">
        <input
          type="text"
          placeholder="Bug title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border p-2 mr-2 w-1/3"
          required
        />
        <input
          type="text"
          placeholder="Bug description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border p-2 mr-2 w-1/2"
          required
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Report Bug
        </button>
      </form>

      {bugs.length === 0 ? (
        <p>No bugs reported yet.</p>
      ) : (
        <ul>
          {bugs.map((bug) => (
            <li key={bug._id} className="mb-2 border p-2 rounded flex justify-between items-center">
              <div>
                <strong>{bug.title}</strong> - {bug.description} (
                <span className="capitalize">{bug.status}</span>)
              </div>
              <div>
                {bug.status !== "resolved" && (
                  <button
                    onClick={() =>
                      handleStatusChange(
                        bug._id,
                        bug.status === "open" ? "in-progress" : "resolved"
                      )
                    }
                    className="bg-green-500 text-white px-2 py-1 mr-2 rounded"
                  >
                    Next Status
                  </button>
                )}
                <button
                  onClick={() => handleDelete(bug._id)}
                  className="bg-red-500 text-white px-2 py-1 rounded"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default BugTracker;
