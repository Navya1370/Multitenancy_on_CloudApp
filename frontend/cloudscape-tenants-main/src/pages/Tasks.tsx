import { useEffect, useState } from "react";
import { apiGet, apiPost, apiPut, apiDelete } from "@/lib/api";

const Tasks = () => {
  const [tasks, setTasks] = useState<any[]>([]);
  const [newTask, setNewTask] = useState("");
  const [editId, setEditId] = useState("");
  const [editValue, setEditValue] = useState("");

  const tenant = JSON.parse(localStorage.getItem("tenant") || "{}");

  const loadTasks = async () => {
    const data = await apiGet(`/api/tasks/${tenant._id}`);
    setTasks(data);
  };

  useEffect(() => {
    loadTasks();
  }, []);

  const addTask = async () => {
    if (!newTask.trim()) return;
    await apiPost(`/api/tasks/${tenant._id}`, { title: newTask });
    setNewTask("");
    loadTasks();
  };

  const saveEdit = async () => {
    await apiPut(`/api/tasks/${editId}`, { title: editValue });
    setEditId("");
    setEditValue("");
    loadTasks();
  };

  const deleteTask = async (id: string) => {
    await apiDelete(`/api/tasks/${id}`);
    loadTasks();
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold">Tasks</h1>

      <div className="flex gap-2">
        <input
          className="border p-2 rounded w-full"
          placeholder="New task"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <button className="bg-green-600 text-white px-4 rounded" onClick={addTask}>
          Add
        </button>
      </div>

      {tasks.map((t) => (
        <div key={t._id} className="p-4 border rounded flex justify-between">
          {editId === t._id ? (
            <input
              className="border p-2 rounded"
              value={editValue}
              onChange={(e) => setEditValue(e.target.value)}
            />
          ) : (
            <span>{t.title}</span>
          )}

          <div className="flex gap-2">
            {editId === t._id ? (
              <button className="bg-green-600 text-white px-3 rounded" onClick={saveEdit}>
                Save
              </button>
            ) : (
              <button
                className="bg-yellow-500 text-white px-3 rounded"
                onClick={() => {
                  setEditId(t._id);
                  setEditValue(t.title);
                }}
              >
                Edit
              </button>
            )}

            <button
              className="bg-red-600 text-white px-3 rounded"
              onClick={() => deleteTask(t._id)}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Tasks;
