import React from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ImageBackground, KeyboardAvoidingView } from "react-native";
import { useState } from "react";
const LoginScreen = ({ navigation }) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleImageLoad = () => {
    setImageLoaded(true);
  };
  return (
    
    <ImageBackground
      source={require("../assets/Image-background.jpg")}
      resizeMode="cover"
      style={styles.background}
      onLoad={handleImageLoad}
    >
            {imageLoaded ? (
      <View style={styles.filter}>
        <Text style={styles.title}>Se connecter</Text>
        <TextInput
          style={styles.input}
          placeholder="E-mail"
          placeholderTextColor="#808080"
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#808080"
          secureTextEntry
        />
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.cancelButton} onPress={() => navigation.navigate('LoadingScreen')}>
            <Text style={styles.buttonText}>Annuler</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.signupButton}>
            <Text style={styles.buttonText2}>Se Connecter</Text>
          </TouchableOpacity>
        </View>
      </View>
      ) : null}
    </ImageBackground>
    
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: "100%",
  },
  filter: {
    backgroundColor: "rgba(0,0,0,0.5)",
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 50,
  },
  input: {
    backgroundColor: "#ffffff",
    width: "80%",
    padding: 15,
    margin: 10,
    borderRadius: 10,
    color: "#000000",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    width: "80%",
  },
  cancelButton: {
    backgroundColor: "#C23434",
    padding: 15,
    margin: 10,
    borderRadius: 10,
    width: "48%",
    alignItems: "center",
  },
  signupButton: {
    backgroundColor: "#ffffff",
    padding: 15,
    margin: 10,
    borderRadius: 10,
    width: "48%",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16,
  },
  buttonText2: {
    color: "#000",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16,
  },
  title: {
    color: '#ffffff',
    fontSize: 60,
    
  },
});

export default LoginScreen;
