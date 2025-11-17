import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import Animated,
{
  useSharedValue,
  withSpring,
  withSequence,
  withTiming,
  useAnimatedStyle,
} from "react-native-reanimated";
import { MotiView } from "moti";
import { Dish } from "../types";
import { AppTheme } from "../theme/theme";

interface Props {
  item: Dish;
  onAdd: () => void;
  theme: AppTheme;
  onPressCard?: () => void; // 👈 YENİ
}

export default function DishCard({ item, onAdd, theme, onPressCard }: Props) {
  const scale = useSharedValue(1);
  const tilt = useSharedValue(0);

  const rStyle = useAnimatedStyle(() => ({
    transform: [
      { scale: scale.value },
      { rotateZ: `${tilt.value}deg` },
    ],
  }));

  const onPressIn = () => {
    scale.value = withSpring(0.96);
  };

  const onPressOut = () => {
    scale.value = withSpring(1);
  };

  const handleAdd = () => {
    tilt.value = withSequence(
        withTiming(-4, { duration: 70 }),
        withTiming(4, { duration: 70 }),
        withTiming(0, { duration: 70 }),
    );
    onAdd();
  };

  const ratingText =
      item.rating && item.ratingCount
          ? `⭐ ${item.rating.toFixed(1)} (${item.ratingCount})`
          : undefined;

  const metaTextParts: string[] = [];
  if (item.prepTime) metaTextParts.push(`⏱ ${item.prepTime}`);
  if (item.kcal) metaTextParts.push(`${item.kcal} kcal`);
  const metaText = metaTextParts.join(" · ");

  return (
      <Pressable
          onPressIn={onPressIn}
          onPressOut={onPressOut}
          onPress={onPressCard}
          style={{ flex: 1 }}
      >
        <Animated.View
            style={[
              styles.card,
              {
                backgroundColor: theme.surface,
                borderColor: theme.cardBorder,
                shadowColor: theme.shadow,
              },
              rStyle,
            ]}
        >
          <MotiView
              from={{ opacity: 0, translateY: 10, scale: 0.96 }}
              animate={{ opacity: 1, translateY: 0, scale: 1 }}
              transition={{ type: "spring", damping: 14 }}
          >
            {/* ÜST: Emoji + Badgeler */}
            <View style={styles.topRow}>
              <View style={styles.emojiWrapper}>
                <Text style={styles.emoji}>{item.image}</Text>
              </View>

              {item.badges && item.badges.length > 0 && (
                  <View style={styles.badgeColumn}>
                    {item.badges.slice(0, 2).map((b) => (
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
            </View>

            {/* İSİM */}
            <Text style={[styles.name, { color: theme.text }]}>
              {item.name}
            </Text>

            {/* RATING + FİYAT */}
            <View style={styles.middleRow}>
              {ratingText ? (
                  <Text style={[styles.rating, { color: theme.subText }]}>
                    {ratingText}
                  </Text>
              ) : (
                  <View />
              )}

              <Text
                  style={[
                    styles.price,
                    { color: theme.primary },
                  ]}
              >
                ₺{item.price}
              </Text>
            </View>

            {/* ALT METRİKLER (Süre / Kcal) */}
            {metaText ? (
                <Text
                    style={[
                      styles.meta,
                      { color: theme.subText },
                    ]}
                >
                  {metaText}
                </Text>
            ) : null}

            {/* SEPETE EKLE BUTONU */}
            <Pressable
                onPress={handleAdd}
                style={[
                  styles.addBtn,
                  { backgroundColor: theme.primary },
                ]}
            >
              <Text style={styles.addBtnText}>➕ Sepete Ekle</Text>
            </Pressable>
          </MotiView>
        </Animated.View>
      </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 22,
    padding: 12,
    marginHorizontal: 6,
    marginBottom: 12,
    borderWidth: 1,
    shadowOpacity: 0.35,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 6 },
    elevation: 6,
  },
  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  emojiWrapper: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  emoji: {
    fontSize: 40,
  },
  badgeColumn: {
    alignItems: "flex-end",
  },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 999,
    marginBottom: 4,
  },
  badgeText: {
    fontSize: 10,
    fontWeight: "600",
  },
  name: {
    fontSize: 16,
    fontWeight: "700",
    marginTop: 10,
  },
  middleRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 6,
    justifyContent: "space-between",
  },
  rating: {
    fontSize: 12,
  },
  price: {
    fontSize: 18,
    fontWeight: "700",
  },
  meta: {
    fontSize: 11,
    marginTop: 4,
  },
  addBtn: {
    marginTop: 10,
    borderRadius: 999,
    paddingVertical: 8,
    alignItems: "center",
  },
  addBtnText: {
    color: "#fff",
    fontSize: 13,
    fontWeight: "700",
  },
});
