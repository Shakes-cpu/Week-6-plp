import Bug from "../models/Bug.js";

// Get all bugs
export const getBugs = async (req, res) => {
  try {
    const bugs = await Bug.find();
    res.json(bugs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create new bug
export const createBug = async (req, res) => {
  const { title, description } = req.body;
  try {
    const bug = new Bug({ title, description });
    await bug.save();
    res.status(201).json(bug);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update bug status
export const updateBug = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  try {
    const bug = await Bug.findById(id);
    if (!bug) return res.status(404).json({ message: "Bug not found" });
    bug.status = status;
    await bug.save();
    res.json(bug);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a bug
export const deleteBug = async (req, res) => {
  const { id } = req.params;
  try {
    const bug = await Bug.findById(id);
    if (!bug) return res.status(404).json({ message: "Bug not found" });
    await bug.remove();
    res.json({ message: "Bug deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
