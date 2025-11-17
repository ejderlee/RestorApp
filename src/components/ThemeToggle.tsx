import React from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';
import { MotiView } from 'moti';
import type { AppTheme } from '../theme';

interface Props {
  isDark: boolean;
  onToggle: () => void;
  theme: AppTheme;
}

export default function ThemeToggle({ isDark, onToggle, theme }: Props) {
  return (
    <Pressable onPress={onToggle} style={styles.touchArea} hitSlop={10}>
      <MotiView
        from={{ scale: 0.8, rotateZ: '0deg', opacity: 0 }}
        animate={{ scale: 1, rotateZ: '360deg', opacity: 1 }}
        transition={{ type: 'timing', duration: 500 }}
        style={[
          styles.container,
          { backgroundColor: isDark ? '#111827' : '#ffffff', shadowColor: theme.shadow },
        ]}
      >
        <Text style={[styles.icon, { color: isDark ? '#fcd34d' : '#f97316' }]}>
          {isDark ? '🌙' : '☀️'}
        </Text>
      </MotiView>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  touchArea: {
    padding: 4,
  },
  container: {
    width: 38,
    height: 38,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    shadowOpacity: 0.35,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 7,
  },
  icon: {
    fontSize: 20,
  },
});