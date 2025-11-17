import React from "react";
import { Pressable, StyleSheet, Text } from "react-native";
import { MotiView } from "moti";

export default function FloatingCartButton({ onPress, theme }) {
    return (
        <Pressable onPress={onPress} style={styles.wrapper}>
            <MotiView
                from={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", damping: 12 }}
                style={[styles.btn, { backgroundColor: theme.primary }]}
            >
                <Text style={styles.icon}>🛒</Text>
            </MotiView>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        position: "absolute",
        right: 20,
        top: 20,
        zIndex: 40,
    },
    btn: {
        width: 44,
        height: 44,
        borderRadius: 22,
        justifyContent: "center",
        alignItems: "center",
        shadowOpacity: 0.4,
        shadowRadius: 8,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 3 },
        elevation: 10,
    },
    icon: {
        fontSize: 24,
    },
});
