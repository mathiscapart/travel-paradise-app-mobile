import React, { useState } from 'react';
import {
    StyleSheet,
    TextInput,
    View,
    Alert,
    ActivityIndicator,
    Text,
} from 'react-native';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import PrimaryButton from '@/components/PrimaryButton';
import Logo from '@/components/Logo';
import { useAuth } from '@/hooks/useAuth';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState<{email?: string, password?: string}>({});

    const { login } = useAuth();
    const router = useRouter();

    const validateForm = (): boolean => {
        const newErrors: {email?: string, password?: string} = {};

        if (!email.trim()) {
            newErrors.email = 'L\'email est requis';
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            newErrors.email = 'Format d\'email invalide';
        }

        if (!password.trim()) {
            newErrors.password = 'Le mot de passe est requis';
        } else if (password.length < 3) {
            newErrors.password = 'Le mot de passe doit contenir au moins 6 caractères';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleLogin = async () => {
        if (!validateForm()) return;

        try {
            setIsLoading(true);
            setErrors({});

            await login({ email: email.trim(), password });

            router.replace('/');

        } catch (error) {
            console.error('Erreur de connexion:', error);

            const errorMessage = error instanceof Error ? error.message : 'Erreur de connexion';

            Alert.alert(
                'Erreur de connexion',
                errorMessage,
                [{ text: 'OK' }]
            );
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <Image
                style={styles.backgroundImage}
                onError={() => console.log('Image failed to load')}
                source={require('@/assets/images/background-travel.png')}
            />
            <View style={styles.content}>
                <View style={styles.logoSection}>
                    <Logo />
                </View>

                <View style={styles.formSection}>
                    <View style={styles.inputContainer}>
                        <TextInput
                            placeholderTextColor="#161D53"
                            placeholder="Email"
                            style={[
                                styles.input,
                                errors.email && styles.inputError
                            ]}
                            keyboardType="email-address"
                            autoCapitalize="none"
                            value={email}
                            onChangeText={(text) => {
                                setEmail(text);
                                if (errors.email) {
                                    setErrors(prev => ({ ...prev, email: undefined }));
                                }
                            }}
                            editable={!isLoading}
                        />
                        {errors.email && (
                            <Text style={styles.errorText}>{errors.email}</Text>
                        )}
                    </View>

                    <View style={styles.inputContainer}>
                        <TextInput
                            placeholderTextColor="#161D53"
                            placeholder="Mot de passe"
                            style={[
                                styles.input,
                                errors.password && styles.inputError
                            ]}
                            secureTextEntry={true}
                            autoCapitalize="none"
                            value={password}
                            onChangeText={(text) => {
                                setPassword(text);
                                if (errors.password) {
                                    setErrors(prev => ({ ...prev, password: undefined }));
                                }
                            }}
                            editable={!isLoading}
                        />
                        {errors.password && (
                            <Text style={styles.errorText}>{errors.password}</Text>
                        )}
                    </View>

                    <View style={styles.buttonContainer}>
                        {isLoading ? (
                            <ActivityIndicator size="large" color="#8C52FF" />
                        ) : (
                            <PrimaryButton
                                title="Se connecter"
                                maxWidth="70%"
                                onPress={handleLogin}
                            />
                        )}
                    </View>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: 'relative',
    },
    backgroundImage: {
        position: 'absolute',
        top: '10%',
        left: 0,
        right: 0,
        bottom: 0,
        width: '100%',
        height: '90%',
        resizeMode: 'cover',
        zIndex: -1,
    },
    content: {
        flex: 1,
        paddingHorizontal: 20,
        zIndex: 1,
    },
    logoSection: {
        flex: 0.4,
        justifyContent: 'flex-end',
        alignItems: 'center',
        paddingTop: 10,
    },
    formSection: {
        flex: 0.6,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 20,
        paddingBottom: 10,
    },
    inputContainer: {
        width: '80%',
        marginBottom: 15,
    },
    input: {
        width: '100%',
        borderRadius: 10,
        color: '#161D53',
        backgroundColor: '#e7e4e4',
        fontFamily: 'BeVietnam-Regular',
        borderColor: '#000000',
        fontSize: 16,
        paddingHorizontal: 20,
        paddingVertical: 15,
    },
    inputError: {
        borderColor: '#FF4444',
        borderWidth: 1,
    },
    errorText: {
        color: '#FF4444',
        fontSize: 12,
        marginTop: 5,
        marginLeft: 5,
        fontFamily: 'BeVietnam-Regular',
    },
    buttonContainer: {
        width: '80%',
        alignItems: 'center',
        marginTop: 20,
    },
    signupLink: {
        marginTop: 20,
        padding: 10,
    },
    signupText: {
        color: '#161D53',
        fontSize: 14,
        fontFamily: 'BeVietnam-Regular',
    },
    signupTextBold: {
        fontWeight: 'bold',
        color: '#8C52FF',
    },
});
