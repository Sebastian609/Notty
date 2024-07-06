import { TeamMembership } from "@/Dto/TeamMembership";
import useTeamMembership from "@/hooks/useTeamState/useTeamMembershipState";
import { getCookie } from "@/Service/Cookies/cookies";
import { cookies } from 'next/headers'
 
export const getMembershipById = async (membership:number):Promise<TeamMembership|null> => {
    // Recuperar el ID del usuario de las cookies
    const membershipId = membership
    const cookieStore = cookies()
    const dataCookie:any = cookieStore.get('token') as unknown as string
    const token = dataCookie.value
    console.log(token);

    const auth = `Bearer ${token}`; 
    
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_NOTTY_BACKEND_HOSTNAME}/memberships/${membershipId}`, {
            headers: {
                'Authorization': auth,
            }
        });

        if (!response.ok) {

            throw new Error('Failed to fetch tasks');
        }

        const data = await response.json();
        const membership = data as TeamMembership;
        console.log(useTeamMembership);
        
        return membership;
    } catch (error) {
        console.error('Error fetching tasks:', error);
        return null; // Devuelve una lista vacía en caso de error
    }
};
