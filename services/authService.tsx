import AsyncStorage from '@react-native-async-storage/async-storage';

const API_BASE_URL = process.env.EXPO_PUBLIC_API_BASE_URL;

export interface LoginCredentials {
    email: string;
    password: string;
}

export interface LoginResponse {
    token: string;
}

export interface User {
    id: string;
    email: string;
    country: string,
    phone: string,
    firstName: string;
    lastName: string;
    language: string;
    avatar?: string;
    role: string;
}

class AuthService {
    private tokenKey = 'auth_token';

    async login(credentials: LoginCredentials): Promise<LoginResponse> {
        try {
            const response = await fetch(`${API_BASE_URL}/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(credentials),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Erreur de connexion');
            }

            const data: LoginResponse = await response.json();

            await this.saveToken(data.token);

            return data;
        } catch (error) {
            console.error('Erreur lors de la connexion:', error);
            throw error;
        }
    }

    async saveToken(token: string): Promise<void> {
        try {
            await AsyncStorage.setItem(this.tokenKey, token);
        } catch (error) {
            console.error('Erreur lors de la sauvegarde du token:', error);
            throw error;
        }
    }

    async getToken(): Promise<string | null> {
        try {
            return await AsyncStorage.getItem(this.tokenKey);
        } catch (error) {
            console.error('Erreur lors de la récupération du token:', error);
            return null;
        }
    }

    async removeToken(): Promise<void> {
        try {
            await AsyncStorage.removeItem(this.tokenKey);
        } catch (error) {
            console.error('Erreur lors de la suppression du token:', error);
            throw error;
        }
    }

    async isAuthenticated(): Promise<boolean> {
        const token = await this.getToken();
        if (!token) return false;

        try {
            const payload = JSON.parse(atob(token.split('.')[1]));
            const currentTime = Date.now() / 1000;

            return payload.exp > currentTime;
        } catch (error) {
            console.error('Token invalide:', error);
            return false;
        }
    }

    async getUserFromToken(): Promise<User | null> {
        const token = await this.getToken();
        if (!token) return null;

        try {
            const payload = JSON.parse(atob(token.split('.')[1]));
            return {
                id: payload.id,
                email: payload.email,
                country: payload.country,
                phone: payload.phone,
                firstName: payload.firstName,
                lastName: payload.lastName,
                language: payload.language,
                avatar: payload.avatar,
                role: payload.role,
            };
        } catch (error) {
            console.error('Erreur lors du décodage du token:', error);
            return null;
        }
    }

    async authenticatedFetch(url: string, options: RequestInit = {}): Promise<Response> {
        const token = await this.getToken();

        if (!token) {
            throw new Error('Aucun token d\'authentification');
        }

        return fetch(url, {
            ...options,
            headers: {
                ...options.headers,
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });
    }

    async logout(): Promise<void> {
        await this.removeToken();
    }
}

export const authService = new AuthService();
