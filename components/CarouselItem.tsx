import React, { useState, useRef } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { OnPressFunction, Post } from "@/types/post";

interface Props {
  post: Post;
  onPress: OnPressFunction;
}

const CarouselItem = ({ post, onPress }: Props) => {
  const [liked, setLiked] = useState(false);
  const lastTap = useRef<number | null>(null);

  const handleLikePress = () => {
    setLiked(!liked);
  };

  const handleDoubleTap = () => {
    const now = Date.now();
    if (lastTap.current && now - lastTap.current < 300) {
      setLiked(true);
    } else {
      lastTap.current = now;
    }
  };

  const handlePress = () => {
    onPress(post.id);
    handleDoubleTap();
  };

  return (
    <TouchableOpacity style={styles.container} onPress={handlePress}>
      <Image source={{ uri: post.image }} style={styles.image} />
      <View style={styles.overlay}>
        <TouchableOpacity
          style={styles.iconContainer}
          onPress={handleLikePress}
        >
          <Ionicons
            name={liked ? "heart" : "heart-outline"}
            size={24}
            color={liked ? "red" : "white"}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconContainer}>
          <Ionicons name="share-social-outline" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.title}>{post.title}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 300,
    height: 500,
    marginHorizontal: 5,
    borderRadius: 10,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: 500,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "flex-end",
    padding: 10,
  },
  iconContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
    marginLeft: 4,
  },
  title: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 4,
  },
});

export default CarouselItem;
