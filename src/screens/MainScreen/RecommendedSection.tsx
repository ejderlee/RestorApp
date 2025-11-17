import React from "react";
import {FlatList, StyleSheet, Text, View} from "react-native";
import {AppTheme} from "../../theme/theme";
import {Dish} from "../../types";
import DishCard from "../../components/DishCard";

interface Props {
    theme: AppTheme;
    data: Dish[];
    onAdd: (d: Dish) => void;
    onPressCard?: (d: Dish) => void; // 👈 YENİ
}

export default function RecommendedSection({theme, data, onAdd, onPressCard}: Props) {
    if (!data || data.length === 0) return null;

    return (
        <View style={styles.wrapper}>
            <View style={styles.headerRow}>
                <Text style={[styles.title, {color: theme.text}]}>
                    Önerilenler
                </Text>
                <Text style={[styles.hint, {color: theme.subText}]}>
                    Sana özel seçtik
                </Text>
            </View>

            <FlatList
                data={data}
                horizontal
                keyExtractor={(item) => "rec_" + item.id}
                renderItem={({item}) => (
                    <View style={styles.cardWrapper}>
                        <DishCard
                            item={item}
                            onAdd={() => onAdd(item)}
                            onPressCard={() => onPressCard && onPressCard(item)} // 👈 YENİ
                            theme={theme}
                        />
                    </View>
                )}
                contentContainerStyle={styles.listContent}
                showsHorizontalScrollIndicator={false}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        marginTop: 14,
        marginBottom: 10,
    },
    headerRow: {
        flexDirection: "row",
        alignItems: "flex-end",
        justifyContent: "space-between",
        paddingHorizontal: 4,
        marginBottom: 6,
    },
    title: {
        fontSize: 16,
        fontWeight: "700",
    },
    hint: {
        fontSize: 12,
    },
    listContent: {
        paddingHorizontal: 4,
        paddingVertical: 4,
    },
    cardWrapper: {
        width: 160,
        marginRight: 12,
    },
});
