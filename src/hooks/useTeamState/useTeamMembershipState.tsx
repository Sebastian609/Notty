import { TeamMembership } from "@/Dto/TeamMembership";
import { getMembershipById } from "@/Service/Notty-API/Teams/getMembershipById";
import { getMembershipByUserId } from "@/Service/Notty-API/Teams/getMembershipByUserId";

const useTeamMembership = async () => {
    const getMembershipByUser = async(userId: number):Promise<TeamMembership[]|null> =>{
        try {
            const memberships = await getMembershipByUserId(userId);
            if(!memberships){
                throw new Error("membership is null")
            }
            return memberships
        } catch (error) {
            return null
        }
    }

    const getMembership = async(userId: number):Promise<TeamMembership|null> =>{
        try {
            const membership = await getMembershipById(userId);
            if(!membership){
                throw new Error("membership is null")
            }
            return membership
        } catch (error) {
            return null
        }
    }
    return {getMembershipByUser}
};
export default useTeamMembership;
