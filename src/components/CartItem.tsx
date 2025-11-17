import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { AnimatePresence, MotiView } from 'moti';
import type { Dish } from '../types';
import type { AppTheme } from '../theme/theme';

interface Props {
  item: Dish;
  onRemove: () => void;
  theme: AppTheme;
}

export default function CartItem({ item, onRemove, theme }: Props) {
  const styles = getStyles(theme);

  return (
    <AnimatePresence>
      <MotiView
        from={{ opacity: 0, translateX: 40 }}
        animate={{ opacity: 1, translateX: 0 }}
        exit={{ opacity: 0, translateX: -40 }}
        transition={{ type: 'timing', duration: 280 }}
        style={styles.cartItem}
      >
        <View style={styles.emojiWrapper}>
          <Text style={styles.cartEmoji}>{item.image}</Text>
        </View>
        <View style={styles.textWrapper}>
          <Text style={styles.cartName} numberOfLines={1}>
            {item.name}
          </Text>
          <Text style={styles.cartPrice}>₺{item.price}</Text>
        </View>
        <Pressable onPress={onRemove} hitSlop={10} style={styles.removeBtn}>
          <Text style={styles.remove}>✖</Text>
        </Pressable>
      </MotiView>
    </AnimatePresence>
  );
}

const getStyles = (theme: AppTheme) =>
  StyleSheet.create({
    cartItem: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: theme.surface,
      borderRadius: 16,
      paddingHorizontal: 10,
      paddingVertical: 8,
      marginRight: 10,
      borderWidth: 1,
      borderColor: theme.cardBorder,
    },
    emojiWrapper: {
      width: 32,
      height: 32,
      borderRadius: 16,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor:
        theme.bg === '#050714' ? 'rgba(15,23,42,0.9)' : 'rgba(248,250,252,1)',
      marginRight: 8,
    },
    cartEmoji: { fontSize: 20 },
    textWrapper: {
      maxWidth: 130,
    },
    cartName: {
      fontSize: 13,
      fontWeight: '700',
      color: theme.text,
    },
    cartPrice: {
      fontSize: 12,
      color: theme.subText,
      marginTop: 2,
    },
    removeBtn: {
      marginLeft: 12,
    },
    remove: { fontSize: 16, color: '#e74c3c' },
  });
