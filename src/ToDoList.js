export default class todo {
  constructor(title, description, dueDate, priority) {
    this.id = Date.now().toString();
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
  }
  
    toggleComplete() {
      this.completed = !this.completed;
    }
  
}

