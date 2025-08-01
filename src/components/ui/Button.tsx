import { colors } from '@theme/index';
import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const PRIMARY = colors.primary

export default function Button({
  title,
  disabled = false,
  onPress,
}: {
  title: string;
  disabled?: boolean;
  onPress: () => void;
}) {
  return (
    <TouchableOpacity style={styles.btn} onPress={onPress} disabled={disabled}>
      <Text style={styles.txt}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  btn: {
    backgroundColor: PRIMARY,
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  txt: { color: '#fff', fontWeight: 'bold', textAlign: 'center' },
});
