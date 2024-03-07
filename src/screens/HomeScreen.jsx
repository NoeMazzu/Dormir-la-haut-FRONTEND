import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPOIs } from "../components/slices/user";
import { ImageSlider } from "react-native-image-slider-banner";

export default function HomeScreen({ navigation }) {
  const dispatch = useDispatch();
  const gallery = [
    { img: "https://source.unsplash.com/1024x768/?nature" },
    { img: "https://source.unsplash.com/1024x768/?water" },
    { img: "https://source.unsplash.com/1024x768/?girl" },
    { img: "https://source.unsplash.com/1024x768/?tree" },
  ];

  useEffect(() => {
    fetch("https://dormir-la-haut-backend.vercel.app/poi")
      .then((response) => response.json())
      .then((data) => {
        dispatch(setPOIs(data.poi));
      });
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <View style={styles.meteoContainer}>
          <TouchableOpacity
            style={styles.meteoButton}
            onPress={() => {
              navigation.navigate("MeteoScreen");
            }}
          >
            <Text style={styles.textTitle}>METEOContainer</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.highRigtContainers}>
          <View style={styles.actusContainers}>
            <TouchableOpacity
              style={styles.buttonNews}
              onPress={() => {
                navigation.navigate("NewsScreen");
              }}
            >
              <Text>Voir les news</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.cheklistContainers}>
            <TouchableOpacity
              style={styles.checklistButton}
              onPress={() => {
                navigation.navigate("ChecklistsScreen");
              }}
            >
              <Text>CHECKLISTS / Small Containers</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <TouchableOpacity
        style={styles.mapContainer}
        onPress={() => {
          navigation.navigate("MapScreen");
        }}
      >
        <MapView
          mapType="terrain"
          initialRegion={{
            latitude: 45.7,
            longitude: 6.4,
            latitudeDelta: 2,
            longitudeDelta: 2,
          }}
          style={{ flex: 1, height: "100%", width: "100%", borderRadius: 10 }}
          sharedTransitionTag="tag"
        ></MapView>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.photoContainer}
        onPress={() => {
          navigation.navigate("PhotosScreen");
        }}
      >
        <ImageSlider
          data={gallery}
          autoPlay
          preview={false}
          caroselImageStyle={{ height: "100%" }}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#161D46",
    alignItems: "center",
    justifyContent: "center",
    padding: 8,
    flex: 1,
  },
  meteoContainer: {
    backgroundColor: "yellow",
    width: "50%",
    padding: 4,
  },
  meteoButton: {
    flex: 1,
    borderRadius: 10,
    backgroundColor: "#35357F",
  },
  textTitle: {
    color: "white",
  },
  highRigtContainers: {
    width: "50%",
  },
  actusContainers: {
    backgroundColor: "green",
    height: "50%",
    padding: 4,
  },
  buttonNews: {
    flex: 1,
    borderRadius: 10,
    backgroundColor: "#35357F",
  },
  cheklistContainers: {
    backgroundColor: "lightgreen",
    height: "50%",
    padding: 4,
  },
  checklistButton: {
    flex: 1,
    borderRadius: 10,
    backgroundColor: "#35357F",
  },
  topContainer: {
    flexDirection: "row",
    width: "100%",
    height: "30%",
  },
  mapContainer: {
    backgroundColor: "purple",
    width: "100%",
    height: "30%",
    padding: 4,
  },
  photoContainer: {
    backgroundColor: "pink",
    width: "100%",
    height: "30%",
  },
});
