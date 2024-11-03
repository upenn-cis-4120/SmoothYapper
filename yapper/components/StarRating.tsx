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
<View>
    <View>
    <Text>Fluency</Text>
    <StarRating rating={fluency} />
    </View>
    <View>
    <Text>Delivery</Text>
    <StarRating rating={delivery} />
    </View>
    <View>
    <Text>Language</Text>
    <StarRating rating={language} />
    </View>
    <View>
    <Text>Topic</Text>
    <StarRating rating={topic} />
    </View>
</View>
);

export default RatingDisplay;