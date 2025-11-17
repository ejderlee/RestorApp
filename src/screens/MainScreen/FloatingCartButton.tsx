import React from "react";
import { Pressable, StyleSheet, Text } from "react-native";
import { MotiView } from "moti";
import { AppTheme } from "../../theme/theme";

interface Props {
    theme: AppTheme;
    onPress: () => void;
    itemCount?: number;
}

export default function FloatingCartButton({ theme, onPress, itemCount = 0 }: Props) {
    return (
        <Pressable onPress={onPress} style={styles.wrapper}>
            <MotiView
                from={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", damping: 12 }}
                style={[
                    styles.btn,
                    {
                        backgroundColor: theme.primary,
                        shadowColor: theme.shadow,
                    },
                ]}
            >
                <Text style={styles.icon}>🛒</Text>
                {itemCount > 0 && (
                    <MotiView
                        from={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ type: "spring", damping: 12 }}
                        style={styles.badge}
                    >
                        <Text style={styles.badgeText}>{itemCount}</Text>
                    </MotiView>
                )}
            </MotiView>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        position: "absolute",
        right: 20,
        bottom: 120,
        zIndex: 40,
    },
    btn: {
        width: 52,
        height: 52,
        borderRadius: 26,
        justifyContent: "center",
        alignItems: "center",
        shadowOpacity: 0.4,
        shadowRadius: 8,
        shadowOffset: { width: 0, height: 3 },
        elevation: 10,
    },
    icon: {
        fontSize: 24,
        color: "#fff",
    },
    badge: {
        position: "absolute",
        top: -4,
        right: -4,
        backgroundColor: "#ef4444",
        width: 22,
        height: 22,
        borderRadius: 11,
        justifyContent: "center",
        alignItems: "center",
    },
    badgeText: {
        color: "#fff",
        fontSize: 11,
        fontWeight: "700",
    },
});
