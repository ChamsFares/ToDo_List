import Todo from './ToDoList';
import Project from "./Project";
import Storage from './Storage';
import './style.css'

const TodoLogic = (() => {
    let projects = [new Project('Default')];
  
    function createTodo(title, description, dueDate = Date.now(), priority, projectName = 'Default') {
        const todo = new Todo(title, description, dueDate, priority);
        const project = projects.find(p => p.name === projectName);
        if (project) {
          project.addTodo(todo);
          Storage.setData({ projects });
        }
        return todo;
      }
  
    function createProject(name) {
      const project = new Project(name);
      projects.push(project);
      return project;
    }
  
    function deleteTodo(todoId, projectName) {
        const project = projects.find(p => p.name === projectName);
        if (project) {
          project.removeTodo(todoId);
          Storage.setData({ projects });
        }
      }
  
    function updateProject(oldName, newName) {
        const project = projects.find(p => p.name === oldName);
        if (project) {
            project.name = newName;
            Storage.setData({ projects });
        }
    }

    function deleteProject(projectName) {
        projects = projects.filter(p => p.name !== projectName);
        Storage.setData({ projects });
    }
  
    function getTodosByProject(projectName) {
      const project = projects.find(p => p.name === projectName);
      return project ? project.todos : [];
    }
  
    function getAllProjects() {
      return projects;
    }
  
    function updateTodo(todoId, projectName, updates) {
      const project = projects.find(p => p.name === projectName);
      if (project) {
        const todo = project.todos.find(t => t.id === todoId);
        if (todo) {
          Object.assign(todo, updates);
        }
      }
    }
    function setData(data) {
        if (data && data.projects) {
            projects = data.projects.map(p => {
                const project = new Project(p.name);
                if (p.todos) {
                    project.todos = p.todos.map(t => 
                        new Todo(t.title, t.description, t.dueDate, t.priority, t.id)
                    );
                }
                return project;
            });
        } else {
            console.error('Invalid data structure passed to setData');
            projects = [new Project('Default')];
        }
    }
  
    return {
      createTodo,
      createProject,
      deleteTodo,
      deleteProject,
      updateProject,
      getTodosByProject,
      getAllProjects,
      updateTodo,
      setData
    };
  })();
  

  const DOMManipulation = (() => {
    function renderProjects() {
        const projectList = document.getElementById('project-list');
        projectList.innerHTML = '';
        TodoLogic.getAllProjects().forEach(project => {
            const li = document.createElement('li');
            li.textContent = project.name;
            li.addEventListener('click', () => {
                showProjectDetails(project.name);
                renderTodos(project.name);
            });
            projectList.appendChild(li);
        });
        
        const addProjectBtn = document.createElement('button');
        addProjectBtn.textContent = 'Add New Project';
        addProjectBtn.addEventListener('click', showNewProjectForm);
        projectList.appendChild(addProjectBtn);
    }

    function renderTodos(projectName) {
        const todoList = document.getElementById('todo-list');
        todoList.innerHTML = '';
        TodoLogic.getTodosByProject(projectName).forEach(todo => {
            const li = document.createElement('li');
            li.textContent = `${todo.title} - Due: ${todo.dueDate} - Priority: ${todo.priority}`;
            li.addEventListener('click', () => showTodoDetails(todo, projectName));
            todoList.appendChild(li);
        });
        const addTodoBtn = document.createElement('button');
        addTodoBtn.textContent = 'Add New Todo';
        addTodoBtn.addEventListener('click', () => showNewTodoForm(projectName));
        todoList.appendChild(addTodoBtn);
    }

    function showTodoDetails(todo, projectName) {
        const detailsDiv = document.getElementById('todo-details');
        detailsDiv.innerHTML = `
          <h3>${todo.title}</h3>
          <p>Description: ${todo.description}</p>
          <p>Due Date: ${todo.dueDate}</p>
          <p>Priority: ${todo.priority}</p>
          <button id="edit-todo-btn">Edit</button>
          <button id="delete-todo-btn">Delete</button>
        `;
        document.getElementById('edit-todo-btn').addEventListener('click', () => editTodo(todo.id, projectName));
        document.getElementById('delete-todo-btn').addEventListener('click', () => {
          deleteTodo(todo.id, projectName);
        });
      }

    function editTodo(todoId, projectName) {
        const todo = TodoLogic.getTodosByProject(projectName).find(t => t.id === todoId);
        if (todo) {
            const formDiv = document.getElementById('todo-details');
            formDiv.innerHTML = `
                <form id="edit-todo-form">
                    <input type="text" id="edit-title" value="${todo.title}" required>
                    <textarea id="edit-description">${todo.description}</textarea>
                    <input type="date" id="edit-due-date" value="${todo.dueDate}" required>
                    <select id="edit-priority">
                        <option value="low" ${todo.priority === 'low' ? 'selected' : ''}>Low</option>
                        <option value="medium" ${todo.priority === 'medium' ? 'selected' : ''}>Medium</option>
                        <option value="high" ${todo.priority === 'high' ? 'selected' : ''}>High</option>
                    </select>
                    <button type="submit">Update Todo</button>
                </form>
            `;
            document.getElementById('edit-todo-form').addEventListener('submit', (e) => {
                e.preventDefault();
                const updates = {
                    title: document.getElementById('edit-title').value,
                    description: document.getElementById('edit-description').value,
                    dueDate: document.getElementById('edit-due-date').value,
                    priority: document.getElementById('edit-priority').value
                };
                TodoLogic.updateTodo(todoId, projectName, updates);
                renderTodos(projectName);
                showTodoDetails(TodoLogic.getTodosByProject(projectName).find(t => t.id === todoId), projectName);
            });
        }
    }

    function deleteTodo(todoId, projectName) {
        TodoLogic.deleteTodo(todoId, projectName);
        renderTodos(projectName);
        document.getElementById('todo-details').innerHTML = '';
      }

    function showNewTodoForm(projectName) {
        const formDiv = document.getElementById('new-todo-form');
        formDiv.innerHTML = `
            <form id="todo-form">
                <input type="text" id="todo-title" placeholder="Title" required>
                <textarea id="todo-description" placeholder="Description"></textarea>
                <input type="date" id="todo-due-date" required>
                <select id="todo-priority">
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                </select>
                <button type="submit">Add Todo</button>
            </form>
        `;
        document.getElementById('todo-form').addEventListener('submit', (e) => {
            e.preventDefault();
            const title = document.getElementById('todo-title').value;
            const description = document.getElementById('todo-description').value;
            const dueDate = document.getElementById('todo-due-date').value;
            const priority = document.getElementById('todo-priority').value;
            TodoLogic.createTodo(title, description, dueDate, priority, projectName);
            renderTodos(projectName);
            formDiv.innerHTML = '';
        });
    }

    function showNewProjectForm() {
        const formDiv = document.getElementById('new-project-form');
        formDiv.innerHTML = `
            <form id="project-form">
                <input type="text" id="project-name" placeholder="Project Name" required>
                <button type="submit">Add Project</button>
            </form>
        `;
        document.getElementById('project-form').addEventListener('submit', (e) => {
            e.preventDefault();
            const projectName = document.getElementById('project-name').value;
            TodoLogic.createProject(projectName);
            renderProjects();
            formDiv.innerHTML = '';
        });
    }
    function showProjectDetails(projectName) {
        const project = TodoLogic.getAllProjects().find(p => p.name === projectName);
        if (!project) {
            console.error('Project not found:', projectName);
            return;
        }
    
        const detailsDiv = document.getElementById('project-details');
        detailsDiv.innerHTML = `
            <h2>${project.name}</h2>
            <p>Total Todos: ${project.todos.length}</p>
            <button id="edit-project-btn">Edit Project</button>
            <button id="delete-project-btn">Delete Project</button>
        `;
    
        document.getElementById('edit-project-btn').addEventListener('click', () => editProject(projectName));
        document.getElementById('delete-project-btn').addEventListener('click', () => deleteProject(projectName));
    }
    
    function editProject(projectName) {
        const project = TodoLogic.getAllProjects().find(p => p.name === projectName);
        if (!project) {
            console.error('Project not found:', projectName);
            return;
        }
    
        const detailsDiv = document.getElementById('project-details');
        detailsDiv.innerHTML = `
            <form id="edit-project-form">
                <input type="text" id="edit-project-name" value="${project.name}" required>
                <button type="submit">Update Project</button>
            </form>
        `;
    
        document.getElementById('edit-project-form').addEventListener('submit', (e) => {
            e.preventDefault();
            const newName = document.getElementById('edit-project-name').value;
            TodoLogic.updateProject(projectName, newName);
            renderProjects();
            showProjectDetails(newName);
        });
    }
    
    function deleteProject(projectName) {
        if (confirm(`Are you sure you want to delete the project "${projectName}"?`)) {
            TodoLogic.deleteProject(projectName);
            renderProjects();
            const firstProject = TodoLogic.getAllProjects()[0];
            if (firstProject) {
                showProjectDetails(firstProject.name);
            } else {
                document.getElementById('project-details').innerHTML = '';
            }
        }
    }

    return {
        renderProjects,
        renderTodos,
        showTodoDetails,
        editTodo,
        deleteTodo,
        showNewTodoForm,
        showNewProjectForm,
        showProjectDetails,
        deleteProject,
        editProject
    };
})();

function initializeApp() {
    const savedData = Storage.getData();
    TodoLogic.setData(savedData);
    DOMManipulation.renderProjects();
    const firstProject = TodoLogic.getAllProjects()[0];
    if (firstProject) {
        DOMManipulation.renderTodos(firstProject.name);
    }
}

document.addEventListener('DOMContentLoaded', initializeApp);