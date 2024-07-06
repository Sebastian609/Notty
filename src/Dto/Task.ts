import { User } from "./User";

export type Task = {
    type?:string;
    idTask?: number;
    idUserCreator: User;
    taskStatus: string;
    name: string;
    description?: string;
    createrAt?: string;
    updatedAt?: string;
    timeLimit: string;
    activeTask: string;
    userOwner: User
}