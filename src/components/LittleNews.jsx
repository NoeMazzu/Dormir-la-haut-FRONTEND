import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const LittleNews = ({ title, description, onPress }) => {
  return (
    <View style={styles.newsContainer}>
      <View style={styles.newsContent}>
        <Text style={styles.newsTitle}>{title}</Text>
        <Text style={styles.newsDescription}>{description}</Text>
      </View>
      <TouchableOpacity style={styles.newsButton} onPress={onPress}>
        <Text style={styles.buttonText}>Bouton</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  newsContainer: {
    backgroundColor: "#ffffff",
    borderRadius: 10,
    marginHorizontal: 15,
    marginTop: 25,
    padding: 15,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  newsContent: {
    flex: 1,
  },
  newsTitle: {
    color: "#161D46",
    fontSize: 20,
    fontWeight: "bold",
  },
  newsDescription: {
    color: "#161D46",
    fontSize: 16,
  },
  newsButton: {
    backgroundColor: "#161D46",
    borderRadius: 10,
    padding: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 16,
  },
});

export default LittleNews;
