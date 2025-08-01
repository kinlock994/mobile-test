import React, { forwardRef } from 'react';
import {
  View,
  Text,
  TextInput,
  TextInputProps,
  StyleSheet,
} from 'react-native';

interface Props extends TextInputProps {
  label?: string;
  error?: string;
}

const Input = forwardRef<TextInput, Props>(
  ({ label, error, style, ...rest }, ref) => {
    return (
      <View style={styles.wrapper}>
        {label && <Text style={styles.label}>{label}</Text>}

        <TextInput
          ref={ref}
          style={[styles.input, style, !!error && styles.inputError]}
          placeholderTextColor="#999"
          {...rest}
        />

        {error && <Text style={styles.error}>{error}</Text>}
      </View>
    );
  },
);

export default Input;

const styles = StyleSheet.create({
  wrapper: { width: '100%', marginBottom: 16 },
  label: {
    marginBottom: 4,
    fontSize: 14,
    color: '#555',
    fontWeight: '500',
  },
  input: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    fontSize: 16,
    backgroundColor: '#fff',
    color: '#111',
  },
  inputError: {
    borderColor: '#ff4d4f',
  },
  error: {
    marginTop: 4,
    color: '#ff4d4f',
    fontSize: 12,
  },
});
