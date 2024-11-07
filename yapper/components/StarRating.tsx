import React from 'react';
import { View, Text } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { ColorsPalette } from '@/constants/colors';

type RatingData = {
  fluency: number;
  delivery: number;
  language: number;
  topic: number;
};

const StarRating = ({ rating }: { rating: number }) => {
    const stars = Array.from({ length: 3 }, (_, index) => (
      <MaterialIcons
        key={index}
        name={index < rating ? 'star' : 'star-border'}
        size={40}
        color={ColorsPalette.PrimaryColorLight}
      />
    ));
    return <View style={{ flexDirection: 'row' }}>{stars}</View>;
  };

const RatingDisplay = ({ fluency, delivery, language, topic }: RatingData) => (
<View style={styles.container}>
    <View style={styles.itemWrapper}>
    <Text style={styles.itemTitle}>Fluency</Text>
    <StarRating rating={fluency} />
    </View>
    <View style={styles.itemWrapper}>
    <Text style={styles.itemTitle}>Delivery</Text>
    <StarRating rating={delivery} />
    </View>
    <View style={styles.itemWrapper}>
    <Text style={styles.itemTitle}>Language</Text>
    <StarRating rating={language} />
    </View>
    <View style={styles.itemWrapper}>
    <Text style={styles.itemTitle}>Topic</Text>
    <StarRating rating={topic} />
    </View>
</View>
);

const styles = {
    container: {
        padding: 10,
        width: '80%',
    },
    itemTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: ColorsPalette.PrimaryColorLight,
        padding: 10,
    },
    itemWrapper: {
        padding: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
    }
}

export default RatingDisplay;