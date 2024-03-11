import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Slider from "../components/Slider";

function HotSpot(props) {
  console.log(props);
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
        <View style={styles.photoContainer}>
          <Slider />
        </View>
      </View>
      <View style={styles.infosContainer}>
        <Text>{props.name}</Text>
        <Text>{props.desc}</Text>
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
    // borderRadius: 20,
    // width: "60%",
    // height: "40%",
    // alignItems: 'center',
    // justifyContent: "center",
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

export default HotSpot;
