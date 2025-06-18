import { useState, useEffect, createContext, useContext, ReactNode } from 'react';
import { authService, User, LoginCredentials } from '@/services/authService';

interface AuthContextType {
    user: User | null;
    isLoading: boolean;
    isAuthenticated: boolean;
    login: (credentials: LoginCredentials) => Promise<void>;
    logout: () => Promise<void>;
    checkAuthStatus: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
    children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const checkAuthStatus = async () => {
        try {
            setIsLoading(true);
            const authenticated = await authService.isAuthenticated();

            if (authenticated) {
                const userData = await authService.getUserFromToken();
                setUser(userData);
                setIsAuthenticated(true);
            } else {
                setUser(null);
                setIsAuthenticated(false);
            }
        } catch (error) {
            console.error('Erreur lors de la vérification du statut d\'authentification:', error);
            setUser(null);
            setIsAuthenticated(false);
        } finally {
            setIsLoading(false);
        }
    };

    const login = async (credentials: LoginCredentials) => {
        try {
            setIsLoading(true);
            await authService.login(credentials);
            await checkAuthStatus();
        } catch (error) {
            console.error('Erreur lors de la connexion:', error);
            throw error;
        } finally {
            setIsLoading(false);
        }
    };

    const logout = async () => {
        try {
            setIsLoading(true);
            await authService.logout();
            setUser(null);
            setIsAuthenticated(false);
        } catch (error) {
            console.error('Erreur lors de la déconnexion:', error);
            throw error;
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        checkAuthStatus();
    }, []);

    const value: AuthContextType = {
        user,
        isLoading,
        isAuthenticated,
        login,
        logout,
        checkAuthStatus,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth(): AuthContextType {
    const context = useContext(AuthContext);

    if (context === undefined) {
        throw new Error('useAuth doit être utilisé dans un AuthProvider');
    }

    return context;
}
