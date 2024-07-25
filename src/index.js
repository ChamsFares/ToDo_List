import { DOMManipulation, TodoLogic } from './DomMan'
import Storage from './Storage';

// Sample data
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