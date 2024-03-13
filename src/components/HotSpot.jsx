import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, TouchableWithoutFeedback } from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Slider from "../components/Slider";
import { useSelector } from "react-redux";

function HotSpot(props) {
  const pois = useSelector((state) => state.poi.value);
  const token = useSelector((state) => state.user.value.token);
  const poiFound = pois.find((element) => element.name === props.name);

  // console.log("[HOTSPOT POI.ID]", poiFound._id);

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
      // .then((data) => console.log(data))
      .catch((error) => console.error("Erreur :", error));
  };

  return (
    <View style={styles.container}>
      
      <View style={styles.photoContainer}>
        
        <Slider playing={false}/>
      </View>
      <View style={styles.infosContainer}>
        <View>
          <Text style={styles.title}>{props.name}</Text>
          <Text style={styles.desc}>{props.desc}</Text>
        </View>
        <View style={styles.logosContainer}>
          <View style={styles.buttonsContainer}>
            <TouchableOpacity>
              <FontAwesome name="star-o" size={40} style={styles.logo}/>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleBookmark}>
              <FontAwesome name="bookmark-o" size={40} style={styles.logo}/>
            </TouchableOpacity>
          </View>
            <TouchableOpacity style={styles.deleteLogo}>
              <FontAwesome name="close" size={40} onPress={props.handlePress} style={styles.logo} />
            </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "60%",
    width: "90%",
    borderRadius: 10,
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
    overflow: "hidden",
    flex: 1,
    paddingTop: "5%",
  },
  title: {
    fontSize: 20,
    padding: "5%",
    color: "white"
  },
  desc: {
    paddingBottom: "5%",
    paddingLeft: "5%",
    color: "white"
  },
  logosContainer: {
    justifyContent: "space-between",
    alignItems: "flex-end",
    flexDirection: "row",
    width: "100%",
    padding: "4%",
  },
  deleteLogo: {
    padding: "2%",
    height: "100%",
  },
  logo: {
    color: "white"
  }
});

export default HotSpot;
