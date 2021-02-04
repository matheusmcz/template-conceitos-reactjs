import React, { useEffect, useState } from "react";
import "./styles.css";

import api from "./services/api";

function App() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    api.get("projects").then((response) => {
      setProjects(response.data);
    });
  }, []);

  async function handleAddRepository() {
    const response = await api.post("projects", {
      title: `Project ${Date.now()}`,
      owner: "Node.JS",
    });

    setProjects([...projects, response.data]);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`projects/${id}`);

    const newProjects = projects.filter((project) => project.id !== id);

    setProjects(newProjects);
  }

  return (
    <div>
      <ul data-testid="project-list">
        {projects.map((project) => (
          <li key={project.id}>
            {project.title}
            <button onClick={() => handleRemoveRepository(project.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
