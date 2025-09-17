import { inject, Injectable, signal } from "@angular/core";
import { Task } from "./task/tasks.model";
import { DUMMY_TASKS } from "../dummy-tasks";
import { StorageService } from "../storage.service";

//we can create a service by using the inject function.
//we can also use the inject function to inject the service into a component.
@Injectable({
    providedIn: 'root'
})
export class TasksService {
    private tasksTag = 'tasks';
    private storage = inject(StorageService);
    tasks = signal<Task[]>(this.storage.getObject<Task[]>(this.tasksTag) ?? DUMMY_TASKS);

    addTask(title: string, summary: string, dueDate: Date, userId: string) {
        let task = this.createTask(title, summary, dueDate, userId);
        this.tasks.update(tasks => [...tasks, task]);
        this.storage.setObject(this.tasksTag, this.tasks());
    }

    removeTask(task: Task) {
        this.tasks.update(tasks => tasks.filter(t => t.id !== task.id));
        this.storage.setObject(this.tasksTag, this.tasks());
    }

    removeTaskById(id: string) {
        this.tasks.update(tasks => tasks.filter(t => t.id !== id));
        this.storage.setObject(this.tasksTag, this.tasks());
    }

    getUserTasks(userId: string) {
        return this.tasks().filter(task => task.userId === userId);
    }

    completeTask(task: Task) {
        this.tasks.update(tasks => tasks.filter(t => t.id !== task.id));
        this.storage.setObject(this.tasksTag, this.tasks());
    }

    getTaskById(id: string) {
        return this.tasks().find(task => task.id === id);
    }

    private generateTaskId() {
        return Math.random().toString();
    }
    
    private createTask(title: string, summary: string, dueDate: Date, userId: string) {
        const task: Task = {
            id: this.generateTaskId(),
            title: title,  
            summary: summary,
            dueDate: dueDate,
            userId: userId
        }
        return task;
    }
}


