import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Button,
  Image,
} from "react-native";
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Picker } from "@react-native-picker/picker";
import * as ImagePicker from "expo-image-picker";

function NewHotSpot(props) {
  const userName = useSelector((state) => state.user.value.username);

  const [newSpotTitle, setNewSpotTitle] = useState(null);
  const [newSpotDesc, setNewSpotDesc] = useState(null);
  const [newSpotType, setNewSpotType] = useState(null);
  const [fetchLoading, setFetchLoading] = useState('waiting');
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedImageURL, setSelectedImageURL] = useState(null);

  const formData = new FormData();

  //Informations à envoyer par la route à la BDD
  const newSpot = {
    name: newSpotTitle,
    coordinates: props.location,
    desc: newSpotDesc,
    photos: { url: selectedImageURL, liked: [] },
    username: userName,
    type: newSpotType,
    isPublic: false,
  };

  // Image Picker (pour choisir une image locale)
  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: false,
      quality: 1,
    });
    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
    } else {
      alert("You did not select any image.");
    }
  };

  const handleSubmit = async () => {
    setFetchLoading(true);
    // Envoi de le l'image au BACK
    formData.append("photoNewPoi", {
      uri: selectedImage,
      name: "photo.jpg",
      type: "image/jpeg",
    });

    const uploadPhoto = await fetch(
      "https://dormir-la-haut-backend.vercel.app/cloudinary/upload-image",
      {
        method: "POST",
        body: formData,
      }
    );

    const uploadResult = await uploadPhoto.json();
    console.log('uploadResult', uploadResult);
    setSelectedImageURL(() => uploadResult.cdn_url);

    const uploadPOI = await fetch(
      "https://dormir-la-haut-backend.vercel.app/poi",
      {
        method: "POST",
        body: newSpot,
      }
    );
    const uploadPOIResult = await uploadPOI.json();

    Alert.alert(
      "Votre proposition est en attente de validation par nos modérateurs"
    );
  };


  function GalleryToShow () {
if(fetchLoading === 'waiting') {
    return (<View style={styles.gallery}>
      <TouchableOpacity 
          onPress={pickImageAsync}
          style={styles.boutonUpload}>
        <FontAwesomeIcon name='upload' size={60} color={'white'}/>
        <Text style={styles.textUpload}>UPLOADER UNE PHOTO</Text>
      </TouchableOpacity>
    </View>)
  } else if (fetchLoading === 'pending') {
    return (<View style={styles.gallery}>
          <Image source={require('../assets/img/loading.gif')} style={{height:100, width: 100}}/>
    </View>)
  }
}
  return (
    <View style={styles.container}>
      <View style={styles.subContainer}>
      <GalleryToShow/>
      <View style={styles.infosContainer}>
        <TextInput
          style={styles.input}
          onChangeText={(value) => setNewSpotTitle(value)}
          value={newSpotTitle}
          placeholder="Nom du spot"
          placeholderTextColor="#808080"
        ></TextInput>
        <TextInput
          style={styles.input}
          onChangeText={(value) => setNewSpotDesc(value)}
          value={newSpotDesc}
          placeholder="Description du spot"
          placeholderTextColor="#808080"
        ></TextInput>
        <Picker
          selectedValue={newSpotType}
          onValueChange={(itemValue, itemIndex) => {setNewSpotType(itemValue), setFetchLoading('pending')}}
          style={styles.input}
        >
          <Picker.Item label="Refuge" value="refuge" />
          <Picker.Item label="Cabane" value="cabane" />
          <Picker.Item label="Bivouac" value="bivouac" />
          <Picker.Item label="Gîte" value="gîte" />
          <Picker.Item label="Autre" value="autre" />
        </Picker>
        <View style={styles.buttonsContainer}>
        <TouchableOpacity
                style={styles.cancelButton}
                onPress={props.onClose}
                >
                <Text style={styles.buttonText}>Annuler</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.submitButton}
                onPress={() => {
                  handleSubmit().finally(() => setFetchLoading(false));
                }}>
                <Text style={styles.buttonText2}>Soumettre</Text>
              </TouchableOpacity>
        </View>
      </View>
    </View>
  </View>
  );
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    alignItems: 'center',
    justifyContent:'center',
    
  },
  subContainer: {
    width: '80%',
    height:' 90%',
    borderRadius:10,
    
  },
  gallery: {
    height: "30%",
    width: "100%",
    backgroundColor: "#35357F",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  infosContainer: {
    height: "50%",
    width: "100%",
    backgroundColor: "#35357F",
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },
  cancelButton: {
    backgroundColor: "#C23434",
    padding: 15,
    margin: 8,
    borderRadius: 10,
    width: "40%",
    alignItems: "center",
  },
  submitButton: {
    backgroundColor: "#ffffff",
    padding: 15,
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
    backgroundColor: "#ffffff",
    width: "80%",
    padding: 10,
    margin: 10,
    borderRadius: 10,
  },
  boutonUpload:{
    justifyContent:'center',
    alignItems:'center',
    gap: 10,
  },
  textUpload:{
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16,
  }
});

export default NewHotSpot;
