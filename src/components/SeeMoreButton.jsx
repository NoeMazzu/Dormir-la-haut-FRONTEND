import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const SeeMoreButton = (props) => {
  return (
    <TouchableOpacity style={styles.button}>
      <Text style={styles.title}>{props.title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    width: 150,
    height: 50,
    backgroundColor: "#5050B2",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    shadowProp: {
        shadowColor: '#00000',
        shadowOffset: {width: -2, height: 4},
        shadowOpacity: 0.9,
        shadowRadius: 10,
      },
  },
  title: {
    color: "white",
    fontSize: 18,
  },
});

export default SeeMoreButton;
