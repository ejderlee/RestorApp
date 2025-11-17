import React from "react";
import { View, Text, StyleSheet, ScrollView, Pressable } from "react-native";
import { AppTheme } from "../../theme/theme";

export type CategoryType =
    | "Hepsi"
    | "Burger"
    | "Pizza"
    | "Sushi"
    | "Sağlıklı"
    | "Atıştırmalık";

interface Props {
    theme: AppTheme;
    selected: CategoryType;
    onSelect: (c: CategoryType) => void;
}

const CATEGORIES: { label: CategoryType; icon: string }[] = [
    { label: "Hepsi",         icon: "⭐" },
    { label: "Burger",        icon: "🍔" },
    { label: "Pizza",         icon: "🍕" },
    { label: "Sushi",         icon: "🍣" },
    { label: "Sağlıklı",      icon: "🥗" },
    { label: "Atıştırmalık",  icon: "🌮" },
];

export default function CategoriesSection({ theme, selected, onSelect }: Props) {
    return (
        <View style={styles.wrapper}>
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
            >
                {CATEGORIES.map((c) => {
                    const active = c.label === selected;
                    return (
                        <Pressable
                            key={c.label}
                            onPress={() => onSelect(c.label)}
                            style={[
                                styles.chip,
                                {
                                    backgroundColor: active
                                        ? theme.primary
                                        : theme.surface,
                                    borderColor: active
                                        ? "transparent"
                                        : theme.cardBorder,
                                },
                            ]}
                        >
                            <Text
                                style={[
                                    styles.chipEmoji,
                                    { opacity: active ? 1 : 0.9 },
                                ]}
                            >
                                {c.icon}
                            </Text>
                            <Text
                                style={[
                                    styles.chipText,
                                    { color: active ? "#fff" : theme.text },
                                ]}
                            >
                                {c.label}
                            </Text>
                        </Pressable>
                    );
                })}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        marginTop: 10,
    },
    scrollContent: {
        paddingHorizontal: 6,
    },
    chip: {
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 999,
        flexDirection: "row",
        alignItems: "center",
        marginRight: 8,
        borderWidth: 1,
    },
    chipEmoji: {
        fontSize: 16,
        marginRight: 4,
    },
    chipText: {
        fontSize: 13,
        fontWeight: "600",
    },
});
