import React from "react";
import {
    View,
    Text,
    Pressable,
    StyleSheet,
    ScrollView,
    Dimensions,
} from "react-native";
import { MotiView, MotiText } from "moti";
import Haptic from "react-native-haptic-feedback";
import { ThemeName, allThemes, AppTheme } from "../theme";

const SCREEN_HEIGHT = Dimensions.get("window").height;

interface Props {
    visible: boolean;
    onClose: () => void;
    currentTheme: ThemeName;
    onSelect: (t: ThemeName) => void;
}

export default function ThemeSelector({
                                          visible,
                                          onClose,
                                          currentTheme,
                                          onSelect,
                                      }: Props) {
    if (!visible) return null;

    const theme: AppTheme = allThemes[currentTheme];

    const handleSelect = (t: ThemeName) => {
        onSelect(t);

        // 🔥 Haptic Feedback (Expo’suz Native)
        Haptic.trigger("impactMedium", {
            enableVibrateFallback: true,
            ignoreAndroidSystemSettings: false,
        });

        onClose();
    };

    return (
        <View style={styles.overlay}>
            {/* gri backdrop */}
            <Pressable style={styles.backdrop} onPress={onClose} />

            <MotiView
                from={{ translateY: SCREEN_HEIGHT }}
                animate={{ translateY: 0 }}
                transition={{ type: "spring", damping: 18 }}
                style={[styles.modal, { backgroundColor: theme.surface }]}
            >
                <Text style={[styles.title, { color: theme.text }]}>Tema Seç</Text>

                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    {Object.keys(allThemes).map((name: string) => {
                        const key = name as ThemeName;
                        const t = allThemes[key];

                        const selected = key === currentTheme;

                        return (
                            <Pressable
                                key={key}
                                onPress={() => handleSelect(key)}
                                style={styles.cardWrapper}
                            >
                                <MotiView
                                    from={{ scale: 0.9, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    transition={{ type: "spring", damping: 14, delay: 80 }}
                                    style={[
                                        styles.card,
                                        {
                                            backgroundColor: t.bg,
                                            borderColor: selected ? t.primary : "transparent",
                                            borderWidth: selected ? 3 : 1,
                                        },
                                    ]}
                                >
                                    {/* PREVIEW BARS */}
                                    <View style={styles.previewColumn}>
                                        <View
                                            style={[styles.previewBar, { backgroundColor: t.primary }]}
                                        />
                                        <View
                                            style={[styles.previewBar, { backgroundColor: t.secondary }]}
                                        />
                                        <View
                                            style={[
                                                styles.previewBarSmall,
                                                { backgroundColor: t.surface },
                                            ]}
                                        />
                                    </View>

                                    <MotiText
                                        from={{ opacity: 0, translateY: 6 }}
                                        animate={{ opacity: 1, translateY: 0 }}
                                        transition={{ duration: 350 }}
                                        style={[styles.cardText, { color: t.text }]}
                                    >
                                        {key}
                                    </MotiText>
                                </MotiView>
                            </Pressable>
                        );
                    })}
                </ScrollView>
            </MotiView>
        </View>
    );
}

const styles = StyleSheet.create({
    overlay: {
        ...StyleSheet.absoluteFillObject,
        zIndex: 100,
        justifyContent: "flex-end",
    },
    backdrop: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: "rgba(0,0,0,0.45)",
    },
    modal: {
        paddingTop: 20,
        paddingBottom: 40,
        paddingHorizontal: 20,
        borderTopLeftRadius: 26,
        borderTopRightRadius: 26,
        elevation: 10,
    },
    title: {
        fontSize: 18,
        fontWeight: "700",
        marginBottom: 16,
    },
    cardWrapper: {
        marginRight: 16,
    },
    card: {
        width: 140,
        height: 150,
        borderRadius: 20,
        padding: 14,
        justifyContent: "flex-end",
        shadowColor: "#000",
        shadowOpacity: 0.25,
        shadowRadius: 12,
        shadowOffset: { width: 0, height: 6 },
        elevation: 10,
    },
    cardText: {
        fontSize: 14,
        fontWeight: "600",
        marginTop: 10,
        textTransform: "capitalize",
    },
    previewColumn: {
        flexDirection: "column",
    },
    previewBar: {
        width: "100%",
        height: 22,
        borderRadius: 6,
        marginBottom: 8,
    },
    previewBarSmall: {
        width: "100%",
        height: 10,
        borderRadius: 6,
        opacity: 0.8,
    },
});
