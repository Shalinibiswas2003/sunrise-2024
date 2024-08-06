import Task from "@/model/Task";
import { initialTasks } from "@/utils/TaskList";

let tasks: Task[] = [...initialTasks];

// Initialize the tasks
export function initializeTasks(): void {
    tasks = [...initialTasks];
    tasks.forEach(task => {
        if (task.completed) {
            task.inProgress = false;
            task.active = false;
        }
    });
    activateTasks();
}

// Activate tasks based on the absence of previous groups and current group's status
function activateTasks(): void {
    const groups = [...new Set(tasks.map(task => task.group))].sort((a, b) => a - b);

    groups.forEach(group => {
        const currentGroupTasks = tasks.filter(t => t.group === group);
        const previousGroupTasks = tasks.filter(t => t.group === group - 1);

        // If the previous group does not exist or all tasks in the previous group are complete
        const allPreviousGroupTasksCompleted = previousGroupTasks.length === 0 || 
            previousGroupTasks.every(t => t.completed);

        if (allPreviousGroupTasksCompleted) {
            // Set the first two tasks to inProgress and active if they are not completed
            currentGroupTasks.slice(0, 2).forEach(task => {
                if (!task.completed) {
                    task.inProgress = true;
                    task.active = true;
                }
            });
        }
    });
}

// Get active tasks
export function getActiveTasks(): Omit<Task, 'active' | 'inProgress'>[] {
    return tasks
      .filter(task => !task.completed && task.active)
      .map(({ id, title, description, persona, group, completed }) => ({
        id,
        title,
        description,
        persona,
        group,
        completed
      }));
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
        inProgress: group === 1, 
        active: group === 1
    });

    // Automatically handle task activation
    activateTasks();
}

// Update a task
export function updateTask(taskId: number, updatedTask: Partial<Omit<Task, 'id'>>): void {
    const taskInd = tasks.findIndex(t => t.id === taskId);
    if (taskInd !== -1) {
        tasks[taskInd] = { ...tasks[taskInd], ...updatedTask };
        // Re-activate tasks if necessary
        activateTasks();
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
    const currentGroupTasks = tasks.filter(t => t.group === task.group && !t.completed);
    const nextGroupTasks = tasks.filter(t => t.group === task.group + 1 && !t.completed);

    // Find the next task to move to in-progress within the same group
    const nextToDoTask = currentGroupTasks.find(t => !t.inProgress) || nextGroupTasks.find(t => !t.inProgress);

    if (nextToDoTask) {
        nextToDoTask.inProgress = true;
        
        // Set the task to active only if it is from the same group or all tasks in the current group are completed
        const currentGroupTasksRemaining = tasks.filter(t => t.group === task.group && !t.completed);
        if (nextToDoTask.group === task.group || currentGroupTasksRemaining.length === 0) {
            nextToDoTask.active = true;
        } else {
            nextToDoTask.active = false;
        }
    }
}

// Get tasks that are not completed and not in progress
export function getToDoTasks(): Task[] {
    return tasks.filter(task => !task.completed && !task.inProgress);
}
