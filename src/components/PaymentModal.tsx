import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text, Pressable } from "react-native";
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withTiming,
    withSequence,
} from "react-native-reanimated";
import { MotiText, MotiView } from "moti";

export default function PaymentModal({ visible, onClose, theme }) {
    const scale = useSharedValue(0.5);
    const opacity = useSharedValue(0);

    const [phase, setPhase] = useState<"loading" | "done">("loading");

    const animatedCard = useAnimatedStyle(() => ({
        opacity: opacity.value,
        transform: [{ scale: scale.value }],
    }));

    useEffect(() => {
        if (visible) {
            opacity.value = withTiming(1, { duration: 200 });
            scale.value = withTiming(1, { duration: 250 });

            setTimeout(() => setPhase("done"), 2000);
        } else {
            opacity.value = withTiming(0, { duration: 150 });
            scale.value = withTiming(0.5, { duration: 150 });
            setPhase("loading");
        }
    }, [visible]);

    if (!visible) return null;

    return (
        <View style={styles.overlay}>
            <Animated.View style={[styles.card, animatedCard, { backgroundColor: theme.surface }]}>
                {phase === "loading" && (
                    <>
                        <MotiText
                            from={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            style={[styles.title, { color: theme.text }]}
                        >
                            Ödeme İşleniyor...
                        </MotiText>

                        <MotiView
                            from={{ scale: 0.6, opacity: 0 }}
                            animate={{
                                scale: 1,
                                opacity: 1,
                                rotateZ: "360deg",
                            }}
                            transition={{ repeat: Infinity, duration: 1200 }}
                            style={styles.loader}
                        />
                    </>
                )}

                {phase === "done" && (
                    <>
                        <MotiText
                            from={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 500 }}
                            style={[styles.title, { color: theme.text }]}
                        >
                            Sipariş Tamamlandı 🎉
                        </MotiText>

                        <Pressable onPress={onClose} style={styles.button}>
                            <Text style={{ color: "#fff" }}>Kapat</Text>
                        </Pressable>
                    </>
                )}
            </Animated.View>
        </View>
    );
}

const styles = StyleSheet.create({
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: "rgba(0,0,0,0.55)",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 100,
    },
    card: {
        width: 260,
        padding: 24,
        borderRadius: 18,
        alignItems: "center",
    },
    title: {
        fontSize: 18,
        fontWeight: "700",
        marginBottom: 20,
    },
    loader: {
        width: 34,
        height: 34,
        borderRadius: 17,
        borderWidth: 3,
        borderTopColor: "#fbbf24",
        borderRightColor: "transparent",
        borderBottomColor: "#fbbf24",
        borderLeftColor: "transparent",
    },
    button: {
        marginTop: 18,
        backgroundColor: "#4ade80",
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 999,
    },
});
