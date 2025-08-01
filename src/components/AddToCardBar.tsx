import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type Props = {
  price: number;
  onAdd: () => void;
};

const ORANGE = '#f97316';

const AddToCartBar: React.FC<Props> = ({ price, onAdd }) => {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.wrapper, { bottom: insets.bottom + 16 }]}>
      <Text style={styles.price}>${price.toFixed(2)}</Text>

      <TouchableOpacity style={styles.button} onPress={onAdd}>
        <Text style={styles.buttonLabel}>Add to cart</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    alignSelf: 'center',
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    borderRadius: 40,
    elevation: 8,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    paddingHorizontal: 20,
    paddingVertical: 10,
    alignItems: 'center',
  },
  price: {
    fontSize: 18,
    fontWeight: '600',
    marginRight: 24,
    color: ORANGE,
  },
  button: {
    backgroundColor: ORANGE,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 24,
  },
  buttonLabel: {
    color: '#ffffff',
    fontWeight: '600',
    fontSize: 16,
  },
});

export default AddToCartBar;
