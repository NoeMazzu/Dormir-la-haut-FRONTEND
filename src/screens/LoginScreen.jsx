import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  Dimensions,
} from "react-native";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setToken, setUsername } from "../redux/slices/user";
import { useSelector } from "react-redux";

const LoginScreen = ({ navigation }) => {
  const user = useSelector((state) => state.user.value);

  useEffect(() => {
    if (user?.token) {
      navigation.navigate("TabNavigator");
    }
  }, []);

  const [imageLoaded, setImageLoaded] = useState(false);
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const handleImageLoad = () => {
    setImageLoaded(true);
  };
  const passwordRegex =
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{9,}$/;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const handleConnection = () => {
    if (!emailRegex.test(email)) {
      setError("Adresse e-mail ou mot de passe invalide.");
      return;
    } else if (!passwordRegex.test(password)) {
      setError("Adresse e-mail ou mot de passe invalide.");
      return;
    }

    fetch("https://dormir-la-haut-backend.vercel.app/users/signin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        mail: email,
        password: password,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.result) {
          setEmail("");
          setPassword("");
          setError("");
          dispatch(setToken(data.token));
          dispatch(setUsername(data.userName));
          navigation.navigate("TabNavigator");
        } else {
          setError(data.error);
        }
      });
  };
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1, height: Dimensions.get("window").height }}
    >
      <ImageBackground
        source={require("../assets/img/Image-background.jpg")}
        resizeMode="cover"
        style={styles.background}
        onLoad={handleImageLoad}
      >
        {imageLoaded ? (
          <View style={styles.filter}>
            {error ? <Text style={styles.errorText}>{error}</Text> : null}
            <Text style={styles.title}>Se connecter</Text>
            <TextInput
              style={styles.input}
              placeholder="E-mail"
              placeholderTextColor="#808080"
              value={email}
              onChangeText={(text) => setEmail(text)}
            />

            <TextInput
              style={styles.input}
              placeholder="Password"
              placeholderTextColor="#808080"
              secureTextEntry={true} // or secureTextEntry
              value={password}
              onChangeText={(text) => setPassword(text)}
            />

            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => navigation.navigate("LoadingScreen")}
              >
                <Text style={styles.buttonText}>Annuler</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.signupButton}
                onPress={handleConnection}
              >
                <Text style={styles.buttonText2}>Se Connecter</Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : null}
      </ImageBackground>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  errorText: {
    color: "#FF0000",
    textAlign: "center",
    fontSize: 16,
    marginVertical: 10,
    fontFamily: 'JosefinSansRegular',
  },
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
    fontFamily: 'JosefinSansRegular',
  },
  buttonText2: {
    color: "#000",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16,
    fontFamily: 'JosefinSansRegular',
  },
  title: {
    color: "#ffffff",
    fontSize: 48,
    fontFamily: 'JosefinSansRegular',
    marginBottom: 20,
  },
});

export default LoginScreen;
