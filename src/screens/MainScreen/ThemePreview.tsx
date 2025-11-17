import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { AppTheme } from "../../theme/theme";
import { MotiView } from "moti";

interface Props {
    theme: AppTheme;
}

/**
 * Tema seçici modalında görünen mini canlı ekran önizleme.
 * Çok hafif, sade ve gerçek uygulamanın küçük bir temsilidir.
 */
export default function ThemePreview({ theme }: Props) {
    return (
        <MotiView
            from={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "timing", duration: 300 }}
            style={[styles.container, { backgroundColor: theme.bg }]}
        >
            {/* Mini Header */}
            <View
                style={[
                    styles.header,
                    {
                        backgroundColor: theme.primary,
                        borderBottomColor: theme.secondary,
                    },
                ]}
            >
                <Text style={[styles.headerText, { color: theme.text }]}>
                    Önizleme
                </Text>
            </View>

            {/* Mini grid simülasyonu */}
            <View style={styles.grid}>
                <View
                    style={[
                        styles.card,
                        { backgroundColor: theme.surface, borderColor: theme.cardBorder },
                    ]}
                />
                <View
                    style={[
                        styles.card,
                        { backgroundColor: theme.surface, borderColor: theme.cardBorder },
                    ]}
                />
            </View>

            <View style={styles.grid}>
                <View
                    style={[
                        styles.card,
                        { backgroundColor: theme.surface, borderColor: theme.cardBorder },
                    ]}
                />
                <View
                    style={[
                        styles.card,
                        { backgroundColor: theme.surface, borderColor: theme.cardBorder },
                    ]}
                />
            </View>
        </MotiView>
    );
}

const styles = StyleSheet.create({
    container: {
        width: 120,
        borderRadius: 14,
        overflow: "hidden",
        paddingBottom: 10,
        borderWidth: 1,
        borderColor: "rgba(255,255,255,0.06)",
    },
    header: {
        height: 26,
        justifyContent: "center",
        alignItems: "center",
        borderBottomWidth: 2,
    },
    headerText: {
        fontSize: 10,
        fontWeight: "700",
    },
    grid: {
        flexDirection: "row",
        justifyContent: "space-evenly",
        paddingVertical: 6,
    },
    card: {
        width: 38,
        height: 32,
        borderRadius: 6,
        borderWidth: 1,
    },
});
