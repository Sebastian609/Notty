import { Task } from "./Task"
import { Team } from "./Team"

export type TeamMembership = {
    id: number,
    isActive: boolean,
    isLeader: boolean,
    team: Team,
    teamTasks: Task[],
}