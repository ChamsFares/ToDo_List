export default class todo {
    constructor(id, title, description, dueDate, priority, notes = [], checklist = []) {
      this.id = id;
      this.title = title;
      this.description = description;
      this.dueDate = dueDate;
      this.priority = priority;
      this.notes = notes;
      this.checklist = checklist;
      this.completed = false;
    }
  
    toggleComplete() {
      this.completed = !this.completed;
    }
  
}

