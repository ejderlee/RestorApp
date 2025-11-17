import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { MotiText } from "moti";
import { AppTheme } from "../../theme/theme";

interface Props {
    theme: AppTheme;
    title?: string;
    subtitle?: string;
    onOpenThemeSelector: () => void;
}

export default function Header({
                                   theme,
                                   title = "Lezzet Durakları",
                                   subtitle = "En sevdiğin yemekleri birkaç dokunuşla sipariş et.",
                                   onOpenThemeSelector,
                               }: Props) {
    return (
        <LinearGradient
            colors={[theme.primary, theme.secondary]}
            style={styles.header}
        >
            <View style={styles.row}>
                <View style={{ flex: 1 }}>
                    <MotiText
                        from={{ translateY: -30, opacity: 0 }}
                        animate={{ translateY: 0, opacity: 1 }}
                        transition={{ type: "timing", duration: 500 }}
                        style={styles.title}
                    >
                        {title}
                    </MotiText>
                    <MotiText
                        from={{ opacity: 0, translateY: -6 }}
                        animate={{ opacity: 1, translateY: 0 }}
                        transition={{ type: "timing", duration: 600, delay: 80 }}
                        style={styles.subtitle}
                    >
                        {subtitle}
                    </MotiText>
                </View>

                {/* Tema seçici buton */}
                <Pressable onPress={onOpenThemeSelector} style={styles.themeBtn}>
                    <Text style={styles.themeEmoji}>🎨</Text>
                </Pressable>
            </View>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    header: {
        paddingBottom: 18,
        paddingHorizontal: 20,
        borderBottomLeftRadius: 24,
        borderBottomRightRadius: 24,
        elevation: 16,
    },
    row: {
        marginTop: 12,
        flexDirection: "row",
        alignItems: "center",
    },
    title: {
        fontSize: 26,
        fontWeight: "800",
        color: "#ffffff",
        letterSpacing: 1,
    },
    subtitle: {
        fontSize: 13,
        color: "rgba(255,255,255,0.9)",
        marginTop: 6,
    },
    themeBtn: {
        marginLeft: 12,
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: "rgba(0,0,0,0.25)",
        alignItems: "center",
        justifyContent: "center",
    },
    themeEmoji: {
        fontSize: 22,
    },
});
