import Todo from './ToDoList';
import Project from "./Project";
import Storage from './Storage';
import './style.css'

const TodoLogic = (() => {
    let projects = [new Project('Default')];
  
    function createTodo(title, description, dueDate, priority, projectName = 'Default') {
      const todo = new Todo(title, description, dueDate, priority);
      const project = projects.find(p => p.name === projectName);
      if (project) {
        project.addTodo(todo);
        Storage.setData({ projects});
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
      }
    }
  
    function deleteProject(projectName) {
      projects = projects.filter(p => p.name !== projectName);
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
            li.addEventListener('click', () => renderTodos(project.name));
            projectList.appendChild(li);
        });
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
        
        // Add button to show new todo form
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
        document.getElementById('delete-todo-btn').addEventListener('click', () => deleteTodo(todo.id, projectName));
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

    return {
        renderProjects,
        renderTodos,
        showTodoDetails,
        editTodo,
        deleteTodo,
        showNewTodoForm,
        showNewProjectForm
    };
})();

const sampleData = {
  "projects": [
    {
      "name": "Work",
      "todos": [
        {
          "id": "work1",
          "title": "Complete project proposal",
          "description": "Draft and finalize the Q3 project proposal",
          "dueDate": "2023-08-15",
          "priority": "high",
          "completed": false
        },
        {
          "id": "work2",
          "title": "Schedule team meeting",
          "description": "Set up a team sync for next week",
          "dueDate": "2023-07-30",
          "priority": "medium",
          "completed": false
        }
      ]
    },
    {
      "name": "Personal",
      "todos": [
        {
          "id": "personal1",
          "title": "Gym session",
          "description": "30 minutes cardio, 30 minutes strength training",
          "dueDate": "2023-07-28",
          "priority": "medium",
          "completed": false
        },
        {
          "id": "personal2",
          "title": "Buy groceries",
          "description": "Milk, eggs, bread, fruits",
          "dueDate": "2023-07-29",
          "priority": "low",
          "completed": false
        }
      ]
    },
    {
      "name": "Learning",
      "todos": [
        {
          "id": "learn1",
          "title": "Complete JavaScript course",
          "description": "Finish the advanced JavaScript module",
          "dueDate": "2023-08-30",
          "priority": "high",
          "completed": false
        },
        {
          "id": "learn2",
          "title": "Start React project",
          "description": "Begin building a small React application",
          "dueDate": "2023-09-15",
          "priority": "medium",
          "completed": false
        }
      ]
    }
  ]
};

window.DOMManipulation = DOMManipulation;

function initializeApp() {
    const savedData = Storage.loadData();
    if (savedData) {
      TodoLogic.setData(savedData);
    } else {
      TodoLogic.setData(sampleData);
      Storage.saveData(sampleData);
    }
    DOMManipulation.renderProjects();
    DOMManipulation.renderTodos('Work'); 
}

document.addEventListener('DOMContentLoaded', () => {
    initializeApp();
});