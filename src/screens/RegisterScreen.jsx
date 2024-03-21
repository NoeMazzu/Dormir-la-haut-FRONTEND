import React, { useState, useRef, useEffect } from "react";
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
import * as Location from "expo-location";
import { useDispatch } from "react-redux";
import { setLocation, setMassif, setToken, setUsername } from "../redux/slices/user";
import { useSelector } from "react-redux";

const RegisterScreen = ({ navigation }) => {
  const user = useSelector((state) => state.user.value);

  useEffect(() => {
    if (user?.token) {
      navigation.navigate("TabNavigator");
    }
  }, []);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const userNameInputRef = useRef(null);
  const MailInputRef = useRef(null);
  const passwordInputRef = useRef(null);

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  // Fonction pour demander la permission de géolocalisation
  const requestLocationPermission = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      setError("La permission de géolocalisation est requise.");
    } else if (status === "granted") {
      Location.watchPositionAsync({ distanceInterval: 10 }, (location) => {
        dispatch(setLocation(location.coords));
      });
    }
  };

  const handleInscription = () => {
    
    if (userNameInputRef && userNameInputRef.textValue.length < 4) {
      return setError("Le nom d'utilisateur doit avoir au moins 4 caractères.");
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (MailInputRef && !emailRegex.test(MailInputRef.textValue)) {
      setError("Veuillez entrer une adresse e-mail valide.");
      return;
    }

    const passwordRegex =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{9,}$/;
    if (passwordInputRef && !passwordRegex.test(passwordInputRef.textValue)) {
      setError(
        "Le mot de passe doit avoir 9 caractères, au moins une lettre, un chiffre et un caractère spécial."
      );
      return;
    }

    fetch("https://dormir-la-haut-backend.vercel.app/users/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userName: userNameInputRef.textValue,
        mail: MailInputRef.textValue,
        password: passwordInputRef.textValue,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.result) {
          userNameInputRef.textValue = "";
          MailInputRef.textValue = "";
          passwordInputRef.textValue = "";
          dispatch(setToken(data.token));
          dispatch(setUsername(data.userName));
          navigation.navigate("TabNavigator");
        } else {
          setError(data.error);
        }
      })
      .catch((err) => console.log(err));
    requestLocationPermission();
  };

  return (
    <ImageBackground
      source={require("../assets/img/Image-background.jpg")}
      resizeMode="cover"
      style={styles.background}
      onLoad={handleImageLoad}
    >
      {imageLoaded ? (
        <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1, height: Dimensions.get("window").height }}

      >
      
          <View style={styles.filter}>
            {error ? <Text style={styles.errorText}>{error}</Text> : null}
            <Text style={styles.title}>S'inscrire</Text>
            <Text style={styles.desc}>
              Veuillez remplir tous les champs suivants pour créer votre compte
            </Text>
            <TextInput
              style={styles.input}
              placeholder="Username"
              placeholderTextColor="#808080"
              ref={userNameInputRef}
              onChangeText={(text) => (userNameInputRef.textValue = text)}
            />
            <TextInput
              style={styles.input}
              placeholder="E-mail"
              placeholderTextColor="#808080"
              ref={MailInputRef}
              onChangeText={(text) => (MailInputRef.textValue = text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Password"
              placeholderTextColor="#808080"
              ref={passwordInputRef}
              onChangeText={(text) => (passwordInputRef.textValue = text)}
              secureTextEntry
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
                onPress={() => {
                  handleInscription();
                }}
              >
                <Text style={styles.buttonText2}>S'inscrire</Text>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      ) : null}
    </ImageBackground>
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
    fontSize: 16,
    fontFamily: 'JosefinSansRegular',
  },
  buttonText2: {
    color: "#000",
    textAlign: "center",
    fontSize: 16,
    fontFamily: 'JosefinSansRegular',
  },

  title: {
    color: "#ffffff",
    fontSize: 60,
    fontFamily: 'JosefinSansRegular',
  },
  desc: {
    color: "#ffffff",
    fontSize: 16,
    textAlign: "center",
    width: "70%",
    marginBottom: 20,
    fontFamily: 'JosefinSansRegular',
  },
});

export default RegisterScreen;
