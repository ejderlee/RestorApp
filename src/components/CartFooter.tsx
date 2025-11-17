import React, { useMemo } from "react";
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    Pressable,
} from "react-native";
import { AnimatePresence, MotiView, MotiText } from "moti";
import { CartItem } from "../types";
import { AppTheme } from "../theme/theme";

interface Props {
    cart: CartItem[];
    onRemove: (id: string) => void;
    theme: AppTheme;
    open: boolean;
    onClose: () => void;
    onPayment: () => void;
}

export default function CartFooter({
                                       cart,
                                       onRemove,
                                       theme,
                                       open,
                                       onClose,
                                       onPayment,
                                   }: Props) {
    const total = useMemo(
        () => cart.reduce((sum, d) => sum + (d.totalPrice ?? d.price), 0),
        [cart]
    );

    return (
        <AnimatePresence>
            {open && cart.length > 0 && (
                <MotiView
                    from={{ translateY: 200, opacity: 0 }}
                    animate={{ translateY: 0, opacity: 1 }}
                    exit={{ translateY: 200, opacity: 0 }}
                    transition={{ type: "timing", duration: 220 }}
                    style={[
                        styles.container,
                        { backgroundColor: theme.surface },
                    ]}
                >
                    {/* Üst satır: başlık + kapatma */}
                    <View style={styles.topRow}>
                        <View>
                            <MotiText
                                from={{ opacity: 0, translateY: 6 }}
                                animate={{ opacity: 1, translateY: 0 }}
                                transition={{ type: "timing", duration: 220 }}
                                style={[styles.title, { color: theme.text }]}
                            >
                                Sepet ({cart.length})
                            </MotiText>
                            <Text
                                style={[styles.subtitle, { color: theme.subText }]}
                            >
                                Toplam: ₺{total}
                            </Text>
                        </View>

                        <Pressable onPress={onClose} hitSlop={10}>
                            <Text style={[styles.close, { color: theme.subText }]}>
                                ✕
                            </Text>
                        </Pressable>
                    </View>

                    {/* Ürün listesi */}
                    <FlatList
                        data={cart}
                        horizontal
                        keyExtractor={(_, index) => `cart_${index}`}
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={styles.listContent}
                        renderItem={({ item }) => (
                            <CartFooterItem
                                item={item}
                                onRemove={onRemove}
                                theme={theme}
                            />
                        )}
                    />

                    {/* Alt buton */}
                    <Pressable
                        onPress={onPayment}
                        style={[
                            styles.payBtn,
                            { backgroundColor: theme.primary },
                        ]}
                    >
                        <Text style={styles.payText}>
                            Ödemeye Geç • ₺{total}
                        </Text>
                    </Pressable>
                </MotiView>
            )}
        </AnimatePresence>
    );
}

function CartFooterItem({
                            item,
                            onRemove,
                            theme,
                        }: {
    item: CartItem;
    onRemove: (id: string) => void;
    theme: AppTheme;
}) {
    const linePrice = item.totalPrice ?? item.price;

    return (
        <View
            style={[
                styles.itemCard,
                {
                    backgroundColor: theme.bg,
                    borderColor: theme.cardBorder,
                },
            ]}
        >
            <View style={styles.itemHeader}>
                <Text style={styles.itemEmoji}>{item.image}</Text>
                <Pressable onPress={() => onRemove(item.id)} hitSlop={8}>
                    <Text style={styles.remove}>✕</Text>
                </Pressable>
            </View>

            <Text style={[styles.itemName, { color: theme.text }]}>
                {item.name}
            </Text>

            {item.selectedExtras && item.selectedExtras.length > 0 && (
                <Text
                    style={[styles.itemExtras, { color: theme.subText }]}
                    numberOfLines={2}
                >
                    Ekstralar:{" "}
                    {item.selectedExtras
                        .map((ex) => `${ex.name} x${ex.count}`)
                        .join(", ")}
                </Text>
            )}

            <Text
                style={[
                    styles.itemPrice,
                    { color: theme.primary },
                ]}
            >
                ₺{linePrice}
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        position: "absolute",
        left: 0,
        right: 0,
        bottom: 0,
        paddingTop: 10,
        paddingBottom: 14,
        paddingHorizontal: 14,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        elevation: 14,
        shadowColor: "#000",
        shadowOpacity: 0.4,
        shadowRadius: 12,
        shadowOffset: { width: 0, height: -6 },
    },
    topRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 8,
    },
    title: {
        fontSize: 15,
        fontWeight: "700",
    },
    subtitle: {
        fontSize: 12,
        marginTop: 2,
    },
    close: {
        fontSize: 18,
        fontWeight: "700",
    },
    listContent: {
        paddingVertical: 8,
    },
    itemCard: {
        width: 160,
        borderRadius: 14,
        padding: 10,
        marginRight: 10,
        borderWidth: 1,
    },
    itemHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    itemEmoji: {
        fontSize: 26,
    },
    remove: {
        fontSize: 14,
        color: "#f97373",
    },
    itemName: {
        fontSize: 13,
        fontWeight: "600",
        marginTop: 6,
    },
    itemExtras: {
        fontSize: 11,
        marginTop: 4,
    },
    itemPrice: {
        fontSize: 14,
        fontWeight: "700",
        marginTop: 8,
    },
    payBtn: {
        marginTop: 6,
        borderRadius: 999,
        paddingVertical: 10,
        alignItems: "center",
    },
    payText: {
        color: "#fff",
        fontSize: 14,
        fontWeight: "700",
    },
});
