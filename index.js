const express = require("express");

const app = express();

app.use(express.json());

const projects = [];

// Listando todos os projetos e as tarefas
app.get('/projects', (req, res) => {
	return res.json(projects);
});

// Criando um novo projeto e suas tarefas
app.post('/projects', (req, res) => {
	const { id, title } = req.body;

	projects.push({
		id,
		title,
		tasks: []
	})

	return res.status(200).json(projects);
});

// Altera um projeto
app.put('/projects/:id', (req, res) => {
	const { id } = req.params;
	const { title } = req.body;

	const project = projects.find(element => element.id === id);

	project.title = title;

	return res.status(200).json(project);
});

// Deleta um projeto
app.delete('/projects/:id', (req, res) => {
	const { id } = req.params;
	
	const index = projects.findIndex(element => element.id === id);

	projects.splice(index, 1);

	return res.json();
});

// Adicionando uma tarefa no projeto
app.post('/projects/:id/tasks', (req, res) => {
	const { id } = req.params;
	const { title } = req.body;

	const project = projects.find(element => element.id === id);

	project.tasks.push(title);

	return res.status(200).json(project);
});

app.listen(3000);