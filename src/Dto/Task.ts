class Task {

    private taskName: string;
    private Date: Date;
    private isCompleted: boolean;

    constructor( taskName: string) {

        this.taskName = taskName;
        this.Date = new Date;
        this.isCompleted = false; 
    }

 

    getTaskName(): string {
        return this.taskName;
    }

    setTaskName(taskName: string): void {
        this.taskName = taskName;
    }

  

    getIsCompleted(): boolean {
        return this.isCompleted;
    }

    markAsCompleted(): void {
        this.isCompleted = true;
    }

    markAsIncomplete(): void {
        this.isCompleted = false;
    }
}

export {Task}