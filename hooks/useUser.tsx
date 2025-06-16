import { createContext, ReactNode, useContext, useState, useEffect } from "react";
import { authService, User } from "@/services/authService";
import { userService } from "@/services/userService";

interface UserProviderProps {
    children: ReactNode;
}

interface UserContextType {
    user: User | null;
    updateUser: (userData: User) => Promise<void>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: UserProviderProps) {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        async function loadUser() {
            const userData = await authService.getUserFromToken();
            setUser(userData);
        }
        loadUser();
    }, []);

    const updateUser = async (userData: User) => {
        try {
            await userService.update(userData);
            setUser(userData);
        } catch (error) {
            console.error('Erreur lors de la mise à jour utilisateur:', error);
            throw error;
        }
    };

    return (
        <UserContext.Provider value={{ user, updateUser }}>
            {children}
        </UserContext.Provider>
    );
}

export function useUser(): UserContextType {
    const context = useContext(UserContext);
    if (context === undefined) {
        throw new Error("useUser doit être utilisé dans un UserProvider");
    }
    return context;
}
