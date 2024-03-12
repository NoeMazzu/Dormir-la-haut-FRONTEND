import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Button,
} from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { useState } from "react";
import { useSelector } from "react-redux";
import {Picker} from '@react-native-picker/picker';

function NewHotSpot(props) {

  const userName = useSelector((state) => state.user.value.userName);

  const [newSpotTitle, setNewSpotTitle] = useState("");
  const [newSpotDesc, setNewSpotDesc] = useState("");
  const [newSpotType, setNewSpotType] = useState(null)

  const formData = new FormData();

  // formData.append('photoFromFront', {
  //   uri: 'file://...',
  //   name: 'photo.jpg',
  //   type: 'image/jpeg',
  //  });
   
  //  fetch('http://.../upload', {
  //   method: 'POST',
  //   body: formData,
  //  }).then((response) => response.json())
  //   .then((data) => {
  //     console.log (data)
  //  });

    //A COMPLETER PAR L URL et les coordonnées
    const newSpot = {
      namePoi: newSpotTitle,
      coordinates: props.location,
      desc: newSpotDesc,
      photos: "",
      createdBy: userName,
      typePoi: newSpotType,
    };

  function handleSubmit() {
    fetch("https://dormir-la-haut-backend.vercel.app/poi", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newSpot),
    })
      .then((response) => response.json())
      .then((data) => {});
    Alert.alert(
      "Votre proposition est en attente de validation par nos modérateurs"
    );
  }

  // const updateNewHotSpotTitle = (valeur) => {
  //   setNewSpotTitle(valeur)
  // }

  // const updateNewHotSpotDesc = (valeur) => {
  //   setNewSpotDesc(valeur)
  // }


  return (
    <View style={styles.container}>
      <View style={styles.gallery}>
        <TouchableOpacity
          style={{
            backgroundColor: "pink",
            justifyContent: "flex-end",
            flexDirection: "row",
          }}
        >
          <FontAwesome name="times-circle-o" size={30} />
        </TouchableOpacity>
        <View style={styles.photoContainer}></View>
      </View>
      <View style={styles.infosContainer}>
        <TextInput
          onChangeText={(value) => setNewSpotTitle(value)}
          value={newSpotTitle}
          placeholder="Spot Title"
        ></TextInput>
        <TextInput
          onChangeText={(value) => setNewSpotDesc(value)}
          value={newSpotDesc}
          placeholder="Spot Desc"
        ></TextInput>
        <Picker 
              selectedValue={newSpotType}
             onValueChange={(itemValue, itemIndex) =>setNewSpotType(itemValue)}
             style={{flex:1}}
             itemStyle={{size:20}}>
              <Picker.Item label="Refuge" value="refuge" />
              <Picker.Item label="Cabane" value="cabane" />
              <Picker.Item label="Bivouac" value="bivouac" />
              <Picker.Item label="Gîte" value="gîte" />
              <Picker.Item label="Autre" value="autre" />
        </Picker>
        <View style={styles.buttonsContainer}>
          <Button
            title="Soumettre"
            onPress={() => {
              handleSubmit();
            }}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gallery: {
    height: "50%",
    width: "100%",
    backgroundColor: "red",
  },
  infosContainer: {
    height: "50%",
    width: "100%",
    backgroundColor: "yellow",
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  photoContainer: {
    padding: 4,
    borderRadius: 20,
    overflow: "hidden",
    flex: 1,
  },
});

export default NewHotSpot;
