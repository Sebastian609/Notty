import { User } from "./User";

export type Task = {
    idTask?: number;
    idUserCreator: number;
    taskStatus: string;
    name: string;
    description: string;
    createrAt: string;
    updatedAt: string;
    timeLimit: string;
    activeTask: string;
    userOwner: User
}