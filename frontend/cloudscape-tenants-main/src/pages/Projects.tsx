import { useEffect, useState } from "react";
import { apiGet, apiPost, apiPut, apiDelete } from "@/lib/api";

const Projects = () => {
  const [projects, setProjects] = useState<any[]>([]);
  const [newProject, setNewProject] = useState("");
  const [editingId, setEditingId] = useState("");
  const [editValue, setEditValue] = useState("");

  const tenant = JSON.parse(localStorage.getItem("tenant") || "{}");

  // Load projects
  const loadProjects = async () => {
    const data = await apiGet(`/api/projects/${tenant._id}`);
    setProjects(data);
  };

  useEffect(() => {
    if (tenant?._id) loadProjects();
  }, []);

  // Add new project
const addProject = async () => {
  if (!newProject.trim()) return;

  await apiPost(`/api/projects/${tenant._id}`, {
    title: newProject,
  });

  setNewProject("");
  loadProjects();
};

  // Start Editing
  const startEdit = (p: any) => {
    setEditingId(p._id);
    setEditValue(p.title);
  };

  // Save Edited
  const saveEdit = async () => {
    await apiPut(`/api/projects/${editingId}`, { title: editValue });
    setEditingId("");
    setEditValue("");
    loadProjects();
  };

  // Delete Project
  const deleteProject = async (id: string) => {
    await apiDelete(`/api/projects/${id}`);
    loadProjects();
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold">Projects</h1>

      {/* Add Project */}
      <div className="flex gap-2">
        <input
          className="border p-2 rounded w-full"
          placeholder="Enter project name"
          value={newProject}
          onChange={(e) => setNewProject(e.target.value)}
        />
        <button onClick={addProject} className="bg-blue-600 text-white px-4 rounded">
          Add
        </button>
      </div>

      {/* List Projects */}
      {projects.length === 0 ? (
        <p>No projects found.</p>
      ) : (
        <div className="space-y-3">
          {projects.map((p) => (
            <div key={p._id} className="p-4 border rounded-lg flex justify-between items-center">
              
              {editingId === p._id ? (
                <input
                  className="border p-2 rounded w-full"
                  value={editValue}
                  onChange={(e) => setEditValue(e.target.value)}
                />
              ) : (
                <span className="font-semibold">{p.title}</span>
              )}

              <div className="flex gap-2">
                {editingId === p._id ? (
                  <button onClick={saveEdit} className="bg-green-600 text-white px-3 rounded">
                    Save
                  </button>
                ) : (
                  <button onClick={() => startEdit(p)} className="bg-yellow-500 text-white px-3 rounded">
                    Edit
                  </button>
                )}

                <button
                  onClick={() => deleteProject(p._id)}
                  className="bg-red-600 text-white px-3 rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Projects;
