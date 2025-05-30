import {Text, TouchableOpacity, StyleSheet, GestureResponderEvent, DimensionValue} from "react-native";
import React from 'react';

type PrimaryButton = {
    onPress?: ((event: GestureResponderEvent) => void) | undefined
    title: string
    maxWidth: DimensionValue | undefined
};

function PrimaryButton ({ onPress, title, maxWidth }: PrimaryButton){
    const styles = StyleSheet.create({
        button: {
            backgroundColor: "#4353FE",
            borderRadius: 7,
            padding: 10,
            maxHeight: 40,
            maxWidth: maxWidth
        },
        buttonText: {
            fontStyle: "normal",
            color: "white",
            textAlign: "center"
        }
    })

    return (
        <TouchableOpacity onPress={onPress} style={styles.button}>
            <Text style={styles.buttonText}>{title}</Text>
        </TouchableOpacity>
    )
}

export default PrimaryButton;
