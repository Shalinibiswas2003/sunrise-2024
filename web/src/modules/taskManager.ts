import Task from "@/model/Task";
import { initialTasks } from "@/utils/TaskList";

let tasks: Task[] = [...initialTasks];

// Initialize the tasks
export function initializeTasks(): void {
    // Reset tasks to initial state
    
    // Ensure tasks are properly initialized with correct active and in-progress status
    tasks.forEach((task) => {
        task.completed = false;
        task.inProgress = false;
        task.active = false;
    });

    // Activate the first two tasks
    if (tasks.length > 0) {
        tasks[0].inProgress = true;
        tasks[0].active = true;
    }
    if (tasks.length > 1) {
        tasks[1].inProgress = true;
        tasks[1].active = true;
    }
}

// Get active tasks
export function getActiveTasks(): Task[] {
    return tasks.filter(task => task.active && !task.completed);
}

// Get in-progress tasks
export function getInProgressTasks(): Task[] {
    return tasks.filter(task => task.inProgress && !task.completed);
}

// Get all tasks
export function getAllTasks(): Task[] {
    return tasks;
}

// Get completed tasks
export function getCompletedTasks(): Task[] {
    return tasks.filter(task => task.completed);
}

// Create a new task
export function createTask(title: string, description: string, persona: string, group: number): void {
    const nextId = Math.max(0, ...tasks.map(t => t.id)) + 1;
    tasks.push({
        id: nextId, 
        title, 
        description, 
        persona, 
        group, 
        completed: false, 
        inProgress: false, 
        active: group === 1
    });
}

// Update a task
export function updateTask(taskId: number, updatedTask: Partial<Omit<Task, 'id'>>): void {
    const taskInd = tasks.findIndex(t => t.id === taskId);
    if (taskInd !== -1) {
        tasks[taskInd] = { ...tasks[taskInd], ...updatedTask };
    }
}

// Delete a task
export function deleteTask(taskId: number): void {
    const taskInd = tasks.findIndex(task => task.id === taskId);
    if (taskInd !== -1) {
        const [deletedTask] = tasks.splice(taskInd, 1);
        if (deletedTask.completed) {
            const groupTasks = tasks.filter(t => t.group === deletedTask.group);
            if (groupTasks.every(t => t.completed)) {
                unlockNextGroupTasks(deletedTask.group);
            }
        }
    }
}

// Unlock the next group's tasks if all current group's tasks are completed
function unlockNextGroupTasks(group: number): void {
    const nextGroup = group + 1;
    const nextGroupTasks = tasks.filter(t => t.group === nextGroup);
    if (nextGroupTasks.length > 0) {
        nextGroupTasks.forEach(task => {
            if (!task.completed) {
                task.inProgress = true;
                task.active = true;
            }
        });
    }
}

// Complete a task
export function completeTask(taskTitle: string): void {
    const taskIndex = tasks.findIndex(task => task.title === taskTitle);
    if (taskIndex !== -1) {
        tasks[taskIndex].completed = true;
        tasks[taskIndex].inProgress = false;
        tasks[taskIndex].active = false;

        // Move the next task to in-progress
        moveNextTaskToInProgress(tasks[taskIndex]);

        // Check if all tasks in the current group are completed and unlock the next group
        const currentGroupTasks = tasks.filter(t => t.group === tasks[taskIndex].group);
        if (currentGroupTasks.every(t => t.completed)) {
            unlockNextGroupTasks(tasks[taskIndex].group);
        }
    }
}

// Move the next available task to in-progress
function moveNextTaskToInProgress(task: Task): void {
    const currentGroupTasks = tasks.filter(t => t.group === task.group);
    const nextGroupTasks = tasks.filter(t => t.group === task.group + 1);

    // Find the next task to move to in-progress
    const nextToDoTask = getToDoTasks().find(t => t.group === task.group || t.group === task.group + 1);

    if (nextToDoTask) {
        tasks = tasks.map(t =>
            t.id === nextToDoTask.id
                ? { ...t, inProgress: true, active: (t.group === task.group || currentGroupTasks.every(t => t.completed)) }
                : t
        );
    }
}

// Get tasks that are not completed and not in progress
export function getToDoTasks(): Task[] {
    return tasks.filter(task => !task.completed && !task.inProgress);
}
