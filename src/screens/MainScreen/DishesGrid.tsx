import React from "react";
import { View, Text, StyleSheet, FlatList, ListRenderItemInfo } from "react-native";
import { AppTheme } from "../../theme/theme";
import { Dish } from "../../types";
import DishCard from "../../components/DishCard";

interface Props {
    theme: AppTheme;
    data: Dish[];
    title?: string;
    countLabel?: string;
    onAdd: (d: Dish) => void;
    onPressCard?: (d: Dish) => void; // 👈 YENİ
}

export default function DishesGrid({
                                       theme,
                                       data,
                                       title = "Tüm Lezzetler",
                                       countLabel,
                                       onAdd,
                                       onPressCard,
                                   }: Props) {
    const renderItem = ({ item }: ListRenderItemInfo<Dish>) => (
        <DishCard
            item={item}
            onAdd={() => onAdd(item)}
            onPressCard={() => onPressCard && onPressCard(item)} // 👈 YENİ
            theme={theme}
        />
    );

    return (
        <View style={styles.wrapper}>
            <View style={styles.headerRow}>
                <Text style={[styles.title, { color: theme.text }]}>{title}</Text>
                {typeof countLabel === "string" && (
                    <Text style={[styles.count, { color: theme.subText }]}>
                        {countLabel}
                    </Text>
                )}
            </View>

            <FlatList
                data={data}
                keyExtractor={(item) => item.id}
                numColumns={2}
                renderItem={renderItem}
                columnWrapperStyle={styles.row}
                contentContainerStyle={styles.listContent}
                showsVerticalScrollIndicator={false}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
    },
    headerRow: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 8,
        paddingHorizontal: 4,
    },
    title: {
        fontSize: 18,
        fontWeight: "700",
    },
    count: {
        fontSize: 13,
    },
    row: {
        marginBottom: 10,
        justifyContent: "space-between",
        paddingHorizontal: 4,
    },
    listContent: {
        paddingBottom: 180,
        paddingTop: 4,
    },
});
