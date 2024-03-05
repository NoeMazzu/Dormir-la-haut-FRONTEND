import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const Footer = ({ onLeftPress, onRightPress }) => {
  return (
    <View style={styles.footerContainer}>
      <TouchableOpacity onPress={onLeftPress} style={styles.buttonContainer}>
        <Text style={styles.buttonText}>Bouton Gauche</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={onRightPress} style={styles.buttonContainer}>
        <Text style={styles.buttonText}>Bouton Droit</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  footerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#35357F",
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  buttonContainer: {
    flex: 1,
    alignItems: "center",
    padding: 10,
    borderRadius: 5,
    backgroundColor: "#ffffff", // Couleur de fond pour les boutons
    margin: 5,
  },
});

export default Footer;
