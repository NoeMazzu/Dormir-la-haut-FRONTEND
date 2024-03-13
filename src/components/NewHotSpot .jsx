import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Button,
  Image,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
  Keyboard
} from "react-native";
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Picker } from "@react-native-picker/picker";
import * as ImagePicker from "expo-image-picker";


function NewHotSpot(props) {
  const userName = useSelector((state) => state.user.value.username);

  const [newSpotTitle, setNewSpotTitle] = useState(null);
  const [newSpotDesc, setNewSpotDesc] = useState(null);
  const [newSpotType, setNewSpotType] = useState(null);
  const [fetchLoading, setFetchLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [disableButton, setDisableButton] = useState(false);
  const [isTabBarVisible, setTabBarVisible] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        setTabBarVisible(false);
      }
    );

    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setTabBarVisible(true);
      }
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  const formData = new FormData();

  //Informations à envoyer par la route à la BDD
  const newSpot = {
    name: newSpotTitle,
    coordinates: props.location,
    desc: newSpotDesc,
    photos: [{ url: null, liked: [] }],
    username: userName,
    type: newSpotType,
    isPublic: false,
  };

  // Image Picker (pour choisir une image locale)
  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: false,
      quality: 1,});
    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
    } else {alert("You did not select any image.");}
  };

  const handleSubmit = async () => {
    if (!newSpotTitle || !newSpotDesc || !newSpotType){
      return setError("Tous les champs doivent être remplis.")
    }
    setFetchLoading(true);
    formData.append("photoNewPoi", {
      uri: selectedImage,
      name: "photo.jpg",
      type: "image/jpeg",
    });

    const uploadPhoto = await fetch(
      "https://dormir-la-haut-backend.vercel.app/cloudinary/upload-image-mewen",
      { method: "POST", body: formData}
    );

    const uploadResult = await uploadPhoto.json();

    if (uploadResult.cdn_url) {
      newSpot.photos[0].url = uploadResult.cdn_url
      fetch("https://dormir-la-haut-backend.vercel.app/poi", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newSpot),
      })
        .then((response) => response.json())
        .then((data) => console.log("final result", data))
        .finally(props.onClose, Alert.alert('Coucou'), 
        setFetchLoading(false),
        setNewSpotDesc(null),
        setNewSpotTitle(null),
        setNewSpotType(null),
        setSelectedImage(null),
        );
        
    }
  };


  function GalleryToShow() {
    if (!fetchLoading && !selectedImage) {
      return (
        <View style={styles.gallery}>
          <TouchableOpacity
            onPress={pickImageAsync}
            style={styles.boutonUpload}
          >
            <FontAwesomeIcon name="upload" size={60} color={"white"} />
            <Text style={styles.textUpload}>UPLOADER UNE PHOTO*</Text>
          </TouchableOpacity>
          {error ? <View style={{position: 'absolute',bottom:10}}><Text style={styles.errorText}>{error}</Text></View> : null}
        </View>
      );
    } else if (selectedImage && !fetchLoading) {
      return (
        <View style={styles.gallery}>
          <Image
            source={{ uri: selectedImage }}
            style={{ height: 150, width: 200 }}
          />
        </View>
      );
    } else if(fetchLoading){
      <View style={styles.gallery}>
          <Text>LOADING...</Text>
      </View>
    }
  }

  return (
   
    <View style={styles.container}>
      <View style={styles.subContainer}>
        <GalleryToShow />
        <View style={styles.infosContainer}>
        {/* {error ? <Text style={styles.errorText}>{error}</Text> : null} */}
          <TextInput
            style={styles.input}
            onChangeText={(value) => setNewSpotTitle(value)}
            value={newSpotTitle}
            placeholder="Nom du spot*"
            placeholderTextColor="#808080"
            maxLength={30}
          ></TextInput>
          <TextInput
            style={styles.input}
            onChangeText={(value) => setNewSpotDesc(value)}
            value={newSpotDesc}
            placeholder="Description du spot*"
            placeholderTextColor="#808080"
            maxLength={300} ></TextInput>
          <Picker
            selectedValue={newSpotType}
            onValueChange={(itemValue, itemIndex) => {
              setNewSpotType(itemValue)}}
            style={styles.input}
            itemStyle={styles.inputLabel}>
              <Picker.Item label="Choisissez un type*" value="none" />
              <Picker.Item label="Cabane" value="cabane" />
              <Picker.Item label="Bivouac" value="bivouac" />
              <Picker.Item label="Gîte" value="gîte" />
              <Picker.Item label="Refuge" value="refuge" />
              <Picker.Item label="Autre" value="autre" />
          </Picker>
          <View style={styles.buttonsContainer}>
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={props.onClose}>
              <Text style={styles.buttonText}>Annuler</Text>
            </TouchableOpacity>
            <TouchableOpacity
              disabled={disableButton}
              style={styles.submitButton}
              onPress={() => {
               handleSubmit();
              }}
            >
              <Text style={styles.buttonText2}>Soumettre</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    height: Dimensions.get("window").height,
  },
  subContainer: {
    width: "80%",
    height: 600,
    borderRadius: 10,
  },
  gallery: {
    height: "30%",
    width: "100%",
    backgroundColor: "#35357F",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  infosContainer: {
    height: "50%",
    width: "100%",
    backgroundColor: "#35357F",
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },
  cancelButton: {
    backgroundColor: "#C23434",
    padding: 10,
    margin: 8,
    borderRadius: 10,
    width: "40%",
    alignItems: "center",
  },
  submitButton: {
    backgroundColor: "#ffffff",
    padding: 10,
    margin: 8,
    borderRadius: 10,
    width: "40%",
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
  input: {
    backgroundColor: "white",
    width: "80%",
    padding: 12,
    margin: 10,
    borderRadius: 10,
  },
  boutonUpload: {
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  },
  textUpload: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16,
  },
  inputLabel:{
    color:'red'
  },
  errorText:{
    color: "#FF0000",
    textAlign: "center",
    fontSize: 12,
  }
});

export default NewHotSpot;
