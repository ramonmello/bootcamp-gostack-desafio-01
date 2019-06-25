const express = require("express");

const server = express();

server.use(express.json());

const projects = [];
let cont = 1;

function checkExistId(req, res, next) {
  const { id } = req.params;

  if (!projects.find(p => p.id === id)) {
    return res
      .status(400)
      .json({ error: `Não existe Projeto com o id = ${id}` });
  }

  return next();
}

server.use((req, res, next) => {
  console.log(`Numero de requisições: ${cont}`);
  cont++;
  return next();
});

server.post("/projects", (req, res) => {
  const { id, title } = req.body;

  const project = {
    id,
    title,
    tasks: []
  };

  projects.push(project);

  return res.send();
});

server.get("/projects", (req, res) => {
  return res.json(projects);
});

server.put("/projects/:id", checkExistId, (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  const project = projects.find(p => p.id === id);

  project.title = title;

  return res.send();
});

server.delete("/projects/:id", checkExistId, (req, res) => {
  const { id } = req.params;

  const project = projects.findIndex(p => p.id === id);

  projects.splice(project, 1);

  return res.send();
});

server.post("/projects/:id/tasks", checkExistId, (req, res) => {
  const task = req.body.title;
  const { id } = req.params;

  const project = projects.find(p => p.id === id);

  project.tasks.push(task);

  return res.send();
});

server.listen(3000);
