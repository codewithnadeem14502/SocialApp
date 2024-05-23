import CarouselItem from "@/components/CarouselItem";
import Colors from "@/constants/Colors";
import { previousPosts } from "@/data/post";
import { Ionicons } from "@expo/vector-icons";
import { Stack, useRouter } from "expo-router";
import React, { useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";

const mainscreen = () => {
  const router = useRouter();
  const scrollViewRef = useRef<ScrollView>(null);
  const postWidth = 300; // Width of each post item

  const handleCreatePost = () => {
    router.push("/create");
    console.log("Create Post button clicked!");
  };

  const handleLogout = () => {
    console.log("Logout button clicked!");
  };

  const handlePostPress = (postId: number) => {
    console.log("Post with ID", postId, "pressed!");
    scrollToPost(postId);
  };

  const scrollToPost = (postId: number) => {
    if (scrollViewRef.current) {
      const index = previousPosts.findIndex((post) => post.id === postId);
      if (index !== -1) {
        const offsetX = index * postWidth;
        scrollViewRef.current.scrollTo({ x: offsetX, animated: true });
      }
    }
  };

  return (
    <>
      <Stack.Screen
        options={{
          headerTransparent: true,
          headerTitle: "",
        }}
      />
      <View style={styles.container}>
        <View>
          <Text style={styles.title}>Home </Text>
          <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
            <Ionicons name="log-out-outline" size={30} color={Colors.blue} />
          </TouchableOpacity>
        </View>
        <ScrollView
          ref={scrollViewRef}
          style={styles.scrollView}
          horizontal
          showsHorizontalScrollIndicator={false}
        >
          <View style={styles.carousel}>
            {previousPosts.map((post) => (
              <CarouselItem
                key={post.id}
                post={post}
                onPress={() => handlePostPress(post.id)}
              />
            ))}
          </View>
        </ScrollView>

        <TouchableOpacity
          onPress={handleCreatePost}
          style={styles.createPostButton}
          activeOpacity={0.7}
        >
          <Text style={styles.createPostButtonText}>Create Post</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 10,
  },
  logoutButton: {
    position: "absolute",
    top: 30,
    right: 12,
  },
  title: {
    fontSize: 25,
    color: "blue",
    marginLeft: 20,
    marginTop: 30,
  },
  scrollView: {
    flex: 1,
    marginBottom: 20,
  },
  carousel: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 20,
  },
  createPostButton: {
    position: "absolute",
    bottom: 20,
    alignSelf: "center",
    backgroundColor: "#F7F7F9",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: "blue",
  },
  createPostButtonText: {
    color: Colors.blue,
    fontSize: 18,
  },
});

export default mainscreen;
