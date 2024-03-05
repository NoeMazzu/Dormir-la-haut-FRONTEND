import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
} from "react-native";


const LoadingScreen = ({ navigation }) => {
    
  return (
    <ImageBackground
      source={require("../assets/Image-background.jpg")}
      resizeMode="cover"
      style={styles.background}
    >
      <View style={styles.filtre}>
        <TouchableOpacity style={styles.signup} onPress={() => navigation.navigate('RegisterScreen')} >
          <Text style={styles.buttonTextI}>S'inscrire</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.signin} onPress={() => navigation.navigate('LoginScreen')}>
          <Text style={styles.buttonTextU}>Se connecter</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.forgotPassword}>
          <Text style={styles.forgotPasswordText}>Mot de passe oublié ?</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  filtre: {
    backgroundColor: "rgba(0,0,0,0.5)",
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  background: {
    flex: 1,
    width: "100%",
  },
  signin: {
    backgroundColor: "#ffffff",
    padding: 15,
    margin: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#35357F",
    width: "50%",
  },
  signup: {
    backgroundColor: "#35357F",
    padding: 15,
    margin: 10,
    borderRadius: 10,
    color: "#ffffff",
    width: "50%",
  },
  forgotPassword: {
    marginTop: 20,
  },
  forgotPasswordText: {
    color: "#ffffff",
    fontSize: 16,
    textDecorationLine: "underline",
  },
  buttonTextU: {
    color: "#000000",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 18,
  },
  buttonTextI: {
    color: "#ffffff",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 18,
  },
});

export default LoadingScreen;
