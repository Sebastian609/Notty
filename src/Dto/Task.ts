export class Task {
    private _idTask: number;
    private _idUserCreator: number;
    private _taskStatus: string;
    private _name: string;
    private _description: string;
    private _createrAt: string;
    private _updatedAt: string;
    private _timeLimit: string;
    private _activeTask: string;
    private _userOwner: { idUser: number };

    constructor(task: {
        idTask: number;
        idUserCreator: number;
        taskStatus: string;
        name: string;
        description: string;
        createrAt: string;
        updatedAt: string;
        timeLimit: string;
        activeTask: string;
        userOwner: { idUser: number };
    }) {
        this._idTask = task.idTask;
        this._idUserCreator = task.idUserCreator;
        this._taskStatus = task.taskStatus;
        this._name = task.name;
        this._description = task.description;
        this._createrAt = task.createrAt;
        this._updatedAt = task.updatedAt;
        this._timeLimit = task.timeLimit;
        this._activeTask = task.activeTask;
        this._userOwner = { idUser: task.userOwner.idUser };
    }

    // Getters
    get idTask(): number {
        return this._idTask;
    }

    get idUserCreator(): number {
        return this._idUserCreator;
    }

    get taskStatus(): string {
        return this._taskStatus;
    }

    get name(): string {
        return this._name;
    }

    get description(): string {
        return this._description;
    }

    get createrAt(): string {
        return this._createrAt;
    }

    get updatedAt(): string {
        return this._updatedAt;
    }

    get timeLimit(): string {
        return this._timeLimit;
    }

    get activeTask(): string {
        return this._activeTask;
    }

    get userOwner(): { idUser: number } {
        return this._userOwner;
    }

    // Setters
    set idTask(idTask: number) {
        this._idTask = idTask;
    }

    set idUserCreator(idUserCreator: number) {
        this._idUserCreator = idUserCreator;
    }

    set taskStatus(taskStatus: string) {
        this._taskStatus = taskStatus;
    }

    set name(name: string) {
        this._name = name;
    }

    set description(description: string) {
        this._description = description;
    }

    set createrAt(createrAt: string) {
        this._createrAt = createrAt;
    }

    set updatedAt(updatedAt: string) {
        this._updatedAt = updatedAt;
    }

    set timeLimit(timeLimit: string) {
        this._timeLimit = timeLimit;
    }

    set activeTask(activeTask: string) {
        this._activeTask = activeTask;
    }

    set userOwner(userOwner: { idUser: number }) {
        this._userOwner = { idUser: userOwner.idUser };
    }

    toJSON(): object {
        return {
            idTask: this._idTask,
            idUserCreator: this._idUserCreator,
            taskStatus: this._taskStatus,
            name: this._name,
            description: this._description,
            createrAt: this._createrAt,
            updatedAt: this._updatedAt,
            timeLimit: this._timeLimit,
            activeTask: this._activeTask,
            userOwner: { idUser: this._userOwner.idUser }
        };
    }
}
