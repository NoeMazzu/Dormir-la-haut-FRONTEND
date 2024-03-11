import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import {useState} from 'react'

function NewHotSpot(props) {

  const [newSpotTitle, setNewSpotTitle] = useState('')
  const [newSpotDesc, setNewSpotDesc] = useState('')

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
          <FontAwesome
            name="times-circle-o"
            size={30}
            onPress={props.handlePress}
          />
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
          placeholder="Spot Desc">
                 </TextInput>
        <View style={styles.buttonsContainer}>
          <TouchableOpacity style={{ backgroundColor: "pink" }}>
            <FontAwesome name="star-o" size={30} />
          </TouchableOpacity>
          <TouchableOpacity style={{ backgroundColor: "green" }}>
            <FontAwesome name="bookmark-o" size={30} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex:1,
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
