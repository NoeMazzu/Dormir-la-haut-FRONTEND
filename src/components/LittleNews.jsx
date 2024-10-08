import { faCircleChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const LittleNews = ({ title, description, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.newsContainer}>
        <View style={styles.newsContent}>
          <Text style={styles.newsTitle}>{title}</Text>
          <Text style={styles.newsDescription}>{description}</Text>
        </View>

        <View style={styles.iconContainer}>
          <FontAwesomeIcon
            icon={faCircleChevronRight}
            color="#161D46"
            size={28}
          />
        </View>
      </View>
    </TouchableOpacity>
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
    marginBottom: 10,
    fontFamily: 'JosefinSansRegular',
  },
  newsDescription: {
    color: "#161D46",
    fontSize: 16,
    fontFamily: 'JosefinSansRegular',
  },

  iconContainer: {
    backgroundColor: "white",
    borderRadius: 20,
    width: 36,
    height: 36,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
});

export default LittleNews;
