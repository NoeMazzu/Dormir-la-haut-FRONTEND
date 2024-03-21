import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  Dimensions,
} from "react-native";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector  } from "react-redux";
import { setToken, setUsername } from "../redux/slices/user";
import { styles } from '../styles/screens/LoginScreen.style'

export default function LoginScreen  ({ navigation }) {
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


