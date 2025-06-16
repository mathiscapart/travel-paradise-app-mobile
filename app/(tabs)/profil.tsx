import {useAuth} from "@/hooks/useAuth";
import {StyleSheet, TextInput, View, Text} from "react-native";
import React, {useEffect, useState} from "react";
import {Image} from "expo-image";
import PrimaryButton from "@/components/PrimaryButton";
import {useUser} from "@/hooks/useUser";
import { User } from "@/services/authService";

export default function Profil(){
    const [isLoading, setIsLoading] = useState(false)
    const [errors, setErrors] = useState<{email?: string, password?: string, lastName?: string, firstName?: string, image?: string}>({});
    const [email, setEmail] = useState<string | undefined>()
    const [password, setPassword] = useState<string | undefined>()
    const [lastName, setLastName] = useState<string | undefined>()
    const [firstName, setFirstName] = useState<string | undefined>()
    const [phone, setPhone] = useState<string | undefined>()
    const [avatar, setAvatar] = useState<string | undefined>()
    const [country, setCountry] = useState<string | undefined>()
    const [language, setLanguage] = useState<string | undefined>();
    const { user } = useAuth();
    const { user: userContext, updateUser } = useUser();

    useEffect(() => {
        setAvatar(user?.avatar);
        setEmail(user?.email);
        setLastName(user?.lastName);
        setFirstName(user?.firstName);
        setPhone(user?.phone);
        setCountry(user?.country);
        setLanguage(user?.language);
    }, [user]);

    const handleUser = async () => {
        try {
            setIsLoading(true);

            const updatedUser: User = {
                id: user?.id || "",
                email: email ?? "",
                country: country ?? "",
                phone: phone ?? "",
                firstName: firstName ?? "",
                lastName: lastName ?? "",
                language: language ?? "",
                avatar: avatar ?? "",
                role: user?.role || "",
            };

            await updateUser(updatedUser);
        } catch (e) {
            console.log(e);
        } finally {
            setIsLoading(false);
        }
    };

    const styles = StyleSheet.create(
        {
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
            formSection: {
                flex: 0.6,
                justifyContent: 'center',
                alignItems: 'center',
                paddingTop: 20,
                paddingBottom: 10,
                backgroundColor: "#F1F6FD",
            },
            text: {
                color: "#161D53",
                fontSize: 32,
                fontFamily: 'BeVietnam-Regular',
                padding: 10,
            }
        }
    )

    return(
        <View style={styles.formSection}>
            <Text style={styles.text}>Profile</Text>
            <View style={styles.inputContainer}>
                <Image source={avatar}></Image>
                <TextInput
                    placeholderTextColor="#161D53"
                    placeholder="Url"
                    style={[
                        styles.input,
                        errors.image && styles.inputError
                    ]}
                    keyboardType="url"
                    autoCapitalize="none"
                    value={avatar}
                    onChangeText={(text) => {
                        //setEmail(text);
                        //if (errors.email) {
                        //    setErrors(prev => ({ ...prev, email: undefined }));
                        //}
                        setAvatar(text)
                        console.log(text)
                    }}
                    editable={!isLoading}
                />
            </View>
            <View style={styles.inputContainer}>
                <Text>
                    Email
                </Text>
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
                        setEmail(text)
                        console.log(text)
                    }}
                    editable={!isLoading}
                />
            </View>
            <View style={styles.inputContainer}>
                <Text>
                    Password
                </Text>
                <TextInput
                    placeholderTextColor="#161D53"
                    placeholder="Password"
                    style={[
                        styles.input,
                        errors.password && styles.inputError
                    ]}
                    keyboardType="default"
                    autoCapitalize="none"
                    value={password}
                    onChangeText={(text) => {
                        //setEmail(text);
                        //if (errors.email) {
                        //    setErrors(prev => ({ ...prev, email: undefined }));
                        //}
                        setPassword(text)
                        console.log(text)
                    }}
                    editable={!isLoading}
                />
            </View>
            <View style={styles.inputContainer}>
                <Text>
                   Name
                </Text>
                <TextInput
                    placeholderTextColor="#161D53"
                    placeholder="First Name"
                    style={[
                        styles.input,
                        errors.firstName && styles.inputError
                    ]}
                    keyboardType="default"
                    autoCapitalize="none"
                    value={firstName}
                    onChangeText={(text) => {
                        //setEmail(text);
                        //if (errors.email) {
                        //    setErrors(prev => ({ ...prev, email: undefined }));
                        //}
                        setFirstName(text)
                        console.log(text)
                    }}
                    editable={!isLoading}
                />
            </View>
            <View style={styles.inputContainer}>
                <Text>
                    Last Name
                </Text>
                <TextInput
                    placeholderTextColor="#161D53"
                    placeholder="Last Name"
                    style={[
                        styles.input,
                        errors.lastName && styles.inputError
                    ]}
                    keyboardType="default"
                    autoCapitalize="none"
                    value={lastName}
                    onChangeText={(text) => {
                        //setEmail(text);
                        //if (errors.email) {
                        //    setErrors(prev => ({ ...prev, email: undefined }));
                        //}
                        setLastName(text)
                        console.log(text)
                    }}
                    editable={!isLoading}
                />
            </View>
            <PrimaryButton title={"Change settings"} maxWidth={"100%"} onPress={handleUser}></PrimaryButton>
        </View>
    )
}
