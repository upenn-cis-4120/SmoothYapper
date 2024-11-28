import { router } from "expo-router";
import React from "react";
import { SafeAreaView, StyleSheet, Text, View, Image, FlatList, TouchableOpacity } from "react-native";

import topics from "@/assets/sampleData/TopicSamples";

interface Topic {
  id: number;
  rank: string;
  thumbnail: string;
  duration: string;
  title: string;
  description: string;
  url: string;
  recommendations: Recommendation[];
}

interface Recommendation {
  phrase: string;
  reason: string;
  sampleSentence: string;
}

const TopicCard = ({ topic }: { topic: Topic }) => {
  return (
    <TouchableOpacity onPress={() => {
      router.push({
        pathname: "/(tabs)/topicPage",
        params: {
          topicItemString: JSON.stringify(topic),
        },
      });
    }}>
      <View style={styles.card}>
        {/* Rank and Duration */}
        <View style={styles.header}>
          <Text style={styles.rank}>{topic.rank}</Text>
          <Text style={styles.duration}>▶ {topic.duration}</Text>
        </View>

        {/* Thumbnail and Details */}
        <View style={styles.content}>
          <Image source={topic.thumbnail} style={styles.thumbnail} />
          <View style={styles.details}>
            <Text style={styles.title} numberOfLines={2}>
              {topic.title}
            </Text>
            <Text style={styles.description}>{topic.description}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default function Topics() {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.headerTitle}>TOPICS</Text>
      <FlatList
        data={topics}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <TopicCard topic={item} />}
        contentContainerStyle={styles.list}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    padding: 20,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#001F54",
    textAlign: "center",
    fontFamily: "NunitoSans_10pt-Black",
    marginBottom: 20,
  },
  list: {
    paddingBottom: 20,
    paddingHorizontal: 10,
  },
  card: {
    backgroundColor: "#F5F5F5",
    borderRadius: 10,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  rank: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#001F54",
  },
  duration: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#FFA500",
  },
  content: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  thumbnail: {
    width: 100,
    height: 80,
    borderRadius: 8,
    marginRight: 16,
  },
  details: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#001F54",
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: "#555555",
  },
});
