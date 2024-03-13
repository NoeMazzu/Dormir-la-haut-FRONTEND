import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Slider from "../components/Slider";
import { useSelector } from "react-redux";

function HotSpot(props) {
  const pois = useSelector((state) => state.poi.value);
  const token = useSelector((state) => state.user.value.token);
  const poiFound = pois.find((element) => element.name === props.name);

  const handleBookmark = () => {
    return fetch("https://dormir-la-haut-backend.vercel.app/poi/poiBookMark", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token: token,
        poiId: poiFound._id,
      }),
    })
      .then((response) => response.json())
      .then((data) => {})
      .catch((error) => console.error("Erreur :", error));
  };

  return (
    <View style={styles.container}>
      <View style={styles.photoContainer}>
        <Slider />
      </View>
      <View style={styles.infosContainer}>
        <View>
          <Text style={styles.title}>{props.name}</Text>
          <Text style={styles.desc}>{props.desc}</Text>
        </View>
        <View style={styles.logosContainer}>
          <View style={styles.buttonsContainer}>
            <TouchableOpacity>
              <FontAwesome name="star-o" size={40} />
            </TouchableOpacity>
            <TouchableOpacity onPress={handleBookmark}>
              <FontAwesome name="bookmark-o" size={40} />
            </TouchableOpacity>
          </View>
          <View style={styles.deleteLogo}>
            <TouchableOpacity>
              <FontAwesome name="close" size={40} onPress={props.handlePress} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "60%",
    width: "90%",
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#35357F",
  },
  infosContainer: {
    flex: 1,
    justifyContent: "space-between",
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 20,
    height: "100%",
    alignItems: "center",
  },
  photoContainer: {
    borderRadius: 20,
    overflow: "hidden",
    flex: 1,
    paddingTop: "5%",
  },
  title: {
    fontSize: 20,
    padding: "5%",
  },
  desc: {
    paddingBottom: "5%",
    paddingLeft: "5%",
  },
  logosContainer: {
    justifyContent: "space-between",
    alignItems: "flex-end",
    flexDirection: "row",
    width: "100%",
    padding: "4%",
    borderRadius: 20,
  },
  deleteLogo: {
    padding: "2%",
    height: "100%",
  },
});

export default HotSpot;
