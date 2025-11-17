import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    StyleSheet,
    Pressable,
    ScrollView,
    Dimensions,
} from "react-native";
import { MotiView } from "moti";
import { Dish } from "../../types";
import { AppTheme } from "../../theme/theme";
import ExtraSelector from "./ExtraSelector";

const { height } = Dimensions.get("window");

type ExtrasMap = Record<string, number>;

interface Props {
    visible: boolean;
    dish: Dish | null;
    theme: AppTheme;
    onClose: () => void;
    onAddToCart: (dish: Dish, extras?: ExtrasMap) => void;
}

export default function DishDetailSheet({
                                            visible,
                                            dish,
                                            theme,
                                            onClose,
                                            onAddToCart,
                                        }: Props) {
    const [extraCounts, setExtraCounts] = useState<ExtrasMap>({});

    // Yeni ürün açıldığında ekstraları sıfırla
    useEffect(() => {
        if (dish) {
            setExtraCounts({});
        }
    }, [dish?.id]);

    if (!visible || !dish) return null;

    const ratingText =
        dish.rating && dish.ratingCount
            ? `⭐ ${dish.rating.toFixed(1)} (${dish.ratingCount})`
            : undefined;

    const metaParts: string[] = [];
    if (dish.prepTime) metaParts.push(`⏱ ${dish.prepTime}`);
    if (dish.kcal) metaParts.push(`${dish.kcal} kcal`);
    const metaText = metaParts.join(" · ");

    const handleAdd = () => {
        onAddToCart(dish, extraCounts);
        onClose();
    };

    return (
        <View style={styles.overlay}>
            {/* Arka plan karartma */}
            <Pressable style={styles.backdrop} onPress={onClose} />

            {/* Alt Sheet */}
            <MotiView
                from={{ translateY: height, opacity: 0 }}
                animate={{ translateY: 0, opacity: 1 }}
                exit={{ translateY: height, opacity: 0 }}
                transition={{ type: "timing", duration: 260 }}
                style={[styles.sheet, { backgroundColor: theme.surface }]}
            >
                <View style={styles.handleWrapper}>
                    <View style={styles.handle} />
                </View>

                <ScrollView
                    contentContainerStyle={[styles.content, { paddingBottom: 24 }]}
                    showsVerticalScrollIndicator={false}
                >
                    {/* Emoji + isim + fiyat */}
                    <View style={styles.headerRow}>
                        <View style={styles.emojiBubble}>
                            <Text style={styles.emoji}>{dish.image}</Text>
                        </View>

                        <View style={{ flex: 1, marginLeft: 12 }}>
                            <Text style={[styles.name, { color: theme.text }]}>
                                {dish.name}
                            </Text>

                            {ratingText && (
                                <Text style={[styles.rating, { color: theme.subText }]}>
                                    {ratingText}
                                </Text>
                            )}

                            {metaText ? (
                                <Text style={[styles.meta, { color: theme.subText }]}>
                                    {metaText}
                                </Text>
                            ) : null}
                        </View>

                        <Text style={[styles.price, { color: theme.primary }]}>
                            ₺{dish.price}
                        </Text>
                    </View>

                    {/* Badgeler */}
                    {dish.badges && dish.badges.length > 0 && (
                        <View style={styles.badgeRow}>
                            {dish.badges.map((b) => (
                                <View
                                    key={b}
                                    style={[
                                        styles.badge,
                                        { backgroundColor: theme.primary + "22" },
                                    ]}
                                >
                                    <Text
                                        style={[
                                            styles.badgeText,
                                            { color: theme.primary },
                                        ]}
                                    >
                                        {b}
                                    </Text>
                                </View>
                            ))}
                        </View>
                    )}

                    {/* Açıklama */}
                    {dish.description && (
                        <Text
                            style={[
                                styles.description,
                                { color: theme.text },
                            ]}
                        >
                            {dish.description}
                        </Text>
                    )}

                    {/* Ekstralar */}
                    {dish.extras && dish.extras.length > 0 && (
                        <View style={styles.section}>
                            <Text
                                style={[
                                    styles.sectionTitle,
                                    { color: theme.text },
                                ]}
                            >
                                Ekstralar
                            </Text>
                            <ExtraSelector
                                extras={dish.extras}
                                selected={extraCounts}
                                theme={theme}
                                onChange={(id, count) =>
                                    setExtraCounts((prev) => ({ ...prev, [id]: count }))
                                }
                            />
                        </View>
                    )}
                </ScrollView>

                {/* Alt butonlar */}
                <View style={styles.bottomRow}>
                    <Pressable
                        onPress={onClose}
                        style={[
                            styles.secondaryBtn,
                            { borderColor: theme.cardBorder },
                        ]}
                    >
                        <Text
                            style={[
                                styles.secondaryText,
                                { color: theme.subText },
                            ]}
                        >
                            Kapat
                        </Text>
                    </Pressable>

                    <Pressable
                        onPress={handleAdd}
                        style={[
                            styles.primaryBtn,
                            { backgroundColor: theme.primary },
                        ]}
                    >
                        <Text style={styles.primaryText}>Sepete Ekle</Text>
                    </Pressable>
                </View>
            </MotiView>
        </View>
    );
}

const styles = StyleSheet.create({
    overlay: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: "flex-end",
        zIndex: 300,
    },
    backdrop: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: "rgba(0,0,0,0.4)",
    },
    sheet: {
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        paddingTop: 8,
        paddingHorizontal: 16,
        maxHeight: height * 0.75,
        elevation: 20,
    },
    handleWrapper: {
        alignItems: "center",
        marginBottom: 4,
    },
    handle: {
        width: 44,
        height: 5,
        borderRadius: 999,
        backgroundColor: "rgba(255,255,255,0.35)",
    },
    content: {
        paddingTop: 10,
    },
    headerRow: {
        flexDirection: "row",
        alignItems: "center",
    },
    emojiBubble: {
        width: 64,
        height: 64,
        borderRadius: 32,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgba(0,0,0,0.06)",
    },
    emoji: {
        fontSize: 42,
    },
    name: {
        fontSize: 18,
        fontWeight: "800",
    },
    rating: {
        fontSize: 12,
        marginTop: 4,
    },
    meta: {
        fontSize: 12,
        marginTop: 2,
    },
    price: {
        fontSize: 20,
        fontWeight: "800",
        marginLeft: 12,
    },
    badgeRow: {
        flexDirection: "row",
        flexWrap: "wrap",
        marginTop: 10,
    },
    badge: {
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 999,
        marginRight: 6,
        marginBottom: 4,
    },
    badgeText: {
        fontSize: 11,
        fontWeight: "600",
    },
    description: {
        fontSize: 13,
        marginTop: 10,
        lineHeight: 19,
    },
    section: {
        marginTop: 16,
    },
    sectionTitle: {
        fontSize: 15,
        fontWeight: "700",
        marginBottom: 6,
    },
    bottomRow: {
        flexDirection: "row",
        paddingVertical: 12,
        gap: 8,
    },
    secondaryBtn: {
        flex: 1,
        borderRadius: 999,
        borderWidth: 1,
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 10,
    },
    secondaryText: {
        fontSize: 13,
        fontWeight: "600",
    },
    primaryBtn: {
        flex: 1.3,
        borderRadius: 999,
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 10,
    },
    primaryText: {
        fontSize: 14,
        fontWeight: "700",
        color: "#fff",
    },
});
