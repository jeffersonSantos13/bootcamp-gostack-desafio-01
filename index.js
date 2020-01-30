const express = require("express");
const app = express();

app.use(express.json());

const projects = [];

//Middlewares
function checkIdExists(req, res, next) {
  const { id } = req.params;

  const index = projects.findIndex(element => element.id === id);
  
  if(index < 0 ) {
    return res.status(400).json({ error: "ID informado não existe" });
  }

  req.index = index;

  return next();
}

app.use((req, res, next) => {
  console.count("Quantidade de requisições realizadas");

  return next();
})

// Middleware: Opcional
// Verifica se o 'title' foi informado no corpo da requisição
function checkTitleExists(req, res, next) {
  const { title } = req.body;

  if(!title) {
    return res.status(400).json({ error: "Title não informado" });
  }

  req.title = title;

  return next();
}

// ROTAS

// Listando todos os projetos e as tarefas
app.get('/projects', (req, res) => {
	return res.json(projects);
});

// Criando um novo projeto e suas tarefas
app.post('/projects', (req, res) => {
	const project = req.body;

	projects.push(project)

	return res.status(200).json(projects);
});

// Altera o título do projeto
app.put('/projects/:id', checkIdExists, checkTitleExists, (req, res) => {
  const { index, title } = req;
  
	projects[index].title = title;

	return res.status(200).json(project);
});

// Deleta um projeto
app.delete('/projects/:id', checkIdExists, (req, res) => {
  const { index } = req;

	projects.splice(index, 1);

	return res.json();
});

// Adciiona uma tarefa no projeto
app.post('/projects/:id/tasks', checkIdExists, checkTitleExists, (req, res) => {
  const { index, title } = req;
  
	const project = projects[index];

	project.tasks.push(title);

	return res.status(200).json(project);
});

app.listen(3000);