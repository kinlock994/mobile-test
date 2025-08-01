import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  GestureResponderEvent,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

type Props = {
  imageUrl?: string;
  title: string;
  subtitle?: string;
  rating?: number;
  onSeeMore?: (e: GestureResponderEvent) => void;
  onToggleWishlist?: (e: GestureResponderEvent) => void;
  wishlisted?: boolean;
};

const ORANGE = '#f97316';
const CARD_RADIUS = 16;

const ProductCard: React.FC<Props> = ({
  imageUrl,
  title,
  subtitle,
  rating = 0,
  onSeeMore,
  onToggleWishlist,
    wishlisted = false,
}) => {
  return (
    <View style={styles.card}>
      <Image
        source={{ uri: imageUrl || 'https://picsum.photos/200' }}
        style={styles.image}
        resizeMode="cover"
      />

      <TouchableOpacity
        style={styles.wishlistBtn}
        onPress={onToggleWishlist}
        activeOpacity={0.8}
      >
        <Ionicons
          name={wishlisted ? 'heart' : 'heart-outline'}
          size={20}
          color={ORANGE}
        />
      </TouchableOpacity>

      <View style={styles.content}>
        <Text style={styles.title} numberOfLines={1}>
          {title}
        </Text>

        {subtitle ? (
          <Text style={styles.subtitle} numberOfLines={2}>
            {subtitle}
          </Text>
        ) : null}

        <View style={styles.ratingChip}>
          {/* <Ionicons name="star" size={14} color={ORANGE} /> */}
          <Text style={styles.ratingText}>{rating.toFixed(1)}</Text>
        </View>

        <TouchableOpacity
          style={styles.ctaBtn}
          onPress={onSeeMore}
          activeOpacity={0.9}
        >
          <Text style={styles.ctaLabel}>See more</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: '100%',
    backgroundColor: '#ffffff',
    borderRadius: CARD_RADIUS,
    overflow: 'hidden',
    elevation: 4, // Android shadow
    shadowColor: '#000', // iOS shadow
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    marginBottom: 20,
  },
  image: {
    width: '100%',
    height: 140,
  },
  wishlistBtn: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: '#ffffff',
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  content: {
    padding: 14,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0f172a', // slate-900
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 13,
    color: '#475569', // slate-600
    marginBottom: 8,
  },
  ratingChip: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    backgroundColor: '#fff7ed', // light orange tint
    borderColor: ORANGE,
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginBottom: 12,
  },
  ratingText: {
    marginLeft: 4,
    fontSize: 12,
    fontWeight: '600',
    color: ORANGE,
  },
  ctaBtn: {
    backgroundColor: ORANGE,
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  ctaLabel: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
});

export default ProductCard;
