export default class Task {
  id: number;
  title: string;
  description: string;
  persona: string;
  group: number;
  completed: boolean;
  inProgress: boolean; 
  active:boolean// Add this property to track if the task is in progress

  constructor(id: number, title: string, description: string, persona: string, group: number, completed: boolean = false, inProgress: boolean = false,active:boolean=false) {
      this.id = id;
      this.title = title;
      this.description = description;
      this.persona = persona;
      this.group = group;
      this.completed = completed;
      this.inProgress = inProgress; 
      this.active = active; // Initialize the inProgress property
  }
}
