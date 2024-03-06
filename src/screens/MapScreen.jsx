import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import MapView, { Marker, Callout } from "react-native-maps";
import { Dimensions } from "react-native";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import FontAwesome from "react-native-vector-icons/FontAwesome";

export default function MapScreen() {
  const [markersToShow, setMarkersToShow] = useState([]);

  const handlePoi = function () {
    return;
  };

  const screenHeight = Dimensions.get("screen").height;
  const screenWidth = Dimensions.get("screen").width;

  useEffect(() => {
    fetch("https://dormir-la-haut-backend.vercel.app/poi")
      .then((response) => response.json())
      .then((data) => {
        console.log(data.poi);
        setMarkersToShow(data.poi);
      });
  }, []);

  const markers = markersToShow.map((data, i) => {
    return (
      <Marker
        key={i}
        coordinate={{
          latitude: data.coordinates.longitude,
          longitude: data.coordinates.latitude,
        }}
        onPress={handlePoi()}
        calloutOffset={{ x: 0.0, y: 0.0 }}
        calloutAnchor={{ x: 0.5, y: 8 }}
      >
        <Callout tooltip={true}>
          <View
            style={{
              height: (1 / 2) * screenHeight,
              width: (68 / 70) * screenWidth,
              backgroundColor: "#2A346A",
              borderRadius: 10,
            }}
          >
            <View style={styles.photo} >
              <View style={styles.delete}>
                <TouchableOpacity onPress={() => dispatch(removePhoto(data))}>
                  <FontAwesome
                    name="times-circle-o"
                    size={30}
                    color="#000000"
                    style={styles.deleteButton}
                  />
                </TouchableOpacity>
              </View>
              <View style={styles.swipe}>
              <TouchableOpacity onPress={() => dispatch(removePhoto(data))}>
                  <FontAwesome
                    name="arrow-circle-o-left"
                    size={30}
                    color="#000000"
                    style={styles.swipeRight}
                  />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => dispatch(removePhoto(data))}>
                  <FontAwesome
                    name="arrow-circle-o-right"
                    size={30}
                    color="#000000"
                    style={styles.swipeLeft}
                  />
                </TouchableOpacity>
              </View>
            </View>
            <Text style={styles.iconTitle}>{data.name}</Text>
            <Text style={styles.desc}>{data.desc}</Text>
            <View style={styles.bottom}>
            <TouchableOpacity onPress={() => dispatch(removePhoto(data))}>
                  <FontAwesome
                    name="star-o"
                    size={30}
                    color="#000000"
                    style={styles.swipeLeft}
                  />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => dispatch(removePhoto(data))}>
                  <FontAwesome
                    name="bookmark-o"
                    size={30}
                    color="#000000"
                    style={styles.swipeLeft}
                  />
                </TouchableOpacity>
            </View>
          </View>
        </Callout>
      </Marker>
    );
  });

  return (
    <MapView
      mapeType="terrain"
      initialRegion={{
        latitude: 45.7542305,
        longitude: 4.8386187,
        latitudeDelta: 2,
        longitudeDelta: 2,
      }}
      style={styles.map}
      mapType="hybrid"
    >
      <Marker
        title="My position"
        pinColor="#fecb2d"
        coordinate={{ latitude: 45.7542305, longitude: 4.8386187 }}
      />
      {markers}
    </MapView>
  );
}
const styles = StyleSheet.create({
  map: {
    width: Dimensions.get("screen").width,
    height: Dimensions.get("screen").height,
  },
  photo: {
    height: "45%",
    width: "100%",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    backgroundColor: "lightgreen",
  },
  container: {
    height: "100%",
    width: "100%",
  },
  iconTitle: {
    fontSize: 20,
    paddingTop: 10,
    paddingLeft: 20,
    color: "white",
  },
  desc: {
    padding: 20,
    color: "white",
  },
  bottom: {
    flex: 1,
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
    padding: 10,
  },
  delete: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    padding: 10,
  },
  swipe: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
  },
  deleteButton: {
    color: "white",
  },
  swipeRight: {
    color: "white",
  },
  swipeLeft: {
    color: "white",
  },
  Save: {
    color: "white",
  },
  Star: {
    color: "white",
  },
});
