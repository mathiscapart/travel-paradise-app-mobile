import {authService, User} from "@/services/authService"

const API_BASE_URL = process.env.EXPO_PUBLIC_API_BASE_URL

export interface UserResponse {
    response: string;
}

class UserService{
    async update(credentials: User): Promise<UserResponse>{
        const token = await authService.getToken();
        console.log(token)
        console.log(credentials)
        try{
            const response = await fetch(`${API_BASE_URL}/users/${credentials.id}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(credentials),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Erreur de connexion');
            }

            const data: UserResponse = await response.json();

            return data;
        } catch (error) {
            console.error('Erreur lors de la connexion:', error);
            throw error;
        }
    }
}

export const userService = new UserService();
