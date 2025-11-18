import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiGet } from "@/lib/api";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { FolderKanban, CheckSquare } from "lucide-react";

const Dashboard = () => {
  const navigate = useNavigate();

  const [tenant, setTenant] = useState<any>(null);
  const [projects, setProjects] = useState<any[]>([]);
  const [tasks, setTasks] = useState<any[]>([]);

  // Load tenant
  useEffect(() => {
    const storedTenant = localStorage.getItem("tenant");

    console.log("TENANT FOUND IN LOCAL STORAGE:", storedTenant);

    if (!storedTenant) {
      console.log("No tenant found → redirecting to login");
      navigate("/login");
      return;
    }

    const parsed = JSON.parse(storedTenant);

    console.log("PARSED TENANT:", parsed);
    console.log("TENANT ID BEING USED:", parsed._id);

    setTenant(parsed);

    fetchProjects(parsed._id);
    fetchTasks(parsed._id);
  }, []);

  const fetchProjects = async (tenantId: string) => {
    console.log("Calling API → /api/projects/" + tenantId);

    try {
      const data = await apiGet(`/api/projects/${tenantId}`);
      console.log("Projects response:", data);
      setProjects(data);
    } catch (err) {
      console.error("PROJECTS ERROR:", err);
    }
  };

  const fetchTasks = async (tenantId: string) => {
    console.log("Calling API → /api/tasks/" + tenantId);

    try {
      const data = await apiGet(`/api/tasks/${tenantId}`);
      console.log("Tasks response:", data);
      setTasks(data);
    } catch (err) {
      console.error("TASKS ERROR:", err);
    }
  };

  if (!tenant) return null;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">
          Welcome, {tenant.name} 👋
        </h1>
        <p className="text-muted-foreground">
          Here are your projects and tasks.
        </p>
      </div>

      {/* Projects */}
      <Card className="glass-card border-border/50">
        <CardHeader>
          <CardTitle>Your Projects</CardTitle>
          <CardDescription>Projects for this tenant</CardDescription>
        </CardHeader>
        <CardContent>
          {projects.length === 0 ? (
            <p>No projects found.</p>
          ) : (
            <div className="space-y-3">
              {projects.map((p) => (
                <div
                  key={p._id}
                  className="flex items-center gap-4 p-3 rounded-lg hover:bg-secondary/50"
                >
                  <div className="w-10 h-10 rounded-lg bg-primary/80 flex items-center justify-center">
                    <FolderKanban className="h-5 w-5 text-primary-foreground" />
                  </div>

                  <div>
                    <p className="font-medium">{p.title}</p>
                    <p className="text-xs text-muted-foreground">
                      Project ID: {p._id}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Tasks */}
      <Card className="glass-card border-border/50">
        <CardHeader>
          <CardTitle>Your Tasks</CardTitle>
          <CardDescription>Tasks for this tenant</CardDescription>
        </CardHeader>
        <CardContent>
          {tasks.length === 0 ? (
            <p>No tasks found.</p>
          ) : (
            <div className="space-y-3">
              {tasks.map((t) => (
                <div
                  key={t._id}
                  className="flex items-center gap-4 p-3 rounded-lg hover:bg-secondary/50"
                >
                  <div className="w-10 h-10 rounded-lg bg-accent/80 flex items-center justify-center">
                    <CheckSquare className="h-5 w-5 text-accent-foreground" />
                  </div>

                  <div>
                    <p className="font-medium">{t.title}</p>
                    <p className="text-xs text-muted-foreground">
                      Task ID: {t._id}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
