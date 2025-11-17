import React from 'react';
import { ScrollView, Pressable, StyleSheet, Text, View } from 'react-native';
import { MotiView } from 'moti';
import type { Dish } from '../types';
import type { AppTheme } from '../theme/theme';

interface Props {
  selected: Dish;
  onSelect: (c: Dish) => void;
  theme: AppTheme;
}

const categories: Dish[] = ['Hepsi', 'Burger', 'Pizza', 'Sushi', 'Sağlıklı', 'Atıştırmalık'];

export default function CategoryFilter({ selected, onSelect, theme }: Props) {
  return (
    <View style={styles.wrapper}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {categories.map((cat, index) => {
          const isActive = selected === cat;
          return (
            <Pressable
              key={cat}
              onPress={() => onSelect(cat)}
              style={styles.pillPressable}
            >
              <MotiView
                from={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: 'timing', duration: 350, delay: index * 60 }}
                style={[
                  styles.pill,
                  {
                    backgroundColor: isActive
                      ? theme.primary
                      : theme.bg === '#050714'
                      ? '#111827'
                      : '#ffffff',
                    borderColor: isActive ? 'transparent' : theme.cardBorder,
                    shadowColor: isActive ? theme.shadow : 'transparent',
                  },
                ]}
              >
                <Text
                  style={[
                    styles.pillText,
                    { color: isActive ? '#ffffff' : theme.text },
                  ]}
                >
                  {cat}
                </Text>
              </MotiView>
            </Pressable>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginTop: 16,
  },
  scrollContent: {
    paddingHorizontal: 4,
  },
  pillPressable: {
    marginRight: 8,
  },
  pill: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 999,
    borderWidth: 1,
    shadowOpacity: 0.25,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },
  pillText: {
    fontSize: 13,
    fontWeight: '600',
  },
});
