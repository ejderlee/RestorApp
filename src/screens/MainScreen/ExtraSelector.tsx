import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { MotiView } from "moti";
import { DishExtra } from "../../types";
import { AppTheme } from "../../theme/theme";

interface Props {
    extras: DishExtra[];
    selected: Record<string, number>; // { extraId: count }
    onChange: (extraId: string, count: number) => void;
    theme: AppTheme;
}

export default function ExtraSelector({ extras, selected, onChange, theme }: Props) {
    return (
        <View>
            {extras.map((ex) => {
                const count = selected[ex.id] || 0;

                return (
                    <View key={ex.id} style={styles.row}>
                        <View style={{ flex: 1 }}>
                            <Text style={[styles.extraName, { color: theme.text }]}>
                                {ex.name}
                            </Text>
                            <Text style={[styles.extraPrice, { color: theme.subText }]}>
                                + ₺{ex.price}
                            </Text>
                        </View>

                        <View style={styles.counterRow}>
                            <Pressable
                                onPress={() => onChange(ex.id, Math.max(0, count - 1))}
                                style={[styles.counterBtn, { borderColor: theme.cardBorder }]}
                            >
                                <Text style={[styles.counterText, { color: theme.text }]}>-</Text>
                            </Pressable>

                            <MotiView
                                from={{ scale: 0.8, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                key={count} // yeniden animasyon
                            >
                                <Text style={[styles.count, { color: theme.text }]}>{count}</Text>
                            </MotiView>

                            <Pressable
                                onPress={() => onChange(ex.id, count + 1)}
                                style={[styles.counterBtn, { borderColor: theme.cardBorder }]}
                            >
                                <Text style={[styles.counterText, { color: theme.text }]}>+</Text>
                            </Pressable>
                        </View>
                    </View>
                );
            })}
        </View>
    );
}

const styles = StyleSheet.create({
    row: {
        flexDirection: "row",
        paddingVertical: 10,
        alignItems: "center",
    },
    extraName: {
        fontSize: 14,
        fontWeight: "600",
    },
    extraPrice: {
        fontSize: 12,
        marginTop: 2,
    },
    counterRow: {
        flexDirection: "row",
        alignItems: "center",
        gap: 12,
    },
    counterBtn: {
        width: 28,
        height: 28,
        borderRadius: 14,
        borderWidth: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    counterText: {
        fontSize: 16,
        fontWeight: "700",
    },
    count: {
        fontSize: 15,
        fontWeight: "700",
    },
});
