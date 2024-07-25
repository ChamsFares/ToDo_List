import Todo from './ToDoList';
import Project from "./Project";
import Storage from './Storage';

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
    }
  
    function showTodoDetails(todo, projectName) {
      const detailsDiv = document.getElementById('todo-details');
      detailsDiv.innerHTML = `
        <h3>${todo.title}</h3>
        <p>Description: ${todo.description}</p>
        <p>Due Date: ${todo.dueDate}</p>
        <p>Priority: ${todo.priority}</p>
        <button onclick="DOMManipulation.editTodo('${todo.id}', '${projectName}')">Edit</button>
        <button onclick="DOMManipulation.deleteTodo('${todo.id}', '${projectName}')">Delete</button>
      `;
    }
  
    function editTodo(todoId, projectName) {
      const todo = TodoLogic.getTodosByProject(projectName).find(t => t.id === todoId);
      if (todo) {

        console.log('Editing todo:', todo);
      }
    }
  
    function deleteTodo(todoId, projectName) {
      TodoLogic.deleteTodo(todoId, projectName);
      renderTodos(projectName);
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
  
    return {
      renderProjects,
      renderTodos,
      showTodoDetails,
      editTodo,
      deleteTodo,
      showNewTodoForm
    };
  })();
export {DOMManipulation, TodoLogic}