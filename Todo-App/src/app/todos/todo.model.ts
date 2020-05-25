export class Todo {
    id: number;
    taskName: string;
    description: string;
    isDone: boolean;

    constructor(id: number, name: string, description: string, status: boolean) {
        this.id = id;
        this.taskName = name;
        this.description = description;
        this.isDone = status;
    }
}
