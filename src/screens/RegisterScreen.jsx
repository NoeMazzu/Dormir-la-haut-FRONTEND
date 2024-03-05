import React from "react";
import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ImageBackground, KeyboardAvoidingView } from "react-native";

const RegisterScreen = ({navigation}) => {
    
        const [prenom, setPrenom] = useState("");
        const [nom, setNom] = useState("");
        const [username, setUsername] = useState('');
        const [email, setEmail] = useState("");
        const [password, setPassword] = useState("");
      
        const handleInscription = () => {
            fetch("https://dormir-la-haut-backend.vercel.app/users/signup", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                firstName: prenom,
                lastName: nom,
                userName: username,
                mail: email,
                password: password,
              }),
            })
              .then((response) => response.json())
              .then((data) => {
                if (data.result) {
                  setPrenom("");
                  setNom("");
                  setUsername("");
                  setEmail("");
                  setPassword('');
                }
              });
          };
  return (
    
    <ImageBackground
      source={require("../assets/Image-background.jpg")}
      resizeMode="cover"
      style={styles.background}
    >
      <View style={styles.filter}>
        <Text style={styles.title}>S'inscrire</Text>
        <Text style={styles.desc}>
          Veuillez remplir tous les champs suivants pour créer votre compte
        </Text>
        <TextInput
          style={styles.input}
          placeholder="Prénom"
          placeholderTextColor="#808080"
          value={prenom}
          onChangeText={(text) => setPrenom(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Nom"
          placeholderTextColor="#808080"
          value={nom}
          onChangeText={(text) => setNom(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Nom d'utilisateur"
          placeholderTextColor="#808080"
          value={username}
          onChangeText={(text) => setUsername(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="mail"
          placeholderTextColor="#808080"
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="password"
          placeholderTextColor="#808080"
          value={password}
          onChangeText={(text) => setPassword(text)}
          secureTextEntry
        />
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.cancelButton} onPress={() => navigation.navigate('LoadingScreen')}>
            <Text style={styles.buttonText}>Annuler</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.signupButton} onPress={handleInscription}>
            <Text style={styles.buttonText2}>S'inscrire</Text>
          </TouchableOpacity>
        </View>
      </View>
      
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
  desc: {
    color: '#ffffff',
    fontSize: 16,
    textAlign: "center",
    width: '70%', 
    marginBottom: 20,
  },
});

export default RegisterScreen;
