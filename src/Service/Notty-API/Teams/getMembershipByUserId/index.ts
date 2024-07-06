import { TeamMembership } from "@/Dto/TeamMembership";
import useTeamMembership from "@/hooks/useTeamState/useTeamMembershipState";
import { cookies } from 'next/headers'
 
export const getMembershipByUserId = async (userId:number):Promise<TeamMembership[]|null> => {
    // Recuperar el ID del usuario de las cookies

    const cookieStore = cookies()
    const dataCookie:any = cookieStore.get('token') as unknown as string
    const token = dataCookie.value
    console.log(token);

    const auth = `Bearer ${token}`; 
    
    try {
        if (!userId) {
            throw new Error('User ID not found in cookies');
        }

        const response = await fetch(`${process.env.NEXT_PUBLIC_NOTTY_BACKEND_HOSTNAME}/memberships/userId/${userId}`, {
            headers: {
                'Authorization': auth,
            }
        });

       
        
        if (!response.ok) {
  
            
            throw new Error('Failed to fetch tasks');
        }

        const data = await response.json();
        const membership = data as TeamMembership[];
        console.log(useTeamMembership);
        
        return membership;
    } catch (error) {
        console.error('Error fetching tasks:', error);
        return null; // Devuelve una lista vacía en caso de error
    }
};
